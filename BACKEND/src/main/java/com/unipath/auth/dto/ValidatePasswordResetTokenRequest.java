package com.unipath.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record ValidatePasswordResetTokenRequest(
        @NotBlank(message = "Reset token is required.")
        String token
) {
}
