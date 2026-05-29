package com.unipath.university.repository;

import com.unipath.geography.entity.Province;
import com.unipath.geography.repository.ProvinceRepository;
import com.unipath.university.entity.Program;
import com.unipath.university.entity.University;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class ProgramRepositoryImpl implements ProgramRepositoryCustom {

    private final MongoTemplate mongoTemplate;
    private final ProvinceRepository provinceRepository;
    private final UniversityRepository universityRepository;

    @Override
    public Page<Program> findWithFilters(String regionId, String provinceId, String fieldOfStudy, Double minTuition, Double maxTuition, Pageable pageable) {
        Query query = new Query();

        // Location filter (Region / Province) -> mapped to University
        if ((provinceId != null && !provinceId.isEmpty()) || (regionId != null && !regionId.isEmpty())) {
            List<String> provinceIds;
            if (provinceId != null && !provinceId.isEmpty()) {
                provinceIds = List.of(provinceId);
            } else {
                provinceIds = provinceRepository.findByRegionId(regionId)
                        .stream().map(Province::getId).collect(Collectors.toList());
            }

            if (!provinceIds.isEmpty()) {
                List<String> uniIds = universityRepository.findAll().stream()
                        .filter(u -> provinceIds.contains(u.getProvinceId()))
                        .map(University::getId)
                        .collect(Collectors.toList());
                
                if (!uniIds.isEmpty()) {
                    query.addCriteria(Criteria.where("universityId").in(uniIds));
                } else {
                    return new PageImpl<>(List.of(), pageable, 0);
                }
            } else {
                return new PageImpl<>(List.of(), pageable, 0);
            }
        }

        // Field of study (using regex on name since MVP lacks actual FieldOfStudy mapping)
        if (fieldOfStudy != null && !fieldOfStudy.isEmpty() && !fieldOfStudy.equalsIgnoreCase("all")) {
            // Very naive mapping for MVP frontend dropdown
            String searchStr = fieldOfStudy;
            if (fieldOfStudy.equalsIgnoreCase("Computer Science")) searchStr = "Công nghệ thông tin|Máy tính|Phần mềm";
            else if (fieldOfStudy.equalsIgnoreCase("Business Administration")) searchStr = "Kinh doanh|Quản trị|Thương mại";
            else if (fieldOfStudy.equalsIgnoreCase("Engineering")) searchStr = "Kỹ thuật|Cơ khí|Điện tử";
            else if (fieldOfStudy.equalsIgnoreCase("Medicine")) searchStr = "Y|Dược|Điều dưỡng";

            query.addCriteria(Criteria.where("name").regex(searchStr, "i"));
        }

        // Tuition Budget
        if (minTuition != null || maxTuition != null) {
            Criteria tuitionCriteria = Criteria.where("amount");
            if (minTuition != null) tuitionCriteria.gte(minTuition);
            if (maxTuition != null) tuitionCriteria.lte(maxTuition);
            query.addCriteria(Criteria.where("tuitionFees").elemMatch(tuitionCriteria));
        }

        long total = mongoTemplate.count(query, Program.class);
        query.with(pageable);
        List<Program> programs = mongoTemplate.find(query, Program.class);

        return new PageImpl<>(programs, pageable, total);
    }
}
