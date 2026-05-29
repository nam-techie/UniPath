package com.unipath.university.controller;

import com.unipath.common.response.ApiResponse;
import com.unipath.common.response.PageResponse;
import com.unipath.university.dto.ProgramResponseDto;
import com.unipath.university.service.ProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/programs")
@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService programService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ProgramResponseDto>>> getAllPrograms(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String regionId,
            @RequestParam(required = false) String provinceId,
            @RequestParam(required = false) String fieldOfStudy,
            @RequestParam(required = false) Double minTuition,
            @RequestParam(required = false) Double maxTuition
    ) {
        PageResponse<ProgramResponseDto> response = programService.getAllPrograms(page, size, regionId, provinceId, fieldOfStudy, minTuition, maxTuition);
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách ngành học thành công", response));
    }

    @GetMapping("/recommend")
    public ResponseEntity<ApiResponse<PageResponse<ProgramResponseDto>>> getRecommendedPrograms(
            @RequestParam String block,
            @RequestParam Double score,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        PageResponse<ProgramResponseDto> programs = programService.getRecommendedPrograms(block, score, page, size);
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách ngành học gợi ý thành công", programs));
    }
}
