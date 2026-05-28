package com.unipath.university.controller;

import com.unipath.common.response.ApiResponse;
import com.unipath.university.dto.ProgramResponseDto;
import com.unipath.university.service.ProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/programs")
@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService programService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProgramResponseDto>>> getAllPrograms() {
        List<ProgramResponseDto> programs = programService.getAllPrograms();
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách ngành học thành công", programs));
    }
}
