package com.unipath.auth.service;

import com.unipath.auth.dto.ResetPasswordRequest;

public interface PasswordResetService {

    void requestPasswordReset(String email);

    void validateResetToken(String rawToken);

    void resetPassword(ResetPasswordRequest request);
}
