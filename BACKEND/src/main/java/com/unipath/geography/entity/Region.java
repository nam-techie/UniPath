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
@Document(collection = "regions")
public class Region {
    
    @Id
    private String id;
    
    private String countryId; // Reference to Country
    
    private String code; // e.g., NORTH, SOUTH
    
    private String name; // e.g., Miền Bắc, Miền Nam
}
