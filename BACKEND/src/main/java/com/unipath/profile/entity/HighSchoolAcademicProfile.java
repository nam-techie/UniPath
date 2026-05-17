package com.unipath.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document(collection = "high_school_academic_profiles")
public class HighSchoolAcademicProfile {

    @Id
    private String id;
    @DBRef
    private StudentProfile studentProfile;
    private String schoolName;
    private String curriculumType;
    private BigDecimal highSchoolGpa;
    private BigDecimal highSchoolGpaScale;
    private BigDecimal normalizedHighSchoolGpa;
    private Integer predictedGraduationYear;
    private BigDecimal nationalExamScore;
    private String academicAwards;
}
