package com.unipath.university.repository;

import com.unipath.university.entity.Program;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends MongoRepository<Program, String>, ProgramRepositoryCustom {
    List<Program> findByUniversityId(String universityId);
    void deleteByUniversityId(String universityId);
    List<Program> findByFieldOfStudyId(String fieldOfStudyId);

    @Query("{'admissionRequirements': {$elemMatch: {'method': 'THPT_EXAM', 'blocks': ?0, 'minScore': {$lte: ?1}}}}")
    Page<Program> findRecommendedPrograms(String block, Double score, Pageable pageable);
}
