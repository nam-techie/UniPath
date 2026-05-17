package com.unipath.program.entity;

import com.unipath.common.enums.DegreeLevel;
import com.unipath.common.enums.RecordStatus;
import com.unipath.common.enums.StudyMode;
import com.unipath.fieldofstudy.entity.FieldOfStudy;
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

@Entity
@Table(name = "programs")
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id", nullable = false)
    private University university;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_of_study_id", nullable = false)
    private FieldOfStudy fieldOfStudy;

    @Column(nullable = false, length = 250)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private DegreeLevel degreeLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private StudyMode studyMode;

    private Integer durationMonths;

    @Column(length = 80)
    private String teachingLanguage;

    @Column(length = 500)
    private String programUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RecordStatus status;
}
