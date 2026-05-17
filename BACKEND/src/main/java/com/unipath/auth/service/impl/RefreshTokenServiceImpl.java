package com.unipath.auth.service.impl;

import com.unipath.auth.entity.RefreshToken;
import com.unipath.auth.repository.RefreshTokenRepository;
import com.unipath.auth.service.RefreshTokenService;
import com.unipath.common.exception.BusinessException;
import com.unipath.common.util.TokenHashUtil;
import com.unipath.user.entity.User;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.auth.refresh-token-days}")
    private long refreshTokenDays;

    @Value("${app.auth.refresh-cookie-name}")
    private String refreshCookieName;

    @Value("${app.auth.refresh-cookie-path}")
    private String refreshCookiePath;

    @Override
    public String createRefreshToken(User user) {
        String rawToken = generateRawToken();
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setTokenHash(TokenHashUtil.sha256(rawToken));
        refreshToken.setExpiresAt(LocalDateTime.now().plusDays(refreshTokenDays));
        refreshToken.setRevoked(false);
        refreshToken.setCreatedAt(LocalDateTime.now());
        refreshTokenRepository.save(refreshToken);
        return rawToken;
    }

    @Override
    public User validateRefreshToken(String rawRefreshToken) {
        RefreshToken refreshToken = refreshTokenRepository.findByTokenHash(TokenHashUtil.sha256(rawRefreshToken))
                .orElseThrow(() -> new BusinessException("Invalid refresh token.", HttpStatus.UNAUTHORIZED));

        if (Boolean.TRUE.equals(refreshToken.getRevoked())) {
            throw new BusinessException("Refresh token has been revoked.", HttpStatus.UNAUTHORIZED);
        }

        if (refreshToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Refresh token has expired.", HttpStatus.UNAUTHORIZED);
        }

        return refreshToken.getUser();
    }

    @Override
    public void revokeRefreshToken(String rawRefreshToken) {
        refreshTokenRepository.findByTokenHash(TokenHashUtil.sha256(rawRefreshToken)).ifPresent(refreshToken -> {
            refreshToken.setRevoked(true);
            refreshToken.setRevokedAt(LocalDateTime.now());
            refreshTokenRepository.save(refreshToken);
        });
    }

    @Override
    public void addRefreshTokenCookie(HttpServletResponse response, String rawRefreshToken) {
        ResponseCookie cookie = ResponseCookie.from(refreshCookieName, rawRefreshToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path(refreshCookiePath)
                .maxAge(Duration.ofDays(refreshTokenDays))
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    @Override
    public void clearRefreshTokenCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(refreshCookieName, "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path(refreshCookiePath)
                .maxAge(Duration.ZERO)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private String generateRawToken() {
        byte[] bytes = new byte[48];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
