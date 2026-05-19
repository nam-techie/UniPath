package com.unipath.user.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.AuthProvider;
import com.unipath.common.enums.UserRole;
import com.unipath.common.enums.UserStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Document(collection = "users")
@Getter
@Setter
public class User {

    @Id
    private String id;
    private String email;
    private String passwordHash;
    private String fullName;
    private UserRole role;
    private UserStatus status;
    private AuthProvider authProvider;
    private String googleSubject;
    private Boolean emailVerified;
    private Integer verificationResendCount;
    private LocalDateTime verificationResendAvailableAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
