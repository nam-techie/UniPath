package com.unipath.auth.dto;

public record GoogleTokenPayload(
        String subject,
        String email,
        String fullName,
        boolean emailVerified
) {
}
