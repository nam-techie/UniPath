# Auth Task - Login, Register, Google Login

> Status: Planning  
> Scope: Authentication for UniPath MVP  
> Implementation: Not started  
> Owner: Backend first, frontend integration later  

---

# 1. Goal

Build an authentication flow that supports:

1. Register with email and password.
2. Verify email before full account usage.
3. Login with email and password.
4. Login with Google.
5. Use access token and refresh token.
6. Logout by revoking refresh token.

The auth module should be simple enough for MVP, but secure enough to explain and defend in a university project.

---

# 2. Auth Methods

UniPath supports two login methods:

```text
EMAIL_PASSWORD
GOOGLE
```

Each email can use only one auth method in MVP.

Rules:

- If an email registered with `EMAIL_PASSWORD`, Google login with the same email is rejected.
- If an email registered with `GOOGLE`, email/password registration with the same email is rejected.
- MVP does not support linking Google and password login into the same account.
- Admin accounts must use `EMAIL_PASSWORD`.
- Self-register users always become `STUDENT`.

Reason:

- Easier to implement.
- Easier to explain.
- Avoids account linking security edge cases.

---

# 3. User Roles

MVP roles:

```text
STUDENT
ADMIN
```

Role rules:

- Public register creates `STUDENT`.
- Google first login creates `STUDENT`.
- `ADMIN` is created manually by seed script or database setup.
- Later, admin may assign additional roles if the product adds counselor features.

---

# 4. Email Verification

## 4.1. Chosen Method

Use email verification link, not OTP, for MVP email registration.

Flow:

```text
User registers with email/password
-> Backend creates user with emailVerified = false
-> Backend creates EmailVerificationToken
-> Backend sends email with verification link
-> User clicks link
-> Backend verifies token
-> Backend marks emailVerified = true
-> Backend redirects user to frontend verification success page
```

Reason:

- Better UX than entering a 6-digit OTP.
- Common pattern for account verification.
- Less frontend friction.
- OTP can be reserved for reset password later.

## 4.2. Google Email Verification

Google login does not require UniPath to send another verification email if Google returns:

```text
email_verified = true
```

If Google returns `email_verified = false`, login is rejected.

Reason:

- Google already verifies ownership of that email.
- Extra UniPath email verification after Google login is redundant.

---

# 5. Register Flow

Endpoint:

```http
POST /api/v1/auth/register
```

Request:

```json
{
  "fullName": "Nguyen Van A",
  "email": "student@example.com",
  "password": "Password@123",
  "confirmPassword": "Password@123"
}
```

Business rules:

- Email is required.
- Full name is required.
- Password and confirm password must match.
- Email must not exist.
- Password must follow password policy.
- New user role is `STUDENT`.
- New user status is `ACTIVE`.
- `authProvider = EMAIL_PASSWORD`.
- `emailVerified = false`.
- Backend sends verification email.

Response:

```json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "email": "student@example.com",
    "requiresEmailVerification": true
  }
}
```

Rejected cases:

- Email already registered with email/password.
- Email already registered with Google.
- Invalid password format.
- Password and confirm password mismatch.

---

# 6. Verify Email Flow

Endpoint:

```http
GET /api/v1/auth/verify-email?token={token}
```

Business rules:

- Token must exist.
- Token must not be expired.
- Token must not be used.
- Token should be stored as a hash in database.
- After successful verification:
  - `user.emailVerified = true`
  - `verificationToken.used = true`
  - `verificationToken.usedAt = now`

Token expiry:

```text
24 hours
```

Frontend behavior:

- If success: redirect to verify success page or login page.
- If expired: show option to resend verification email.

Future endpoint:

```http
POST /api/v1/auth/resend-verification-email
```

This can be added after the first auth version works.

---

# 7. Email/Password Login Flow

Endpoint:

```http
POST /api/v1/auth/login
```

Request:

```json
{
  "email": "student@example.com",
  "password": "Password@123"
}
```

Business rules:

- Login uses email, not username.
- User must exist.
- `authProvider` must be `EMAIL_PASSWORD`.
- Password must match BCrypt hash.
- User status must be `ACTIVE`.
- Email must be verified before full login.

If email is not verified:

```json
{
  "success": false,
  "message": "Please verify your email before logging in.",
  "data": {
    "requiresEmailVerification": true,
    "email": "student@example.com"
  }
}
```

If login succeeds:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "...",
    "user": {
      "id": 1,
      "email": "student@example.com",
      "fullName": "Nguyen Van A",
      "role": "STUDENT",
      "authProvider": "EMAIL_PASSWORD",
      "emailVerified": true
    }
  }
}
```

Refresh token:

- Stored in HttpOnly cookie.
- Also stored hashed in database.

Security note:

- Login error should not reveal whether the email exists.
- Use a generic message:

```text
Email or password is incorrect.
```

---

# 8. Google Login Flow

Endpoint:

```http
POST /api/v1/auth/google
```

Frontend responsibility:

- Use Google Identity Services.
- Get Google ID token.
- Send ID token to backend.

Request:

```json
{
  "idToken": "google-id-token"
}
```

Backend responsibility:

1. Verify ID token with Google.
2. Read Google claims:
   - `sub`
   - `email`
   - `name`
   - `email_verified`
3. Reject if `email_verified = false`.
4. Check whether email exists.
5. If email does not exist:
   - Create user.
   - `authProvider = GOOGLE`.
   - `googleSubject = sub`.
   - `emailVerified = true`.
   - `role = STUDENT`.
   - `status = ACTIVE`.
6. If email exists with `GOOGLE`:
   - Allow login only if `googleSubject` matches.
7. If email exists with `EMAIL_PASSWORD`:
   - Reject login.
   - Tell frontend to ask user to login with email/password.

Rejected case message:

```text
This email is already registered with email/password. Please login using email and password.
```

Successful response:

```json
{
  "success": true,
  "message": "Google login successful",
  "data": {
    "accessToken": "...",
    "user": {
      "id": 1,
      "email": "student@example.com",
      "fullName": "Nguyen Van A",
      "role": "STUDENT",
      "authProvider": "GOOGLE",
      "emailVerified": true
    }
  }
}
```

Refresh token:

- Stored in HttpOnly cookie.
- Stored hashed in database.

---

# 9. Token Strategy

Use:

```text
Access token + refresh token
```

Access token:

```text
Lifetime: 30 minutes
Storage: frontend memory or short-lived state
Purpose: call protected APIs
```

Refresh token:

```text
Lifetime: 14 days
Storage: HttpOnly cookie
Database: store hashed refresh token
Purpose: request a new access token
```

Reason:

- Access token is short-lived.
- Refresh token can be revoked on logout.
- HttpOnly cookie prevents JavaScript from reading refresh token.

---

# 10. Refresh Token Flow

Endpoint:

```http
POST /api/v1/auth/refresh
```

Business rules:

- Backend reads refresh token from HttpOnly cookie.
- Refresh token must exist in DB.
- Refresh token must not be expired.
- Refresh token must not be revoked.
- User must still be `ACTIVE`.
- Backend issues new access token.

Optional later improvement:

- Rotate refresh token on every refresh.

MVP decision:

- Refresh token rotation is recommended but can be implemented after basic auth works.

---

# 11. Logout Flow

Endpoint:

```http
POST /api/v1/auth/logout
```

Business rules:

- Backend reads refresh token from HttpOnly cookie.
- Mark refresh token as revoked in database.
- Clear refresh token cookie.
- Do not blacklist access token in MVP.

Reason:

- Access token expires in 30 minutes.
- Refresh token revoke is enough for MVP.

---

# 12. Current User Flow

Endpoint:

```http
GET /api/v1/auth/me
```

Business rules:

- Requires valid access token.
- Returns current user profile summary.

Response:

```json
{
  "success": true,
  "message": "Current user fetched successfully",
  "data": {
    "id": 1,
    "email": "student@example.com",
    "fullName": "Nguyen Van A",
    "role": "STUDENT",
    "authProvider": "EMAIL_PASSWORD",
    "emailVerified": true
  }
}
```

---

# 13. Password Policy

Password must have:

```text
Minimum 8 characters
At least 1 uppercase letter
At least 1 lowercase letter
At least 1 number
At least 1 special character
```

Example valid password:

```text
Password@123
```

---

# 14. Cookie Strategy

Use HttpOnly cookie for refresh token.

Cookie settings for local development:

```text
HttpOnly: true
Secure: false
SameSite: Lax
Path: /api/v1/auth
Max-Age: 14 days
```

Cookie settings for production:

```text
HttpOnly: true
Secure: true
SameSite: None or Lax depending on frontend/backend domain
Path: /api/v1/auth
Max-Age: 14 days
```

Note:

- If frontend and backend are on different domains, CORS must allow credentials.
- Frontend must send requests with credentials enabled when calling refresh/logout.

---

# 15. Required Entity Updates

## 15.1. User

Update existing `User` entity with:

```text
email
passwordHash nullable
fullName
role
status
authProvider
googleSubject nullable
emailVerified
createdAt
updatedAt
```

Notes:

- `passwordHash` is required only for `EMAIL_PASSWORD`.
- `googleSubject` is required only for `GOOGLE`.
- Email should be unique.
- Email cannot be changed in MVP.

## 15.2. RefreshToken

Create entity:

```text
id
userId
tokenHash
expiresAt
revoked
createdAt
revokedAt
```

## 15.3. EmailVerificationToken

Create entity:

```text
id
userId
tokenHash
expiresAt
used
createdAt
usedAt
```

---

# 16. Required Enum Updates

Create enum:

```text
AuthProvider
- EMAIL_PASSWORD
- GOOGLE
```

Existing enums:

```text
UserRole
- STUDENT
- ADMIN

UserStatus
- ACTIVE
- DISABLED
```

---

# 17. API Summary

```http
POST /api/v1/auth/register
GET  /api/v1/auth/verify-email?token={token}
POST /api/v1/auth/login
POST /api/v1/auth/google
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

Future, not first implementation:

```http
POST /api/v1/auth/resend-verification-email
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
```

---

# 18. Open Questions

These need final confirmation before implementation:

1. Do we implement real email sending now, or log verification links to console first?
2. Do we rotate refresh token on every refresh in the first version?
3. What frontend URL should email verification redirect to?
4. What frontend URL should be used for failed verification?
5. Do we allow admin to manually mark `emailVerified = true` for a user?
6. Should Google login be available only to students, or can a future counselor use it too?

---

# 19. Implementation Order

Recommended order:

1. Update `User` entity.
2. Add `AuthProvider` enum.
3. Add `RefreshToken` entity.
4. Add `EmailVerificationToken` entity.
5. Add repositories.
6. Add DTOs.
7. Add JWT service.
8. Add refresh token service.
9. Add email verification token service.
10. Add register flow.
11. Add verify email flow.
12. Add login flow.
13. Add refresh flow.
14. Add logout flow.
15. Add Google login flow.
16. Add security filter and security config.
17. Add tests for auth service.

---

# 20. Decision Summary

Chosen:

- Email login only, no username login.
- Email verification uses link token.
- Google login trusts Google only if `email_verified = true`.
- One email can use only one auth provider in MVP.
- Access token lifetime: 30 minutes.
- Refresh token lifetime: 14 days.
- Refresh token stored in HttpOnly cookie.
- Refresh token stored hashed in database.
- Logout revokes refresh token.
- Admin login uses email/password only.
- No phone login.
- No email change in MVP.
- No account linking in MVP.
