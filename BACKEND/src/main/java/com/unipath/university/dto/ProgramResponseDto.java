package com.unipath.university.dto;

import com.unipath.university.entity.AdmissionRequirement;
import com.unipath.university.entity.TuitionFee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgramResponseDto {
    private String id;
    private String universityId;
    private String universityName;
    private String universityLogo;
    private String universityCode;
    private String fieldOfStudyId;
    private String name;
    private String programType;
    private String teachingLanguage;
    private List<AdmissionRequirement> admissionRequirements;
    private List<TuitionFee> tuitionFees;
}
