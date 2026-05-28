package com.unipath.geography.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "countries")
public class Country {
    
    @Id
    private String id;
    
    private String code; // e.g., VN, US
    
    private String name; // e.g., Việt Nam
}
