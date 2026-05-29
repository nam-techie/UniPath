package com.unipath.university.service;

import com.unipath.common.response.PageResponse;
import com.unipath.university.entity.University;
import com.unipath.university.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UniversityService {

    private final UniversityRepository universityRepository;

    public PageResponse<University> getAllUniversities(int page, int size, String regionId, String provinceId) {
        Page<University> pageResult = universityRepository.findWithFilters(regionId, provinceId, PageRequest.of(page, size));
        return PageResponse.<University>builder()
                .content(pageResult.getContent())
                .pageNo(pageResult.getNumber())
                .pageSize(pageResult.getSize())
                .totalElements(pageResult.getTotalElements())
                .totalPages(pageResult.getTotalPages())
                .last(pageResult.isLast())
                .build();
    }
}
