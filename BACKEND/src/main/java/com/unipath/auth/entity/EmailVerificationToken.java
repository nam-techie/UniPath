package com.unipath.auth.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Document(collection = "email_verification_tokens")
@Getter
@Setter
public class EmailVerificationToken {

    @Id
    private String id;
    @DBRef
    private User user;
    private String tokenHash;
    private LocalDateTime expiresAt;
    private Boolean used;
    private LocalDateTime createdAt;

    private LocalDateTime usedAt;
}
