package com.unipath.admin.controller;

import com.unipath.admin.dto.CrawlerUniversityDto;
import com.unipath.admin.service.CrawlerIngestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/crawler")
@RequiredArgsConstructor
public class CrawlerIngestionController {

    private final CrawlerIngestionService ingestionService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCrawledData(@RequestBody List<CrawlerUniversityDto> payload) {
        try {
            ingestionService.ingestUniversities(payload);
            return ResponseEntity.ok("Successfully ingested " + payload.size() + " universities.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error ingesting data: " + e.getMessage());
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearData() {
        ingestionService.clearAllData();
        return ResponseEntity.ok("Cleared all universities and programs.");
    }
}
