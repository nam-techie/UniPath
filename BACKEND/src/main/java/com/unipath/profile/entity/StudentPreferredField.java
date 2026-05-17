package com.unipath.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.fieldofstudy.entity.FieldOfStudy;

@Document(collection = "student_preferred_fields")
public class StudentPreferredField {

    @Id
    private String id;
    @DBRef
    private StudentProfile studentProfile;
    @DBRef
    private FieldOfStudy fieldOfStudy;
}
