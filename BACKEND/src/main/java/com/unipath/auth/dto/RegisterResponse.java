package com.unipath.auth.dto;

public record RegisterResponse(
        String email,
        boolean requiresEmailVerification
) {
}
