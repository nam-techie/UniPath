package com.unipath.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.CurrencyCode;
import com.unipath.common.enums.DegreeLevel;
import com.unipath.user.entity.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "student_profiles")
public class StudentProfile {

    @Id
    private String id;
    @DBRef
    private User user;
    private BigDecimal gpaValue;
    private BigDecimal gpaScale;
    private BigDecimal normalizedGpa;

    private Integer graduationYear;
    private DegreeLevel targetDegreeLevel;
    private BigDecimal yearlyBudgetAmount;
    private CurrencyCode budgetCurrency;
    private Boolean scholarshipNeed;
    private String careerGoal;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
