package com.unipath.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.TestType;

import java.math.BigDecimal;
import java.time.LocalDate;

@Document(collection = "student_test_scores")
public class StudentTestScore {

    @Id
    private String id;
    @DBRef
    private StudentProfile studentProfile;
    private TestType testType;
    private BigDecimal scoreValue;
    private BigDecimal maxScore;

    private LocalDate testDate;
}
