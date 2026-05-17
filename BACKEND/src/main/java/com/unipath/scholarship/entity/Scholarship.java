package com.unipath.scholarship.entity;

import com.unipath.common.enums.CurrencyCode;
import com.unipath.common.enums.DegreeLevel;
import com.unipath.common.enums.RecordStatus;
import com.unipath.common.enums.ScholarshipCoverageType;
import com.unipath.common.enums.ScholarshipProviderType;
import com.unipath.country.entity.Country;
import com.unipath.university.entity.University;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "scholarships")
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 250)
    private String name;

    @Column(nullable = false, length = 200)
    private String providerName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ScholarshipProviderType providerType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id")
    private University university;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private DegreeLevel degreeLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ScholarshipCoverageType coverageType;

    @Column(precision = 14, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private CurrencyCode currencyCode;

    @Column(precision = 4, scale = 2)
    private BigDecimal minimumGpa;

    @Column(precision = 3, scale = 1)
    private BigDecimal minimumIelts;

    private LocalDate deadline;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 500)
    private String sourceUrl;

    private LocalDate lastCheckedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RecordStatus status;
}
