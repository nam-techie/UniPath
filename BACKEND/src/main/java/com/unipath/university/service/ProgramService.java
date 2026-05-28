package com.unipath.university.service;

import com.unipath.common.response.PageResponse;
import com.unipath.university.dto.ProgramResponseDto;
import com.unipath.university.entity.Program;
import com.unipath.university.entity.University;
import com.unipath.university.repository.ProgramRepository;
import com.unipath.university.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepository;
    private final UniversityRepository universityRepository;

    public PageResponse<ProgramResponseDto> getAllPrograms(int page, int size) {
        Page<Program> pageResult = programRepository.findAll(PageRequest.of(page, size));
        return mapToPageResponse(pageResult);
    }

    public PageResponse<ProgramResponseDto> getRecommendedPrograms(String block, Double score, int page, int size) {
        Page<Program> pageResult = programRepository.findRecommendedPrograms(block, score, PageRequest.of(page, size));
        return mapToPageResponse(pageResult);
    }

    private PageResponse<ProgramResponseDto> mapToPageResponse(Page<Program> pageResult) {
        List<University> universities = universityRepository.findAll();

        Map<String, University> universityMap = universities.stream()
                .collect(Collectors.toMap(University::getId, uni -> uni));

        List<ProgramResponseDto> content = pageResult.getContent().stream().map(program -> {
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

        return PageResponse.<ProgramResponseDto>builder()
                .content(content)
                .pageNo(pageResult.getNumber())
                .pageSize(pageResult.getSize())
                .totalElements(pageResult.getTotalElements())
                .totalPages(pageResult.getTotalPages())
                .last(pageResult.isLast())
                .build();
    }
}
