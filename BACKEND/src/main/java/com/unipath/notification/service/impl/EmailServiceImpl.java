package com.unipath.notification.service.impl;

import com.unipath.common.exception.BusinessException;
import com.unipath.notification.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.enabled}")
    private boolean mailEnabled;

    @Value("${app.mail.from-email}")
    private String fromEmail;

    @Value("${app.mail.from-name}")
    private String fromName;

    @Override
    public void sendEmailVerification(String toEmail, String fullName, String verificationLink) {
        if (!mailEnabled) {
            System.out.println("[UniPath DEV] Email verification link for " + toEmail + ": " + verificationLink);
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());
            helper.setFrom(fromEmail, fromName);
            helper.setTo(toEmail);
            helper.setSubject("Verify your UniPath account");
            helper.setText(buildVerificationHtml(fullName, verificationLink), true);
            mailSender.send(message);
        } catch (MessagingException | IOException exception) {
            throw new BusinessException("Could not send verification email.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public void sendPasswordReset(String toEmail, String fullName, String resetLink) {
        if (!mailEnabled) {
            System.out.println("[UniPath DEV] Password reset link for " + toEmail + ": " + resetLink);
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());
            helper.setFrom(fromEmail, fromName);
            helper.setTo(toEmail);
            helper.setSubject("Reset your UniPath password");
            helper.setText(buildPasswordResetHtml(fullName, resetLink), true);
            mailSender.send(message);
        } catch (MessagingException | IOException exception) {
            throw new BusinessException("Could not send password reset email.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String buildVerificationHtml(String fullName, String verificationLink) throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/email-verification.html");
        String template = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        return template
                .replace("{{fullName}}", escapeHtml(fullName))
                .replace("{{verificationLink}}", verificationLink);
    }

    private String buildPasswordResetHtml(String fullName, String resetLink) throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/password-reset.html");
        String template = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        return template
                .replace("{{fullName}}", escapeHtml(fullName))
                .replace("{{resetLink}}", resetLink);
    }

    private String escapeHtml(String value) {
        if (value == null || value.isBlank()) {
            return "there";
        }
        return value
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
