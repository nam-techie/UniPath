package com.unipath.profile.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestScore {
    
    private String type; // e.g., IELTS, DGNL_HCM
    
    private Double score;
}
