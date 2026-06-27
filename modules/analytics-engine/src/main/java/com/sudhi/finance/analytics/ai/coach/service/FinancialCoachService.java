package com.sudhi.finance.analytics.ai.coach.service;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.sudhi.finance.analytics.ai.coach.model.CoachRequest;
import com.sudhi.finance.analytics.ai.coach.model.CoachResponse;

import com.sudhi.finance.analytics.ai.model.ChatRequest;
import com.sudhi.finance.analytics.ai.model.ChatResponse;

import com.sudhi.finance.analytics.ai.prompt.CoachPromptBuilder;

import com.sudhi.finance.analytics.ai.service.LLMService;

public class FinancialCoachService {

    private final LLMService llmService;

    private final ObjectMapper mapper;

    private final CoachPromptBuilder builder;

    public FinancialCoachService(LLMService llmService) {

        this.llmService = llmService;
        this.mapper =  new ObjectMapper();
        this.builder = new CoachPromptBuilder();

    }

    public CoachResponse review(CoachRequest request) throws Exception {

        String prompt =builder.build(request);

        ChatResponse response = llmService.ask(new ChatRequest(
            """
            You are an expert financial coach.

            Respond ONLY in JSON.

            Never return markdown.

            Never return explanations outside JSON.

            
            """,
            prompt));

        return mapper.readValue(response.content(),CoachResponse.class);

    }

}