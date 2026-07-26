# UniPath - Phân tích hiện trạng dự án

> Ngày phân tích: 2026-07-26
> Phạm vi: toàn bộ repo (`BACKEND/`, `Software Requirement.md`, `TASKS/Auth.md`, CI)
> Trạng thái build đã kiểm chứng: `mvn clean compile` → BUILD SUCCESS (73 file Java)

---

## 1. Hiện trạng (cái đang có)

### 1.1. Tổng quan số liệu

| Hạng mục | Số lượng |
|---|---|
| File Java | 73 |
| Tổng dòng code (cả docs) | ~2.900 |
| Module có API chạy được | 1 (auth) |
| Entity đã khai báo | 17 |
| Repository | 3 |
| Controller | 1 |
| Test | 0 |
| Frontend | chưa có |

### 1.2. Đã làm xong

Chỉ có **module Auth** là thực sự hoạt động end-to-end:

- `POST /api/v1/auth/register` — đăng ký + gửi mail xác thực
- `POST /api/v1/auth/resend-verification`
- `GET /api/v1/auth/verify-email?token=`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/google`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

Kèm theo: `JwtService`, `JwtAuthenticationFilter`, `SecurityConfig`, `ApiResponse`,
`GlobalExceptionHandler`, `EmailService` + template HTML, `OpenApiConfig` (Swagger).

### 1.3. Chưa làm (so với SRS)

| Phase (SRS §11) | Trạng thái |
|---|---|
| Phase 1 — Backend Foundation | ~90% (thiếu health check API) |
| Phase 2 — Auth & User | ~85% (thiếu `/api/v1/users/me`, `/api/v1/admin/users`) |
| Phase 3 — Core Education Data | **0%** (chỉ có class entity rỗng) |
| Phase 4 — Student Profile | **0%** |
| Phase 5 — Recommendation Engine | **0%** ← đây là giá trị cốt lõi của sản phẩm |
| Phase 6 — Scholarship & Shortlist | **0%** |
| Phase 7 — Frontend MVP | **0%** |

14/17 entity chỉ là khai báo field, không có repository, service, controller, DTO nào.
Toàn bộ luật tính điểm ở SRS §5 (GPA/English/Budget/SAFE-MATCH-REACH) chưa có một dòng code nào.

---

## 2. Điểm mạnh

1. **Tài liệu đi trước code, và đi rất kỹ.** `Software Requirement.md` (~1.100 dòng) đã chốt
   scope MVP, data model, enum list, công thức tính điểm, chuẩn API response, kế hoạch 7 phase.
   `TASKS/Auth.md` (680 dòng) chốt riêng luồng auth tới mức từng business rule. Đây là điểm
   mạnh nhất của dự án — phần lớn dự án sinh viên/khởi nghiệp không có thứ này.

2. **Kiến trúc package feature-first đúng như thiết kế.** Code thực tế bám sát SRS §8:
   `auth/`, `user/`, `profile/`, `country/`, `program/`… mỗi feature có `controller/dto/entity/repository/service/impl`.
   Enum dùng chung nằm ở `common/enums`. Dễ mở rộng, dễ chia việc cho nhiều người.

3. **Tách interface / implementation nhất quán.** `AuthService`/`AuthServiceImpl`,
   `JwtService`/`JwtServiceImpl`, `EmailService`/`EmailServiceImpl`… → dễ mock để test, dễ thay thế.

4. **Bảo mật auth ở mức khá tốt so với mặt bằng chung:**
   - Refresh token sinh bằng `SecureRandom` 48 byte, **lưu dạng SHA-256 hash** trong DB (lộ DB không lộ token).
   - Refresh token đặt trong **HttpOnly cookie**, path giới hạn `/api/v1/auth` → chống XSS đọc token.
   - Access token JWT ngắn hạn 30 phút, có `jti`.
   - Mật khẩu hash bằng BCrypt, có policy độ mạnh (hoa/thường/số/ký tự đặc biệt, ≥8).
   - Email verification token cũng hash, có expiry, có `used`/`usedAt`, tạo token mới thì thu hồi token cũ.
   - Login sai trả về **một message chung** ("Email or password is incorrect") thay vì phân biệt sai email/sai pass.
   - `resendVerification` trả về message trung lập, không lộ email có tồn tại hay không.
   - Google login **verify `aud` (client id)** và **bắt buộc `email_verified = true`** — nhiều người quên bước này.

5. **Chuẩn hoá response và exception tập trung.** `ApiResponse<T>` + `@RestControllerAdvice`
   → FE không phải xử lý nhiều format khác nhau. Validation error được map thành list `{field, message}`.

6. **Chuẩn bị sẵn hạ tầng dev:** Swagger UI + bearer scheme, `.env.example`, `.gitignore` che `.env`,
   `StartupConfigLogger` in ra DB/host/mail khi khởi động (không log password), chế độ
   `MAIL_ENABLED=false` in link xác thực ra console để dev không cần SMTP thật.

7. **Stack hiện đại và hợp lý:** Java 21, Spring Boot 3.5.0, jjwt 0.12.6 (API mới), records cho DTO,
   Lombok, GitHub Actions CI.

---

## 3. Điểm yếu / vấn đề cần sửa

### 3.1. Nghiêm trọng (chặn việc phát triển tiếp)

**(1) 17 entity không có getter/setter → không thể viết service cho chúng.**
`University`, `Program`, `Country`, `Scholarship`, `StudentProfile`, `AdmissionRequirement`,
`ProgramTuitionFee`, `LivingCost`, `FieldOfStudy`, `SavedShortlist`, `RecommendationResult`,
`RecommendationDetail`, `MatchReason`, `StudentTestScore`, `StudentPreferredCountry`,
`StudentPreferredField`, `ProgramScholarship` — tất cả đều thiếu `@Getter @Setter`
(chỉ `User`, `RefreshToken`, `EmailVerificationToken` có). Spring Data Mongo vẫn map được bằng
reflection, nhưng code nghiệp vụ sẽ không compile. Đây là việc phải sửa **đầu tiên** trước Phase 3.
→ Sửa: thêm `@Getter @Setter` (hoặc dùng `record`/builder) cho toàn bộ entity.

**(2) CI đang hỏng.** `.github/workflows/maven.yml` chạy `mvn -B clean package --file pom.xml`
từ thư mục gốc, nhưng repo **không có `pom.xml` ở gốc** (chỉ có `BACKEND/pom.xml`).
Mọi lần push lên `main` đều fail. Ngoài ra workflow trigger cho nhánh `develop` nhưng nhánh này không tồn tại.
→ Sửa: `--file BACKEND/pom.xml` (hoặc `working-directory: BACKEND`).

**(3) Không có bất kỳ test nào.** `src/test/` trống hoàn toàn, dù `TASKS/Auth.md` §19 bước 17
ghi rõ "Add tests for auth service" và `spring-boot-starter-test` đã có trong pom.
Với một hệ thống có luật tính điểm phức tạp như SRS §5, không test là rủi ro rất lớn:
sai một ngưỡng điểm thì toàn bộ khuyến nghị sai mà không ai biết.

**(4) MongoDB không có index nào.**
- `users.email` — không unique index → **hai request đăng ký cùng lúc cùng email sẽ tạo 2 tài khoản trùng**
  (check `findByEmail` rồi mới `save` là kiểm tra không nguyên tử). Đồng thời mọi lần login là collection scan.
- `refresh_tokens.tokenHash`, `email_verification_tokens.tokenHash` — không index, mà đây là truy vấn
  chạy ở **mọi lần refresh token**.
- Không có TTL index cho token hết hạn → 2 collection này phình vô hạn, không bao giờ được dọn.
→ Sửa: `@Indexed(unique = true)` cho email, `@Indexed` cho tokenHash, `@Indexed(expireAfter=...)` cho expiresAt,
và bật `spring.data.mongodb.auto-index-creation: true`.

**(5) `@Transactional` đang là no-op — đã kiểm chứng.**
`AuthServiceImpl.register()` và `loginWithGoogle()` gắn `@Transactional`, nhưng project chỉ có
`spring-boot-starter-data-mongodb` và **không khai báo `MongoTransactionManager`**.
Đã probe bằng test: `ApplicationContext.getBeanNamesForType(PlatformTransactionManager.class)` trả về `[]`,
nên Spring không tạo transaction proxy và annotation bị **bỏ qua âm thầm** (không lỗi, không cảnh báo).
Hệ quả thực tế: nếu `emailService.sendEmailVerification()` ném lỗi, user **đã được lưu** và không rollback
→ user kẹt ở trạng thái `PENDING_VERIFICATION` không có token nào, phải tự bấm resend.
→ Sửa: hoặc khai báo `MongoTransactionManager` (yêu cầu Mongo replica set), hoặc bỏ `@Transactional`
và xử lý bù trừ thủ công — nhưng đừng để annotation gây hiểu nhầm là đã có ACID.

### 3.2. Bảo mật

**(6) JWT secret có giá trị mặc định hard-code trong `application.yml`:**
`unipath-development-secret-key-change-before-production-2026`. File này nằm trong git.
Nếu quên set `JWT_SECRET` trên production, hệ thống chạy bằng secret công khai
→ bất kỳ ai đọc repo cũng ký được access token giả cho role ADMIN.
→ Sửa: bỏ giá trị mặc định, để app fail-fast khi thiếu biến môi trường.

**(7) Cookie `secure(false)` hard-code trong `RefreshTokenServiceImpl`** (cả `addRefreshTokenCookie`
và `clearRefreshTokenCookie`). Lên HTTPS production thì refresh token vẫn gửi qua kênh không mã hoá,
trái với chính `TASKS/Auth.md` §14 ("production: Secure: true"). SameSite `Lax` cũng hard-code,
sẽ hỏng nếu FE/BE khác domain.
→ Sửa: đưa `secure` và `sameSite` ra `application.yml` theo profile.

**(8) CORS hard-code `http://localhost:3000`** trong `SecurityConfig` → phải sửa code mới deploy được.
→ Sửa: đọc từ biến môi trường, dạng list.

**(9) Không có rate limit ở bất kỳ endpoint nào.**
- `/login` → brute-force mật khẩu vô hạn.
- `/resend-verification` → biến hệ thống thành **công cụ spam mail** (không cần đăng nhập, mỗi request
  gửi 1 email thật tới bất kỳ địa chỉ nào đã đăng ký), đồng thời đốt quota SMTP Gmail.
- `/register` → tạo tài khoản rác hàng loạt.
→ Sửa: bucket4j hoặc rate limit theo IP + theo email, tối thiểu cho 3 endpoint trên.

**(10) Lộ thông tin tài khoản (account enumeration) ở `/register` và `/login`.**
`/register` trả về "This email is already registered" và `/login` trả 409 "This email is registered with Google"
→ attacker dò được email nào đã có trong hệ thống và dùng provider gì. Đây là đánh đổi có chủ đích
với UX (Auth.md có nêu), nhưng cần ghi nhận là rủi ro đã biết.

**(11) `.env.example` để lộ hostname cluster Atlas thật + username `Unipath`**
(`unipath.bttwvph.mongodb.net`). Nên thay bằng placeholder.

**(12) `GlobalExceptionHandler` nuốt toàn bộ `Exception` mà không log gì cả.**
Lỗi 500 xảy ra trên production sẽ không có stack trace ở đâu → không debug được.
Tương tự, `JwtAuthenticationFilter` bắt `catch (Exception ignored)` và im lặng.
→ Sửa: `log.error(...)` trước khi trả response.

**(13) Lỗi 401/403 không đi qua `ApiResponse`.** Chưa cấu hình `AuthenticationEntryPoint` /
`AccessDeniedHandler`, nên request thiếu token nhận về format mặc định của Spring Security,
khác hẳn format của các lỗi khác → FE phải xử lý 2 kiểu.

**(14) Google login dùng endpoint `oauth2.googleapis.com/tokeninfo`** — gọi mạng đồng bộ ở mỗi lần
đăng nhập (chậm, phụ thuộc Google, bị rate limit). Cách chuẩn là verify chữ ký JWT cục bộ bằng JWKS
(thư viện `google-api-client` / `GoogleIdTokenVerifier`).

### 3.3. Thiết kế / kiến trúc

**(15) Data model đang là mô hình quan hệ đặt nhầm vào MongoDB.**
SRS §6 thiết kế theo kiểu SQL: bảng nối `StudentPreferredCountry`, `StudentPreferredField`,
`ProgramScholarship`, tách `AdmissionRequirement` 1-1 với `Program`, tách `MatchReason` 1-n với
`RecommendationDetail`. Trên Mongo, cách này tạo ra rất nhiều truy vấn phụ cho một màn hình
"gợi ý chương trình" (Program → University → Country → Requirement → TuitionFee → LivingCost → Scholarship).
Recommendation engine sẽ phải quét toàn bộ programs rồi join tay → chậm và phức tạp.
→ Cân nhắc: embed `AdmissionRequirement`, `tuitionFees`, `MatchReason` vào document cha;
thay bảng nối bằng mảng id (`preferredCountryIds`, `preferredFieldIds`).

**(16) Dùng `@DBRef` ở khắp nơi.** `@DBRef` gây thêm 1 query cho mỗi reference khi đọc (N+1),
và Spring Data khuyến nghị tránh. Với entity `Program` có 2 `@DBRef` thì lấy 100 program = 200+ query.
→ Sửa: lưu id thuần (`String universityId`) và tự nạp theo lô, hoặc dùng `$lookup` aggregation.
Ghi chú thêm: `User.java` và `Country.java` có import `@DBRef` thừa (không dùng).

**(17) Gửi email đồng bộ trong luồng đăng ký.** `register()` chờ SMTP Gmail xong mới trả response
→ API đăng ký chậm 1-3 giây, và SMTP lỗi thì user nhận 500 dù tài khoản đã tạo (xem mục 5).
→ Sửa: `@Async` + `@EnableAsync`, hoặc hàng đợi.

**(18) `JwtAuthenticationFilter` query DB mỗi request.** Mất ý nghĩa "stateless" của JWT.
Chấp nhận được ở MVP (đổi lại được kiểm tra trạng thái user tức thời), nhưng cần biết là điểm nghẽn
khi có tải, và nên cache.

**(19) Dùng `LocalDateTime` cho toàn bộ timestamp.** Sản phẩm nhắm tới du học nhiều quốc gia,
lưu thời gian không có timezone sẽ gây lệch khi deploy server khác múi giờ.
→ Sửa: dùng `Instant` (hoặc `OffsetDateTime`) và bật auditing (`@CreatedDate`/`@LastModifiedDate`)
thay vì gán `LocalDateTime.now()` thủ công ở 6 chỗ.

**(20) Không có refresh token rotation.** Auth.md §10 đã ghi là "recommended but can be implemented later" —
nên đây là nợ kỹ thuật đã biết. Hiện tại một refresh token bị đánh cắp dùng được trọn 14 ngày.
Cũng chưa có cơ chế revoke toàn bộ session của một user (đổi mật khẩu / bị hack).

### 3.4. Không khớp giữa tài liệu và code

**(21) Luồng verify email chưa đúng thiết kế.** Config có `app.frontend.verification-success-url`
và `verification-failed-url` (đọc từ `FRONTEND_VERIFY_*` env) nhưng **không có dòng code nào dùng chúng**.
Controller `GET /verify-email` trả JSON. Nghĩa là user bấm link trong email sẽ nhìn thấy một cục JSON
thô trên trình duyệt thay vì được redirect về trang FE — trái với Auth.md §6.
→ Sửa: trả `302 Redirect` về `verification-success-url` / `verification-failed-url`.

**(22) Format error response không khớp SRS §10.2.** SRS quy định lỗi có key `errors`;
`ApiResponse` lại nhét danh sách lỗi vào key `data`. FE làm theo tài liệu sẽ đọc sai chỗ.

**(23) Chưa có pagination envelope** (`items/page/size/totalItems/totalPages`) theo SRS §10.3,
trong khi Phase 3 sắp tới toàn API danh sách.

**(24) Tên endpoint lệch:** SRS §4.1 ghi `POST /api/v1/auth/refresh-token`, code dùng `/refresh`
(khớp Auth.md). Nên cập nhật SRS cho thống nhất.

**(25) Thiếu health check API** — là task của Phase 1 trong SRS, chưa có (chưa thêm `spring-boot-starter-actuator`).

**(26) Repo structure lệch SRS §9:** SRS mô tả có `pom.xml` ở gốc, thư mục `FRONTEND/`, file `SWR.md`.
Thực tế không có cái nào (file SRS tên `Software Requirement.md`). Đây chính là nguyên nhân CI hỏng ở mục (2).

### 3.5. Code chết / dọn dẹp

- `CustomUserDetailsService` — viết ra nhưng không nơi nào dùng (không dùng `AuthenticationManager`/`DaoAuthenticationProvider`).
- `EmailVerificationRequiredResponse` — import trong `AuthServiceImpl` nhưng không dùng.
- `UserRepository.existsByEmail()`, `findByGoogleSubject()` — không dùng.
- `JwtService.isValid()` — không dùng (filter gọi `extractUserId` rồi bắt exception).
- `System.out.println` trong `EmailServiceImpl` — nên dùng `log.info` (`@Slf4j` đã có sẵn ở chỗ khác).
- `UriComponentsBuilder.fromHttpUrl()` đã deprecated (compiler đang cảnh báo) → dùng `fromUriString()`.
- `AuthServiceImpl.login()` kiểm tra `emailVerified` sau khi `ensureCanLogin()` đã chặn `PENDING_VERIFICATION` — logic trùng.
- `/api/v1/auth/logout` đang `permitAll` — chấp nhận được (chỉ đọc cookie) nhưng nên xem lại.
- Chưa có `Dockerfile` / `docker-compose.yml` để dựng Mongo local — người mới vào dự án phải tự cài.

---

## 4. Đề xuất thứ tự ưu tiên

**Nhóm A — làm ngay, chặn mọi thứ khác (ước tính 1-2 ngày):**
1. Thêm `@Getter @Setter` cho 17 entity *(mục 1)*
2. Sửa đường dẫn pom trong GitHub Actions *(mục 2)*
3. Thêm index Mongo: unique email, index tokenHash, TTL cho token hết hạn *(mục 4)*
4. Bỏ JWT secret mặc định, đưa cookie `secure`/`sameSite` và CORS origin ra config *(mục 6, 7, 8)*
5. Quyết định dứt điểm về `@Transactional`: khai báo `MongoTransactionManager` hoặc gỡ bỏ *(mục 5)*

**Nhóm B — trước khi bắt đầu Phase 3 (2-3 ngày):**
6. Viết test cho `AuthServiceImpl` + `RefreshTokenServiceImpl` + `EmailVerificationServiceImpl`, cho CI chạy test *(mục 3)*
7. Sửa verify-email thành redirect về FE *(mục 21)*
8. Thêm `AuthenticationEntryPoint`/`AccessDeniedHandler` và log lỗi trong exception handler *(mục 12, 13)*
9. Thống nhất format `errors` + thêm `PageResponse` theo SRS §10 *(mục 22, 23)*
10. Rate limit cho `/login`, `/register`, `/resend-verification` *(mục 9)*

**Nhóm C — chốt thiết kế trước khi code Phase 3-5 (nửa ngày họp + refactor):**
11. Xem lại data model cho Mongo: embed vs reference, bỏ `@DBRef`, bỏ bảng nối *(mục 15, 16)*
12. Chuyển timestamp sang `Instant` + auditing khi số lượng entity còn ít *(mục 19)*

**Nhóm D — làm song song với Phase 3+:**
13. Gửi email bất đồng bộ *(mục 17)*
14. Verify Google id_token cục bộ bằng JWKS *(mục 14)*
15. Refresh token rotation + revoke-all-sessions *(mục 20)*
16. Dọn code chết, thêm Dockerfile/docker-compose, health check *(mục 25, 3.5)*

---

## 5. Kết luận ngắn

Nền móng tốt hơn mức trung bình: tài liệu chi tiết, kiến trúc rõ ràng, module auth được làm cẩn thận
(hash token, HttpOnly cookie, verify `aud` của Google). Nhưng dự án mới đi được **khoảng 12-15% khối lượng MVP**,
và **giá trị cốt lõi — recommendation engine — chưa có dòng code nào**.

Ba việc phải làm trước khi viết thêm bất kỳ feature nào: **thêm getter/setter cho entity**,
**sửa CI**, và **thêm index cho MongoDB**. Ba việc này cộng lại chưa tới một ngày công nhưng
nếu bỏ qua thì mọi module viết sau đều sẽ phải sửa lại.
