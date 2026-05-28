package com.unipath.university.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdmissionRequirement {
    
    private String method; // e.g., THPT_EXAM, IELTS
    
    private List<String> blocks; // e.g., ["A00", "A01"]
    
    private Double minScore;
    
    private Integer year;
    
    private Double minIelts;
}
