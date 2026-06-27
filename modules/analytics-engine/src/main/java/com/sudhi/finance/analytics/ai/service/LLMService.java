package com.sudhi.finance.analytics.ai.service;

import com.sudhi.finance.analytics.ai.model.ChatRequest;
import com.sudhi.finance.analytics.ai.model.ChatResponse;
import com.sudhi.finance.analytics.ai.provider.LLMProvider;

public class LLMService {

        private final LLMProvider provider;

        public LLMService(

                        LLMProvider provider) {

                this.provider = provider;
        }

        public ChatResponse ask(ChatRequest request) {
                return provider.generate(request);
        }
}
