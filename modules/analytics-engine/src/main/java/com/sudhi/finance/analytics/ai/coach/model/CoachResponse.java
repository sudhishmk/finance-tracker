package com.sudhi.finance.analytics.ai.coach.model;

import java.util.List;

public record CoachResponse(

        List<String> wins,
        List<String> risks,
        List<String> opportunities,
        List<String> actions

) {
}
