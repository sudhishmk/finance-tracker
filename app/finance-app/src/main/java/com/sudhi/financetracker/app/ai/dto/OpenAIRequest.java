package com.sudhi.financetracker.app.ai.dto;

import java.util.List;

public record OpenAIRequest(

        String model,
        List<Message> messages,
        Double temperature,
        Integer max_tokens

) {
}
