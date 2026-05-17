package com.unipath.recommendation.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.CurrencyCode;
import com.unipath.common.enums.MatchCategory;
import com.unipath.program.entity.Program;

import java.math.BigDecimal;

@Document(collection = "recommendation_details")
public class RecommendationDetail {

    @Id
    private String id;
    @DBRef
    private RecommendationResult recommendationResult;
    @DBRef
    private Program program;
    private BigDecimal matchScore;
    private MatchCategory matchCategory;
    private BigDecimal estimatedYearlyCost;
    private CurrencyCode costCurrency;
    private String explanation;
}
