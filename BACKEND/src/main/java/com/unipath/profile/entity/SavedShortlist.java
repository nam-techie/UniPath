package com.unipath.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "saved_shortlists")
public class SavedShortlist {
    
    @Id
    private String id;
    
    private String studentProfileId; // Reference to StudentProfile
    
    private String programId; // Reference to Program
    
    private LocalDateTime savedAt;
}
