package com.sudhi.finance.analytics.ai.prompt;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class PromptLoader {
    public String load(String name) {
        String path = "/prompts/%s.txt".formatted(name);
        try (
                InputStream input = getClass().getResourceAsStream(path)) {

            if (input == null) {
                throw new RuntimeException("Prompt not found: " + path);
            }

            return new String(input.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

    public String coachTemplate() {

        return load("monthly-review");
    }
}
