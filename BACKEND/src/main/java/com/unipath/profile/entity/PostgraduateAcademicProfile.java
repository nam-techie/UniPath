package com.unipath.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.ResearchProposalStatus;

import java.math.BigDecimal;

@Document(collection = "postgraduate_academic_profiles")
public class PostgraduateAcademicProfile {

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
    private String thesisTitle;
    private String researchInterests;
    private String publications;
    private Integer researchExperienceMonths;
    private ResearchProposalStatus researchProposalStatus;
    private String preferredSupervisorKeywords;
}
