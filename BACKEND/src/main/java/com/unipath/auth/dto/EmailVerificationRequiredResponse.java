package com.unipath.auth.dto;

public record EmailVerificationRequiredResponse(
        boolean requiresEmailVerification,
        String email
) {
}
