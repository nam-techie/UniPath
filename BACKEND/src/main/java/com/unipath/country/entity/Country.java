package com.unipath.country.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.CurrencyCode;
import com.unipath.common.enums.RecordStatus;

@Document(collection = "countries")
public class Country {

    @Id
    private String id;
    private String name;
    private String code;
    private CurrencyCode currencyCode;
    private String studyInfo;
    private String visaDifficulty;
    private RecordStatus status;
}
