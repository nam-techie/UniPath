package com.unipath.auth.service;

import com.unipath.user.entity.User;
import jakarta.servlet.http.HttpServletResponse;

public interface RefreshTokenService {

    String createRefreshToken(User user);

    User validateRefreshToken(String rawRefreshToken);

    void revokeRefreshToken(String rawRefreshToken);

    void addRefreshTokenCookie(HttpServletResponse response, String rawRefreshToken);

    void clearRefreshTokenCookie(HttpServletResponse response);
}
