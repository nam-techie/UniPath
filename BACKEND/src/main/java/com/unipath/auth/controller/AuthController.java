package com.unipath.auth.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unipath.auth.dto.AuthResponse;
import com.unipath.auth.dto.ForgotPasswordRequest;
import com.unipath.auth.dto.GoogleLoginRequest;
import com.unipath.auth.dto.LoginRequest;
import com.unipath.auth.dto.RegisterRequest;
import com.unipath.auth.dto.RegisterResponse;
import com.unipath.auth.dto.ResendVerificationRequest;
import com.unipath.auth.dto.ResendVerificationResponse;
import com.unipath.auth.dto.ResetPasswordRequest;
import com.unipath.auth.dto.UserSummaryResponse;
import com.unipath.auth.dto.ValidatePasswordResetTokenRequest;
import com.unipath.auth.service.AuthService;
import com.unipath.auth.service.EmailVerificationService;
import com.unipath.auth.service.PasswordResetService;
import com.unipath.common.response.ApiResponse;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final EmailVerificationService emailVerificationService;
    private final PasswordResetService passwordResetService;

    @Value("${app.frontend.verification-success-url}")
    private String verificationSuccessUrl;

    @Value("${app.frontend.verification-failed-url}")
    private String verificationFailedUrl;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponse>> register(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Registration successful. Please verify your email.", response));
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<ApiResponse<ResendVerificationResponse>> resendVerification(
            @Valid @RequestBody ResendVerificationRequest request
    ) {
        ResendVerificationResponse response = emailVerificationService.resendVerification(request.email());
        return ResponseEntity.ok(ApiResponse.success("Verification email request accepted.", response));
    }

    @GetMapping("/verify-email")
    public void verifyEmail(@RequestParam String token, HttpServletResponse servletResponse) {
        try {
            com.unipath.user.entity.User user = emailVerificationService.verifyEmail(token);
            try {
                // create session (refresh cookie + access token issued server-side)
                authService.loginUser(user, servletResponse);
                servletResponse.sendRedirect(verificationSuccessUrl);
            } catch (Exception e) {
                try {
                    servletResponse.sendRedirect(verificationSuccessUrl);
                } catch (Exception ex) {
                    // swallow
                }
            }
        } catch (Exception ex) {
            try {
                servletResponse.sendRedirect(verificationFailedUrl);
            } catch (Exception e) {
                // swallow
            }
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        passwordResetService.requestPasswordReset(request.email());
        return ResponseEntity.ok(ApiResponse.success("If the account exists, a password reset link has been sent.", null));
    }

    @PostMapping("/reset-password/validate")
    public ResponseEntity<ApiResponse<Void>> validatePasswordResetToken(
            @Valid @RequestBody ValidatePasswordResetTokenRequest request
    ) {
        passwordResetService.validateResetToken(request.token());
        return ResponseEntity.ok(ApiResponse.success("Password reset link is valid.", null));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        passwordResetService.resetPassword(request);
        return ResponseEntity.ok(ApiResponse.success("Password has been reset successfully.", null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse servletResponse
    ) {
        AuthResponse response = authService.login(request, servletResponse);
        return ResponseEntity.ok(ApiResponse.success("Login successful.", response));
    }

    @PostMapping("/google")
    public ResponseEntity<ApiResponse<AuthResponse>> googleLogin(
            @Valid @RequestBody GoogleLoginRequest request,
            HttpServletResponse servletResponse
    ) {
        AuthResponse response = authService.loginWithGoogle(request, servletResponse);
        return ResponseEntity.ok(ApiResponse.success("Google login successful.", response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(
            @CookieValue(name = "UNIPATH_REFRESH_TOKEN", required = false) String refreshToken
    ) {
        AuthResponse response = authService.refresh(refreshToken);
        return ResponseEntity.ok(ApiResponse.success("Access token refreshed successfully.", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @CookieValue(name = "UNIPATH_REFRESH_TOKEN", required = false) String refreshToken,
            HttpServletResponse servletResponse
    ) {
        authService.logout(refreshToken, servletResponse);
        return ResponseEntity.ok(ApiResponse.success("Logout successful.", null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserSummaryResponse>> me() {
        UserSummaryResponse response = authService.getCurrentUser();
        return ResponseEntity.ok(ApiResponse.success("Current user fetched successfully.", response));
    }
}
