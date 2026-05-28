package com.unipath.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.util.List;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "student_profiles")
public class StudentProfile {
    
    @Id
    private String id;
    
    private String userId; // Reference to User
    
    private Double gpaValue;
    
    private String highSchoolTier;
    
    private Double yearlyBudgetAmount;
    
    @Builder.Default
    private List<SubjectScore> subjectScores = new ArrayList<>();
    
    @Builder.Default
    private List<TestScore> testScores = new ArrayList<>();
    
    @Builder.Default
    private List<String> preferredProvinces = new ArrayList<>(); // List of Province IDs
}
