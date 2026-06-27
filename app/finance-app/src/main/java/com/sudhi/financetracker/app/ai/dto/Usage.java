package com.sudhi.financetracker.app.ai.dto;

public record Usage(

        Integer prompt_tokens,
        Integer completion_tokens,
        Integer total_tokens

) {
}
