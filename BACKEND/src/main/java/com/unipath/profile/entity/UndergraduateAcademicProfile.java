package com.unipath.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document(collection = "undergraduate_academic_profiles")
public class UndergraduateAcademicProfile {

    @Id
    private String id;
    @DBRef
    private StudentProfile studentProfile;
    private String institutionName;
    private String majorName;
    private String degreeName;
    private BigDecimal gpaValue;
    private BigDecimal gpaScale;
    private BigDecimal normalizedGpa;
    private Integer graduationYear;
    private Integer workExperienceMonths;
    private String portfolioUrl;
    private String prerequisiteSummary;
}
