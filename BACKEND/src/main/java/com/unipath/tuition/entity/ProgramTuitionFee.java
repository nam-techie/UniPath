package com.unipath.tuition.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.CurrencyCode;
import com.unipath.common.enums.FeePeriod;
import com.unipath.common.enums.StudentType;
import com.unipath.program.entity.Program;

import java.math.BigDecimal;
import java.time.LocalDate;

@Document(collection = "program_tuition_fees")
public class ProgramTuitionFee {

    @Id
    private String id;
    @DBRef
    private Program program;
    private BigDecimal amount;
    private CurrencyCode currencyCode;
    private FeePeriod feePeriod;
    private StudentType studentType;
    private String sourceUrl;

    private LocalDate lastCheckedAt;
}
