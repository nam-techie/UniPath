package com.unipath.admin.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrawlerUniversityDto {
    private String name;
    private String code;
    private String websiteUrl;
    private List<CrawlerProgramDto> programs;
}
