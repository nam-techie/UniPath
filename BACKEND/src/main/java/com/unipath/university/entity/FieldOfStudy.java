package com.unipath.university.entity;

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
@Document(collection = "fields_of_study")
public class FieldOfStudy {
    
    @Id
    private String id;
    
    private String name;
    
    private String code; // Mã ngành Bộ GDĐT (7 số)
}
