package com.sudhi.finance.analytics.ai.provider;

import com.sudhi.finance.analytics.ai.model.ChatRequest;
import com.sudhi.finance.analytics.ai.model.ChatResponse;

public interface LLMProvider {

    ChatResponse generate(
            ChatRequest request
    );
}
