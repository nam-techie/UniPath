package com.unipath.auth.dto;

public record ResendVerificationResponse(
        int attemptsUsed,
        int maxAttempts,
        long retryAfterSeconds,
        boolean locked
) {
}
