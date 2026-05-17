package com.unipath.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.CurrencyCode;
import com.unipath.common.enums.CurrentEducationStage;
import com.unipath.common.enums.DegreeLevel;
import com.unipath.common.enums.ProgramTrack;
import com.unipath.common.enums.ResearchProposalStatus;
import com.unipath.user.entity.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "student_profiles")
public class StudentProfile {

    @Id
    private String id;
    @DBRef
    private User user;
    private CurrentEducationStage currentEducationStage;
    private BigDecimal gpaValue;
    private BigDecimal gpaScale;
    private BigDecimal normalizedGpa;

    private Integer graduationYear;
    private DegreeLevel highestCompletedDegreeLevel;
    private DegreeLevel targetDegreeLevel;
    private ProgramTrack targetProgramTrack;
    private BigDecimal yearlyBudgetAmount;
    private CurrencyCode budgetCurrency;
    private Boolean scholarshipNeed;
    private String careerGoal;
    private Integer workExperienceMonths;
    private String portfolioUrl;
    private String researchInterests;
    private ResearchProposalStatus researchProposalStatus;
    private Boolean fundingNeed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
