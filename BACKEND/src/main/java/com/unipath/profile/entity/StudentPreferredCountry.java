package com.unipath.profile.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.country.entity.Country;

@Document(collection = "student_preferred_countries")
public class StudentPreferredCountry {

    @Id
    private String id;
    @DBRef
    private StudentProfile studentProfile;
    @DBRef
    private Country country;
}
