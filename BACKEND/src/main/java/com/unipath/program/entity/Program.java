package com.unipath.program.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.DegreeLevel;
import com.unipath.common.enums.RecordStatus;
import com.unipath.common.enums.StudyMode;
import com.unipath.fieldofstudy.entity.FieldOfStudy;
import com.unipath.university.entity.University;

@Document(collection = "programs")
public class Program {

    @Id
    private String id;
    @DBRef
    private University university;
    @DBRef
    private FieldOfStudy fieldOfStudy;
    private String name;
    private DegreeLevel degreeLevel;
    private StudyMode studyMode;

    private Integer durationMonths;
    private String teachingLanguage;
    private String programUrl;
    private String description;
    private RecordStatus status;
}
