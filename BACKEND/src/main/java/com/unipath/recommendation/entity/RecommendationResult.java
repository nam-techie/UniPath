package com.unipath.recommendation.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.profile.entity.StudentProfile;

import java.time.LocalDateTime;

@Document(collection = "recommendation_results")
public class RecommendationResult {

    @Id
    private String id;
    @DBRef
    private StudentProfile studentProfile;
    private LocalDateTime generatedAt;
    private Integer totalProgramsConsidered;
    private String note;
}
