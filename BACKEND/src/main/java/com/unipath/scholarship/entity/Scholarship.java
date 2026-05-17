package com.unipath.scholarship.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.CurrencyCode;
import com.unipath.common.enums.DegreeLevel;
import com.unipath.common.enums.RecordStatus;
import com.unipath.common.enums.ScholarshipCoverageType;
import com.unipath.common.enums.ScholarshipProviderType;
import com.unipath.country.entity.Country;
import com.unipath.university.entity.University;

import java.math.BigDecimal;
import java.time.LocalDate;

@Document(collection = "scholarships")
public class Scholarship {

    @Id
    private String id;
    private String name;
    private String providerName;
    private ScholarshipProviderType providerType;
    @DBRef
    private Country country;
    @DBRef
    private University university;
    private DegreeLevel degreeLevel;
    private ScholarshipCoverageType coverageType;
    private BigDecimal amount;
    private CurrencyCode currencyCode;
    private BigDecimal minimumGpa;
    private BigDecimal minimumIelts;

    private LocalDate deadline;
    private String description;
    private String sourceUrl;

    private LocalDate lastCheckedAt;
    private RecordStatus status;
}
