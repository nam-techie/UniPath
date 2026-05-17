package com.unipath.country.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.CurrencyCode;

import java.math.BigDecimal;
import java.time.LocalDate;

@Document(collection = "living_costs")
public class LivingCost {

    @Id
    private String id;
    @DBRef
    private Country country;
    private String cityName;
    private BigDecimal minAmountPerYear;
    private BigDecimal maxAmountPerYear;
    private CurrencyCode currencyCode;
    private String sourceUrl;

    private LocalDate lastCheckedAt;
}
