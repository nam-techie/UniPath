package com.unipath.fieldofstudy.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.RecordStatus;

@Document(collection = "fields_of_study")
public class FieldOfStudy {

    @Id
    private String id;
    @DBRef
    private FieldOfStudy parent;
    private String name;
    private String description;
    private RecordStatus status;
}
