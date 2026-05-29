package com.unipath.geography.controller;

import com.unipath.common.response.ApiResponse;
import com.unipath.geography.entity.Province;
import com.unipath.geography.entity.Region;
import com.unipath.geography.repository.ProvinceRepository;
import com.unipath.geography.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/locations")
@RequiredArgsConstructor
public class LocationController {

    private final RegionRepository regionRepository;
    private final ProvinceRepository provinceRepository;

    @GetMapping("/regions")
    public ResponseEntity<ApiResponse<List<Region>>> getRegions() {
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách khu vực thành công", regionRepository.findAll()));
    }

    @GetMapping("/provinces")
    public ResponseEntity<ApiResponse<List<Province>>> getProvinces(@RequestParam(required = false) String regionId) {
        List<Province> provinces;
        if (regionId != null && !regionId.isEmpty()) {
            provinces = provinceRepository.findByRegionId(regionId);
        } else {
            provinces = provinceRepository.findAll();
        }
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách tỉnh thành thành công", provinces));
    }
}
