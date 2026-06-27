package com.sudhi.financetracker.app.ai.provider;

import java.util.List;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sudhi.finance.analytics.ai.model.ChatRequest;
import com.sudhi.finance.analytics.ai.model.ChatResponse;
import com.sudhi.finance.analytics.ai.provider.LLMProvider;
import com.sudhi.financetracker.app.ai.client.OpenAIClient;
import com.sudhi.financetracker.app.ai.dto.Message;
import com.sudhi.financetracker.app.ai.dto.OpenAIRequest;
import com.sudhi.financetracker.app.ai.dto.OpenAIResponse;
import com.sudhi.financetracker.app.config.AIProperties;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class OpenAICompatibleProvider implements LLMProvider {

    @Inject
    AIProperties properties;

    @Inject
    @RestClient
    OpenAIClient client;

    private static final Logger LOG = LoggerFactory.getLogger(OpenAICompatibleProvider.class);

    public ChatResponse generate(ChatRequest request) {
        List<Message> messages = List.of(
                new Message(
                        "system",
                        request.systemPrompt()),
                new Message(
                        "user",
                        request.userPrompt()));

        OpenAIRequest payload = new OpenAIRequest(properties.model(), messages, properties.temperature(),
                properties.maxTokens());

        String auth = properties.apiKey().isBlank() ? "" : "Bearer " + properties.apiKey();

        LOG.info("Calling provider={} model={}", properties.provider(), properties.model());
        try {
            OpenAIResponse response = client.generate(payload, auth);

            String content = response.choices().get(0).message().content();
            LOG.info("LLM response received. Tokens={}", response.usage().total_tokens());

            return new ChatResponse(content, properties.model(), response.usage().total_tokens());
        } catch (Exception e) {
            LOG.error("Error calling provider={} model={}", properties.provider(), properties.model(), e);
            return new ChatResponse("Error calling provider: " + e.getMessage(), properties.model(), 0);

        }

    }
}