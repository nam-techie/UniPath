package com.unipath.auth.service;

import com.unipath.auth.dto.ResendVerificationResponse;
import com.unipath.user.entity.User;

public interface EmailVerificationService {

    void createAndSendVerification(User user);

    ResendVerificationResponse resendVerification(String email);

    void verifyEmail(String rawToken);
}
