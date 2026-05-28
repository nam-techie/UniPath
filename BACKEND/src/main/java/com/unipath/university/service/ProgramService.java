package com.unipath.university.service;

import com.unipath.university.dto.ProgramResponseDto;
import com.unipath.university.entity.Program;
import com.unipath.university.entity.University;
import com.unipath.university.repository.ProgramRepository;
import com.unipath.university.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepository;
    private final UniversityRepository universityRepository;

    public List<ProgramResponseDto> getAllPrograms() {
        List<Program> programs = programRepository.findAll();
        List<University> universities = universityRepository.findAll();

        Map<String, University> universityMap = universities.stream()
                .collect(Collectors.toMap(University::getId, uni -> uni));

        return programs.stream().map(program -> {
            University uni = universityMap.get(program.getUniversityId());
            return ProgramResponseDto.builder()
                    .id(program.getId())
                    .universityId(program.getUniversityId())
                    .universityName(uni != null ? uni.getName() : null)
                    .universityLogo(uni != null ? uni.getLogoUrl() : null)
                    .universityCode(uni != null ? uni.getCode() : null)
                    .fieldOfStudyId(program.getFieldOfStudyId())
                    .name(program.getName())
                    .programType(program.getProgramType())
                    .teachingLanguage(program.getTeachingLanguage())
                    .admissionRequirements(program.getAdmissionRequirements())
                    .tuitionFees(program.getTuitionFees())
                    .build();
        }).collect(Collectors.toList());
    }
}
