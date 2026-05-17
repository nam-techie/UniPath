package com.unipath.security.jwt;

import com.unipath.user.entity.User;

public interface JwtService {

    String generateAccessToken(User user);

    String extractUserId(String token);

    boolean isValid(String token);
}
