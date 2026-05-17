package com.unipath.auth.dto;

public record AuthResponse(
        String accessToken,
        UserSummaryResponse user
) {
}
