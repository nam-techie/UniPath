package com.unipath.admission.entity;

import com.unipath.program.entity.Program;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "admission_requirements")
public class AdmissionRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id", nullable = false, unique = true)
    private Program program;

    @Column(precision = 4, scale = 2)
    private BigDecimal minimumGpa;

    @Column(precision = 4, scale = 2)
    private BigDecimal gpaScale;

    @Column(precision = 3, scale = 1)
    private BigDecimal minimumIelts;

    private Integer minimumToefl;

    private Integer minimumSat;

    @Column(nullable = false)
    private Boolean portfolioRequired;

    @Column(nullable = false)
    private Boolean interviewRequired;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Column(length = 500)
    private String sourceUrl;

    private LocalDate lastCheckedAt;
}
