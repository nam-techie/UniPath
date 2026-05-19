package com.unipath.auth.service.impl;

import com.unipath.auth.dto.AuthResponse;
import com.unipath.auth.dto.EmailVerificationRequiredResponse;
import com.unipath.auth.dto.GoogleLoginRequest;
import com.unipath.auth.dto.GoogleTokenPayload;
import com.unipath.auth.dto.LoginRequest;
import com.unipath.auth.dto.RegisterRequest;
import com.unipath.auth.dto.RegisterResponse;
import com.unipath.auth.dto.UserSummaryResponse;
import com.unipath.auth.service.AuthService;
import com.unipath.auth.service.EmailVerificationService;
import com.unipath.auth.service.GoogleTokenVerifierService;
import com.unipath.auth.service.RefreshTokenService;
import com.unipath.common.enums.AuthProvider;
import com.unipath.common.enums.UserRole;
import com.unipath.common.enums.UserStatus;
import com.unipath.common.exception.BusinessException;
import com.unipath.security.jwt.JwtService;
import com.unipath.security.principal.UserPrincipal;
import com.unipath.user.entity.User;
import com.unipath.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final EmailVerificationService emailVerificationService;
    private final GoogleTokenVerifierService googleTokenVerifierService;

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.email());
        if (!request.password().equals(request.confirmPassword())) {
            throw new BusinessException("Password and confirm password do not match.", HttpStatus.BAD_REQUEST);
        }

        userRepository.findByEmail(email).ifPresent(user -> {
            if (user.getAuthProvider() == AuthProvider.GOOGLE) {
                throw new BusinessException(
                        "This email is already registered with Google. Please login using Google.",
                        HttpStatus.CONFLICT
                );
            }
            throw new BusinessException("This email is already registered.", HttpStatus.CONFLICT);
        });

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setFullName(request.fullName().trim());
        user.setRole(UserRole.STUDENT);
        user.setStatus(UserStatus.PENDING_VERIFICATION);
        user.setAuthProvider(AuthProvider.EMAIL_PASSWORD);
        user.setEmailVerified(false);
        user.setVerificationResendCount(0);
        user.setVerificationResendAvailableAt(LocalDateTime.now().plusMinutes(1));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        emailVerificationService.createAndSendVerification(user);
        return new RegisterResponse(email, true);
    }

    @Override
    public AuthResponse login(LoginRequest request, HttpServletResponse response) {
        String email = normalizeEmail(request.email());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> invalidCredentials());

        if (user.getAuthProvider() != AuthProvider.EMAIL_PASSWORD) {
            throw new BusinessException(
                    "This email is registered with Google. Please login using Google.",
                    HttpStatus.CONFLICT
            );
        }

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw invalidCredentials();
        }

        ensureCanLogin(user);

        if (!Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new BusinessException(
                    "Please verify your email before logging in.",
                    HttpStatus.FORBIDDEN
            );
        }

        return issueAuthResponse(user, response);
    }

    @Override
    @Transactional
    public AuthResponse loginWithGoogle(GoogleLoginRequest request, HttpServletResponse response) {
        GoogleTokenPayload payload = googleTokenVerifierService.verify(request.idToken());
        String email = normalizeEmail(payload.email());

        User user = userRepository.findByEmail(email).map(existingUser -> {
            if (existingUser.getAuthProvider() != AuthProvider.GOOGLE) {
                throw new BusinessException(
                        "This email is already registered with email/password. Please login using email and password.",
                        HttpStatus.CONFLICT
                );
            }

            if (!payload.subject().equals(existingUser.getGoogleSubject())) {
                throw new BusinessException("Google account does not match this user.", HttpStatus.UNAUTHORIZED);
            }

            return existingUser;
        }).orElseGet(() -> createGoogleUser(payload, email));

        ensureCanLogin(user);
        return issueAuthResponse(user, response);
    }

    @Override
    public AuthResponse refresh(String rawRefreshToken) {
        if (rawRefreshToken == null || rawRefreshToken.isBlank()) {
            throw new BusinessException("Refresh token is required.", HttpStatus.UNAUTHORIZED);
        }

        User user = refreshTokenService.validateRefreshToken(rawRefreshToken);
        ensureCanLogin(user);
        return new AuthResponse(jwtService.generateAccessToken(user), toUserSummary(user));
    }

    @Override
    public void logout(String rawRefreshToken, HttpServletResponse response) {
        if (rawRefreshToken != null && !rawRefreshToken.isBlank()) {
            refreshTokenService.revokeRefreshToken(rawRefreshToken);
        }
        refreshTokenService.clearRefreshTokenCookie(response);
    }

    @Override
    public UserSummaryResponse getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal principal)) {
            throw new BusinessException("Authentication is required.", HttpStatus.UNAUTHORIZED);
        }
        return toUserSummary(principal.getUser());
    }

    private AuthResponse issueAuthResponse(User user, HttpServletResponse response) {
        String rawRefreshToken = refreshTokenService.createRefreshToken(user);
        refreshTokenService.addRefreshTokenCookie(response, rawRefreshToken);
        return new AuthResponse(jwtService.generateAccessToken(user), toUserSummary(user));
    }

    private User createGoogleUser(GoogleTokenPayload payload, String email) {
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(null);
        user.setFullName(payload.fullName());
        user.setRole(UserRole.STUDENT);
        user.setStatus(UserStatus.ACTIVE);
        user.setAuthProvider(AuthProvider.GOOGLE);
        user.setGoogleSubject(payload.subject());
        user.setEmailVerified(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    private void ensureCanLogin(User user) {
        if (user.getStatus() == UserStatus.PENDING_VERIFICATION) {
            throw new BusinessException("Please verify your email before logging in.", HttpStatus.FORBIDDEN);
        }

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BusinessException("This account is disabled.", HttpStatus.FORBIDDEN);
        }
    }

    private UserSummaryResponse toUserSummary(User user) {
        return new UserSummaryResponse(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                user.getAuthProvider(),
                user.getEmailVerified()
        );
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }

    private BusinessException invalidCredentials() {
        return new BusinessException("Email or password is incorrect.", HttpStatus.UNAUTHORIZED);
    }
}
