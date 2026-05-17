package com.unipath.profile.entity;

import com.unipath.common.enums.CurrencyCode;
import com.unipath.common.enums.DegreeLevel;
import com.unipath.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, precision = 4, scale = 2)
    private BigDecimal gpaValue;

    @Column(nullable = false, precision = 4, scale = 2)
    private BigDecimal gpaScale;

    @Column(nullable = false, precision = 4, scale = 2)
    private BigDecimal normalizedGpa;

    private Integer graduationYear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private DegreeLevel targetDegreeLevel;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal yearlyBudgetAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private CurrencyCode budgetCurrency;

    @Column(nullable = false)
    private Boolean scholarshipNeed;

    @Column(columnDefinition = "TEXT")
    private String careerGoal;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
