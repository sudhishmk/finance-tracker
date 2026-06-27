package com.sudhi.finance.analytics.ai.resolver;

import com.sudhi.finance.analytics.ai.model.ProviderConfig;
import com.sudhi.finance.analytics.ai.provider.GeminiProvider;
import com.sudhi.finance.analytics.ai.provider.LLMProvider;
import com.sudhi.finance.analytics.ai.provider.OllamaProvider;
import com.sudhi.finance.analytics.ai.provider.OpenAIProvider;

public class ProviderResolver {

    public LLMProvider resolve(

            ProviderConfig config

    ) {

        return switch (

        config.provider()

        ) {

            case "openai"

                -> new OpenAIProvider(config);

            case "ollama"

                -> new OllamaProvider(config);

            case "gemini"

                -> new GeminiProvider(config);

            default

                -> throw new IllegalArgumentException();

        };

    }

}
