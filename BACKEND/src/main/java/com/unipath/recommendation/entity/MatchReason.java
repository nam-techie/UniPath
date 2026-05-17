package com.unipath.recommendation.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.unipath.common.enums.MatchReasonType;

import java.math.BigDecimal;

@Document(collection = "match_reasons")
public class MatchReason {

    @Id
    private String id;
    @DBRef
    private RecommendationDetail recommendationDetail;
    private MatchReasonType reasonType;
    private BigDecimal score;
    private String message;
}
