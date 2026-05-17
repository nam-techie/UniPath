package com.unipath.shortlist.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.ShortlistStatus;
import com.unipath.program.entity.Program;
import com.unipath.user.entity.User;

import java.time.LocalDateTime;

@Document(collection = "saved_shortlists")
public class SavedShortlist {

    @Id
    private String id;
    @DBRef
    private User user;
    @DBRef
    private Program program;
    private ShortlistStatus status;
    private String note;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
