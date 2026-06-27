package com.sudhi.finance.analytics.ai.provider;

import com.sudhi.finance.analytics.ai.model.ChatRequest;
import com.sudhi.finance.analytics.ai.model.ChatResponse;
import com.sudhi.finance.analytics.ai.model.ProviderConfig;

public class GeminiProvider implements LLMProvider {

        private final ProviderConfig config;

        public GeminiProvider(ProviderConfig config) {
                this.config = config;
        }

        @Override
        public ChatResponse generate(
                        ChatRequest request
        ) {
                return new ChatResponse(
                                "OpenAI Stub",
                                config.model(),
                                0
                );
        }
}
