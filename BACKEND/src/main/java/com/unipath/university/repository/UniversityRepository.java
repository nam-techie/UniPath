package com.unipath.university.repository;

import com.unipath.university.entity.University;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UniversityRepository extends MongoRepository<University, String>, UniversityRepositoryCustom {
    Optional<University> findByCode(String code);
    List<University> findByProvinceId(String provinceId);
}
