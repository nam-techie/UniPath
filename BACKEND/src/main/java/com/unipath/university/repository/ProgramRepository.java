package com.unipath.university.repository;

import com.unipath.university.entity.Program;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends MongoRepository<Program, String> {
    List<Program> findByUniversityId(String universityId);
    List<Program> findByFieldOfStudyId(String fieldOfStudyId);
}
