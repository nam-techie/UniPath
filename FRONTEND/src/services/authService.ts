import {
  apiRequest,
  clearAccessToken,
  clearStoredUser,
  setAccessToken,
  setStoredUser,
} from './apiClient';

export interface UserSummary {
  id: string;
  email: string;
  fullName: string;
  role: string;
  authProvider?: string;
  emailVerified?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResendVerificationPayload {
  email: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResendVerificationResponse {
  attemptsUsed: number;
  maxAttempts: number;
  retryAfterSeconds: number;
  locked: boolean;
}

export interface AuthResponse {
  accessToken: string;
  user: UserSummary;
}

export interface RegisterResponse {
  email: string;
  requiresEmailVerification: boolean;
}

export const login = async (payload: LoginPayload) => {
  const response = await apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    auth: false,
  });

  setAccessToken(response.data.accessToken);
  setStoredUser(response.data.user);

  return response;
};

export const refresh = async () => {
  const response = await apiRequest<AuthResponse>('/auth/refresh', {
    method: 'POST',
    auth: false,
  });

  setAccessToken(response.data.accessToken);
  setStoredUser(response.data.user);

  return response;
};

export const register = (payload: RegisterPayload) =>
  apiRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    auth: false,
  });

export const resendVerification = (payload: ResendVerificationPayload) =>
  apiRequest<ResendVerificationResponse>('/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify(payload),
    auth: false,
  });

export const forgotPassword = (payload: ForgotPasswordPayload) =>
  apiRequest<void>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
    auth: false,
  });

export const validatePasswordResetToken = (token: string) =>
  apiRequest<void>('/auth/reset-password/validate', {
    method: 'POST',
    body: JSON.stringify({ token }),
    auth: false,
  });

export const resetPassword = (payload: ResetPasswordPayload) =>
  apiRequest<void>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
    auth: false,
  });

export const logout = async () => {
  try {
    await apiRequest<void>('/auth/logout', {
      method: 'POST',
    });
  } finally {
    clearAccessToken();
    clearStoredUser();
  }
};

