package com.unipath.admin.dto;

import com.unipath.university.entity.AdmissionRequirement;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrawlerProgramDto {
    private String name;
    private List<AdmissionRequirement> admissionRequirements;
}
