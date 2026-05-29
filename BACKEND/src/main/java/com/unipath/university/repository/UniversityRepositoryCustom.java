package com.unipath.university.repository;

import com.unipath.university.entity.University;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UniversityRepositoryCustom {
    Page<University> findWithFilters(String regionId, String provinceId, Pageable pageable);
}
