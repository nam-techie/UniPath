package com.unipath.geography.repository;

import com.unipath.geography.entity.Country;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CountryRepository extends MongoRepository<Country, String> {
    Optional<Country> findByCode(String code);
}
