package com.unipath.university.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.InstitutionType;
import com.unipath.common.enums.RecordStatus;
import com.unipath.country.entity.Country;

@Document(collection = "universities")
public class University {

    @Id
    private String id;
    @DBRef
    private Country country;
    private String name;
    private String city;
    private String websiteUrl;
    private InstitutionType institutionType;

    private Integer ranking;
    private String description;
    private RecordStatus status;
}
