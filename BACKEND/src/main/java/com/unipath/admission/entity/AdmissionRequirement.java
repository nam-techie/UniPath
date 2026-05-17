package com.unipath.admission.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.DegreeLevel;
import com.unipath.program.entity.Program;

import java.math.BigDecimal;
import java.time.LocalDate;

@Document(collection = "admission_requirements")
public class AdmissionRequirement {

    @Id
    private String id;
    @DBRef
    private Program program;
    private BigDecimal minimumGpa;
    private BigDecimal gpaScale;
    private BigDecimal minimumIelts;

    private Integer minimumToefl;

    private Integer minimumSat;
    private Integer minimumGre;
    private Integer minimumGmat;
    private DegreeLevel requiredPreviousDegreeLevel;
    private Boolean requiredPreviousFieldRelated;
    private Integer minimumWorkExperienceMonths;
    private Boolean portfolioRequired;
    private Boolean interviewRequired;
    private Boolean researchProposalRequired;
    private Boolean supervisorAcceptanceRequired;
    private Integer referenceLetterCount;
    private Boolean fundingProofRequired;
    private String note;
    private String sourceUrl;

    private LocalDate lastCheckedAt;
}
