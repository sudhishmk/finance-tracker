package com.sudhi.financetracker.app.api;

import com.sudhi.finance.analytics.ai.model.ChatRequest;
import com.sudhi.finance.analytics.ai.model.ChatResponse;
import com.sudhi.financetracker.app.ai.provider.OpenAICompatibleProvider;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api/v1/ai")

@Produces(MediaType.APPLICATION_JSON)

public class AITestResource {

    @Inject
    OpenAICompatibleProvider provider;
    @GET
    public ChatResponse test() {
        return provider.generate(
                new ChatRequest(
                        "You are helpful.",
                        "Say hello"
                )
        );
    }
}
