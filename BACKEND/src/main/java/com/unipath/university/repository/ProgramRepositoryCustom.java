package com.unipath.university.repository;

import com.unipath.university.entity.Program;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProgramRepositoryCustom {
    Page<Program> findWithFilters(String regionId, String provinceId, String fieldOfStudy, Double minTuition, Double maxTuition, Pageable pageable);
}
