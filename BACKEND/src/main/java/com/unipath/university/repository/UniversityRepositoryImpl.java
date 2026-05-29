package com.unipath.university.repository;

import com.unipath.geography.entity.Province;
import com.unipath.geography.repository.ProvinceRepository;
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
public class UniversityRepositoryImpl implements UniversityRepositoryCustom {

    private final MongoTemplate mongoTemplate;
    private final ProvinceRepository provinceRepository;

    @Override
    public Page<University> findWithFilters(String regionId, String provinceId, Pageable pageable) {
        Query query = new Query();

        if (provinceId != null && !provinceId.isEmpty()) {
            query.addCriteria(Criteria.where("provinceId").is(provinceId));
        } else if (regionId != null && !regionId.isEmpty()) {
            List<String> provinceIds = provinceRepository.findByRegionId(regionId)
                    .stream().map(Province::getId).collect(Collectors.toList());
            if (!provinceIds.isEmpty()) {
                query.addCriteria(Criteria.where("provinceId").in(provinceIds));
            } else {
                // If no provinces in region, return empty
                return new PageImpl<>(List.of(), pageable, 0);
            }
        }

        long total = mongoTemplate.count(query, University.class);
        query.with(pageable);
        List<University> universities = mongoTemplate.find(query, University.class);

        return new PageImpl<>(universities, pageable, total);
    }
}
