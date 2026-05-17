package com.unipath.common.response;

public record FieldErrorResponse(
        String field,
        String message
) {
}
