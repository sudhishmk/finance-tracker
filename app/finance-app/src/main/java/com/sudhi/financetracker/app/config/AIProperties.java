package com.sudhi.financetracker.app.config;

import io.smallrye.config.ConfigMapping;

@ConfigMapping(prefix = "finance.ai")
public interface AIProperties {

    String provider();
    String model();
    String baseUrl();
    String apiKey();
    Double temperature();
    Integer maxTokens();

}