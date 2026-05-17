package com.unipath.auth.service;

import com.unipath.auth.dto.AuthResponse;
import com.unipath.auth.dto.GoogleLoginRequest;
import com.unipath.auth.dto.LoginRequest;
import com.unipath.auth.dto.RegisterRequest;
import com.unipath.auth.dto.RegisterResponse;
import com.unipath.auth.dto.UserSummaryResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request, HttpServletResponse response);

    AuthResponse loginWithGoogle(GoogleLoginRequest request, HttpServletResponse response);

    AuthResponse refresh(String rawRefreshToken);

    void logout(String rawRefreshToken, HttpServletResponse response);

    UserSummaryResponse getCurrentUser();
}
