package com.unipath.university.entity;

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
@Document(collection = "programs")
public class Program {
    
    @Id
    private String id;
    
    private String universityId; // Reference to University
    
    private String fieldOfStudyId; // Reference to FieldOfStudy
    
    private String name;
    
    private String programType; // e.g., Đại trà, CLC
    
    private String teachingLanguage;
    
    @Builder.Default
    private List<AdmissionRequirement> admissionRequirements = new ArrayList<>();
    
    @Builder.Default
    private List<TuitionFee> tuitionFees = new ArrayList<>();
}
