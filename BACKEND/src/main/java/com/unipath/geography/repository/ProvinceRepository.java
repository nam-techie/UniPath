package com.unipath.geography.repository;

import com.unipath.geography.entity.Province;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProvinceRepository extends MongoRepository<Province, String> {
    Optional<Province> findByCode(String code);
    List<Province> findByRegionId(String regionId);
}
