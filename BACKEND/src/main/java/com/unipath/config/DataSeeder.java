package com.unipath.config;

import com.unipath.geography.entity.Province;
import com.unipath.geography.entity.Region;
import com.unipath.geography.repository.ProvinceRepository;
import com.unipath.geography.repository.RegionRepository;
import com.unipath.university.entity.University;
import com.unipath.university.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final RegionRepository regionRepository;
    private final ProvinceRepository provinceRepository;
    private final UniversityRepository universityRepository;

    @Override
    public void run(String... args) throws Exception {
        log.info("Checking data seeding...");

        // 1. Seed Regions
        if (regionRepository.count() == 0) {
            log.info("Seeding regions...");
            regionRepository.saveAll(List.of(
                    Region.builder().code("NORTH").name("Miền Bắc").build(),
                    Region.builder().code("CENTER").name("Miền Trung").build(),
                    Region.builder().code("SOUTH").name("Miền Nam").build()
            ));
        }

        // 2. Seed Provinces
        if (provinceRepository.count() == 0) {
            log.info("Seeding provinces...");
            Region north = regionRepository.findByCode("NORTH").orElseThrow();
            Region center = regionRepository.findByCode("CENTER").orElseThrow();
            Region south = regionRepository.findByCode("SOUTH").orElseThrow();

            provinceRepository.saveAll(List.of(
                    Province.builder().code("HN").name("Hà Nội").regionId(north.getId()).build(),
                    Province.builder().code("DN").name("Đà Nẵng").regionId(center.getId()).build(),
                    Province.builder().code("HCM").name("Hồ Chí Minh").regionId(south.getId()).build()
            ));
        }

        // 3. Link existing universities to Hà Nội (since our crawled data is all in HN)
        Province hanoi = provinceRepository.findByCode("HN").orElse(null);
        if (hanoi != null) {
            List<University> unassignedUnis = universityRepository.findAll().stream()
                    .filter(u -> u.getProvinceId() == null)
                    .toList();
            
            if (!unassignedUnis.isEmpty()) {
                log.info("Assigning {} universities to Hà Nội", unassignedUnis.size());
                unassignedUnis.forEach(u -> u.setProvinceId(hanoi.getId()));
                universityRepository.saveAll(unassignedUnis);
            }
        }
    }
}
