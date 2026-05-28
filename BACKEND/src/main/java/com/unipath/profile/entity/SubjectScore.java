package com.unipath.profile.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectScore {
    
    private String subject; // e.g., Toán, Lý, Hóa
    
    private Double score;
}
