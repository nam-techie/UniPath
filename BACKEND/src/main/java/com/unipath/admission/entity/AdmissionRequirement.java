package com.unipath.admission.entity;

import com.unipath.program.entity.Program;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

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

    private Boolean portfolioRequired;

    private Boolean interviewRequired;

    private String note;

    private String sourceUrl;

    private LocalDate lastCheckedAt;
}
