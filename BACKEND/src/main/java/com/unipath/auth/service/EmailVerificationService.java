package com.unipath.auth.service;

import com.unipath.user.entity.User;

public interface EmailVerificationService {

    void createAndSendVerification(User user);

    void resendVerification(String email);

    void verifyEmail(String rawToken);
}
