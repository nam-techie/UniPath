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
@Document(collection = "provinces")
public class Province {
    
    @Id
    private String id;
    
    private String regionId; // Reference to Region
    
    private String code; // e.g., HN, SG
    
    private String name; // e.g., Hà Nội, TP.HCM
}
