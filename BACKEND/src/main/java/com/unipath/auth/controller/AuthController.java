package com.unipath.auth.controller;

import com.unipath.auth.dto.AuthResponse;
import com.unipath.auth.dto.GoogleLoginRequest;
import com.unipath.auth.dto.LoginRequest;
import com.unipath.auth.dto.RegisterRequest;
import com.unipath.auth.dto.RegisterResponse;
import com.unipath.auth.dto.ResendVerificationRequest;
import com.unipath.auth.dto.UserSummaryResponse;
import com.unipath.auth.service.AuthService;
import com.unipath.auth.service.EmailVerificationService;
import com.unipath.common.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final EmailVerificationService emailVerificationService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponse>> register(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Registration successful. Please verify your email.", response));
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<ApiResponse<Void>> resendVerification(
            @Valid @RequestBody ResendVerificationRequest request
    ) {
        emailVerificationService.resendVerification(request.email());
        return ResponseEntity.ok(ApiResponse.success("If the account needs verification, a new email has been sent.", null));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@RequestParam String token) {
        emailVerificationService.verifyEmail(token);
        return ResponseEntity.ok(ApiResponse.success("Email verified successfully.", null));
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
