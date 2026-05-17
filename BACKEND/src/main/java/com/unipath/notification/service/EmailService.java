package com.unipath.notification.service;

public interface EmailService {

    void sendEmailVerification(String toEmail, String fullName, String verificationLink);
}
