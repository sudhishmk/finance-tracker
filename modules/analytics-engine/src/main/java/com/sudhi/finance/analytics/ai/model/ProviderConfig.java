package com.sudhi.finance.analytics.ai.model;

public record ProviderConfig(
    
    String provider,
    String model,
    String apiKey,
    String baseUrl,
    double temperature,
    int maxTokens
) {

}
