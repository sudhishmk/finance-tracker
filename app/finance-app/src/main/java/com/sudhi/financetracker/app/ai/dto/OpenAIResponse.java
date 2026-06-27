package com.sudhi.financetracker.app.ai.dto;

import java.util.List;

public record OpenAIResponse(

        List<Choice> choices,
        Usage usage

) {
}
