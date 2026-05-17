package com.unipath.tuition.entity;

import com.unipath.common.enums.CurrencyCode;
import com.unipath.common.enums.FeePeriod;
import com.unipath.common.enums.StudentType;
import com.unipath.program.entity.Program;
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
@Table(name = "program_tuition_fees")
public class ProgramTuitionFee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id", nullable = false)
    private Program program;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private CurrencyCode currencyCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private FeePeriod feePeriod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private StudentType studentType;

    @Column(length = 500)
    private String sourceUrl;

    private LocalDate lastCheckedAt;
}
