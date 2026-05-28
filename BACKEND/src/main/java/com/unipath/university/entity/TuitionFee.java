package com.unipath.university.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TuitionFee {
    
    private Double amount;
    
    private String period; // e.g., PER_YEAR, PER_SEMESTER
}
