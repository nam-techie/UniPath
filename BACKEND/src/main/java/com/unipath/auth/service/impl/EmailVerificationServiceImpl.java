package com.unipath.auth.service.impl;

import com.unipath.auth.dto.ResendVerificationResponse;
import com.unipath.auth.entity.EmailVerificationToken;
import com.unipath.auth.repository.EmailVerificationTokenRepository;
import com.unipath.auth.service.EmailVerificationService;
import com.unipath.common.enums.UserStatus;
import com.unipath.common.exception.BusinessException;
import com.unipath.common.util.TokenHashUtil;
import com.unipath.notification.service.EmailService;
import com.unipath.user.entity.User;
import com.unipath.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class EmailVerificationServiceImpl implements EmailVerificationService {

    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final SecureRandom secureRandom = new SecureRandom();
    private static final int MAX_RESEND_ATTEMPTS = 5;
    private static final Duration[] RESEND_COOLDOWNS = {
            Duration.ofMinutes(1),
            Duration.ofMinutes(5),
            Duration.ofMinutes(30),
            Duration.ofHours(2),
            Duration.ofHours(24)
    };

    @Value("${app.backend.base-url}")
    private String backendBaseUrl;

    @Value("${app.auth.verification-token-hours}")
    private long verificationTokenHours;

    @Override
    public void createAndSendVerification(User user) {
        revokeUnusedTokens(user);
        String rawToken = generateRawToken();
        EmailVerificationToken token = new EmailVerificationToken();
        token.setUser(user);
        token.setTokenHash(TokenHashUtil.sha256(rawToken));
        token.setExpiresAt(LocalDateTime.now().plusHours(verificationTokenHours));
        token.setUsed(false);
        token.setCreatedAt(LocalDateTime.now());
        emailVerificationTokenRepository.save(token);

        String verificationLink = UriComponentsBuilder
                .fromHttpUrl(backendBaseUrl)
                .path("/api/v1/auth/verify-email")
                .queryParam("token", rawToken)
                .toUriString();

        emailService.sendEmailVerification(user.getEmail(), user.getFullName(), verificationLink);
    }

    @Override
    public ResendVerificationResponse resendVerification(String email) {
        return userRepository.findByEmail(email.trim().toLowerCase())
                .filter(user -> !Boolean.TRUE.equals(user.getEmailVerified()))
                .filter(user -> user.getStatus() == UserStatus.PENDING_VERIFICATION)
                .map(this::resendForPendingUser)
                .orElseGet(() -> new ResendVerificationResponse(0, MAX_RESEND_ATTEMPTS, 0, false));
    }

    @Override
    public void verifyEmail(String rawToken) {
        EmailVerificationToken token = emailVerificationTokenRepository.findByTokenHash(TokenHashUtil.sha256(rawToken))
                .orElseThrow(() -> new BusinessException("Verification token is invalid.", HttpStatus.BAD_REQUEST));

        if (Boolean.TRUE.equals(token.getUsed())) {
            throw new BusinessException("Verification token has already been used.", HttpStatus.BAD_REQUEST);
        }

        if (token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Verification token has expired.", HttpStatus.BAD_REQUEST);
        }

        User user = token.getUser();
        if (user.getStatus() == UserStatus.DISABLED) {
            throw new BusinessException("This account is disabled.", HttpStatus.FORBIDDEN);
        }

        user.setEmailVerified(true);
        user.setStatus(UserStatus.ACTIVE);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        token.setUsed(true);
        token.setUsedAt(LocalDateTime.now());
        emailVerificationTokenRepository.save(token);
    }

    private void revokeUnusedTokens(User user) {
        LocalDateTime now = LocalDateTime.now();
        emailVerificationTokenRepository.findAllByUserAndUsedFalse(user).forEach(token -> {
            token.setUsed(true);
            token.setUsedAt(now);
            emailVerificationTokenRepository.save(token);
        });
    }

    private ResendVerificationResponse resendForPendingUser(User user) {
        LocalDateTime now = LocalDateTime.now();
        int attemptsUsed = getAttemptsUsed(user);
        LocalDateTime availableAt = user.getVerificationResendAvailableAt();

        if (availableAt != null && now.isBefore(availableAt)) {
            long retryAfterSeconds = Math.max(1, Duration.between(now, availableAt).toSeconds());
            throw new BusinessException(
                    "Please wait " + formatDuration(retryAfterSeconds) + " before requesting another verification email.",
                    HttpStatus.TOO_MANY_REQUESTS
            );
        }

        if (attemptsUsed >= MAX_RESEND_ATTEMPTS - 1) {
            user.setStatus(UserStatus.DISABLED);
            user.setUpdatedAt(now);
            userRepository.save(user);
            throw new BusinessException(
                    "This account has been locked after too many verification email requests.",
                    HttpStatus.FORBIDDEN
            );
        }

        createAndSendVerification(user);

        int updatedAttempts = attemptsUsed + 1;
        long retryAfterSeconds = cooldownAfterAttempt(updatedAttempts).toSeconds();
        user.setVerificationResendCount(updatedAttempts);
        user.setVerificationResendAvailableAt(now.plusSeconds(retryAfterSeconds));
        user.setUpdatedAt(now);
        userRepository.save(user);

        return new ResendVerificationResponse(
                updatedAttempts,
                MAX_RESEND_ATTEMPTS,
                retryAfterSeconds,
                false
        );
    }

    private int getAttemptsUsed(User user) {
        return user.getVerificationResendCount() == null ? 0 : user.getVerificationResendCount();
    }

    private Duration cooldownAfterAttempt(int attemptsUsed) {
        int index = Math.min(attemptsUsed, RESEND_COOLDOWNS.length - 1);
        return RESEND_COOLDOWNS[index];
    }

    private String formatDuration(long totalSeconds) {
        long minutes = totalSeconds / 60;
        long seconds = totalSeconds % 60;

        if (minutes > 0 && seconds > 0) {
            return minutes + "m " + seconds + "s";
        }

        if (minutes > 0) {
            return minutes + "m";
        }

        return seconds + "s";
    }

    private String generateRawToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
