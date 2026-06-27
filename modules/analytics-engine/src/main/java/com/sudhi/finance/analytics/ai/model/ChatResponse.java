package com.sudhi.finance.analytics.ai.model;

public record ChatResponse(

    String content,
    String model,
    Integer tokens

) {}
