package com.unipath.auth.service.impl;

import com.unipath.auth.dto.ResetPasswordRequest;
import com.unipath.auth.entity.PasswordResetToken;
import com.unipath.auth.repository.PasswordResetTokenRepository;
import com.unipath.auth.repository.RefreshTokenRepository;
import com.unipath.auth.service.PasswordResetService;
import com.unipath.common.enums.AuthProvider;
import com.unipath.common.enums.UserStatus;
import com.unipath.common.exception.BusinessException;
import com.unipath.common.util.TokenHashUtil;
import com.unipath.notification.service.EmailService;
import com.unipath.user.entity.User;
import com.unipath.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class PasswordResetServiceImpl implements PasswordResetService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.frontend.reset-password-url}")
    private String resetPasswordUrl;

    @Value("${app.auth.password-reset-token-minutes}")
    private long passwordResetTokenMinutes;

    @Override
    public void requestPasswordReset(String email) {
        String normalizedEmail = email.trim().toLowerCase();
        userRepository.findByEmail(normalizedEmail)
                .filter(user -> user.getAuthProvider() == AuthProvider.EMAIL_PASSWORD)
                .filter(user -> user.getStatus() == UserStatus.ACTIVE)
                .ifPresent(this::createAndSendPasswordReset);
    }

    @Override
    public void validateResetToken(String rawToken) {
        getValidResetToken(rawToken);
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        if (!request.password().equals(request.confirmPassword())) {
            throw new BusinessException("Password and confirm password do not match.", HttpStatus.BAD_REQUEST);
        }

        PasswordResetToken token = getValidResetToken(request.token());
        User user = token.getUser();
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BusinessException("This account is disabled.", HttpStatus.FORBIDDEN);
        }

        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        token.setUsed(true);
        token.setUsedAt(LocalDateTime.now());
        passwordResetTokenRepository.save(token);
        revokeUnusedResetTokens(user);
        revokeRefreshTokens(user);
    }

    private void createAndSendPasswordReset(User user) {
        revokeUnusedResetTokens(user);

        String rawToken = generateRawToken();
        PasswordResetToken token = new PasswordResetToken();
        token.setUser(user);
        token.setTokenHash(TokenHashUtil.sha256(rawToken));
        token.setExpiresAt(LocalDateTime.now().plusMinutes(passwordResetTokenMinutes));
        token.setUsed(false);
        token.setCreatedAt(LocalDateTime.now());
        passwordResetTokenRepository.save(token);

        String resetLink = UriComponentsBuilder
                .fromHttpUrl(resetPasswordUrl)
                .queryParam("token", rawToken)
                .toUriString();

        emailService.sendPasswordReset(user.getEmail(), user.getFullName(), resetLink);
    }

    private PasswordResetToken getValidResetToken(String rawToken) {
        PasswordResetToken token = passwordResetTokenRepository.findByTokenHash(TokenHashUtil.sha256(rawToken))
                .orElseThrow(() -> new BusinessException("Password reset link is invalid.", HttpStatus.BAD_REQUEST));

        if (Boolean.TRUE.equals(token.getUsed())) {
            throw new BusinessException("Password reset link has already been used.", HttpStatus.BAD_REQUEST);
        }

        if (token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Password reset link has expired. Request a new one.", HttpStatus.BAD_REQUEST);
        }

        return token;
    }

    private void revokeUnusedResetTokens(User user) {
        LocalDateTime now = LocalDateTime.now();
        passwordResetTokenRepository.findAllByUserAndUsedFalse(user).forEach(token -> {
            token.setUsed(true);
            token.setUsedAt(now);
            passwordResetTokenRepository.save(token);
        });
    }

    private void revokeRefreshTokens(User user) {
        LocalDateTime now = LocalDateTime.now();
        refreshTokenRepository.findAllByUserAndRevokedFalse(user).forEach(refreshToken -> {
            refreshToken.setRevoked(true);
            refreshToken.setRevokedAt(now);
            refreshTokenRepository.save(refreshToken);
        });
    }

    private String generateRawToken() {
        byte[] bytes = new byte[48];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
