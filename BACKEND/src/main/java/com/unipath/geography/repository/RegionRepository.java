package com.unipath.geography.repository;

import com.unipath.geography.entity.Region;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegionRepository extends MongoRepository<Region, String> {
    Optional<Region> findByCode(String code);
    List<Region> findByCountryId(String countryId);
}
