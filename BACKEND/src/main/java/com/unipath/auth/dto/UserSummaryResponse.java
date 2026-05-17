package com.unipath.auth.dto;

import com.unipath.common.enums.AuthProvider;
import com.unipath.common.enums.UserRole;

public record UserSummaryResponse(
        String id,
        String email,
        String fullName,
        UserRole role,
        AuthProvider authProvider,
        Boolean emailVerified
) {
}
