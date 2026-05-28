package com.unipath.admin.service;

import com.unipath.admin.dto.CrawlerUniversityDto;
import com.unipath.admin.dto.CrawlerProgramDto;
import com.unipath.university.entity.University;
import com.unipath.university.entity.Program;
import com.unipath.university.repository.UniversityRepository;
import com.unipath.university.repository.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrawlerIngestionService {

    private final UniversityRepository universityRepository;
    private final ProgramRepository programRepository;

    public void ingestUniversities(List<CrawlerUniversityDto> payload) {
        for (CrawlerUniversityDto dto : payload) {
            // Find or create University
            University university = universityRepository.findByCode(dto.getCode())
                    .orElseGet(() -> {
                        University newUni = new University();
                        newUni.setCode(dto.getCode());
                        return newUni;
                    });
            
            university.setName(dto.getName());
            university.setWebsiteUrl(dto.getWebsiteUrl());
            
            university = universityRepository.save(university);
            
            // Save Programs
            for (CrawlerProgramDto progDto : dto.getPrograms()) {
                Program program = new Program();
                program.setUniversityId(university.getId());
                program.setName(progDto.getName());
                program.setAdmissionRequirements(progDto.getAdmissionRequirements());
                
                programRepository.save(program);
            }
        }
    }
}
