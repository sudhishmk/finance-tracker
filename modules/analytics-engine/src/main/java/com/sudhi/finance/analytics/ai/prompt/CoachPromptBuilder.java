package com.sudhi.finance.analytics.ai.prompt;

import java.util.StringJoiner;

import com.sudhi.finance.analytics.ai.coach.model.CoachRequest;
import com.sudhi.finance.analytics.ai.coach.model.FinancialSnapshot;

public class CoachPromptBuilder {

    private final PromptLoader loader;

    public CoachPromptBuilder() {
        this.loader = new PromptLoader();
    }
    public String build(CoachRequest request) {

        FinancialSnapshot snapshot =  request.snapshot();

        StringJoiner joiner = new StringJoiner("\n");

        snapshot.insights().forEach(joiner::add);

        String template = loader.coachTemplate();

        return template
                    .replace("{{income}}",String.valueOf(snapshot.totalIncome()))
                    .replace("{{expenses}}",String.valueOf(snapshot.totalExpenses()))
                    .replace("{{savingsRate}}",String.valueOf(snapshot.savingsRate()))
                    .replace("{{topCategory}}",String.valueOf(snapshot.topCategory()))
                    .replace("{{budgetUtilization}}",String.valueOf(snapshot.budgetUtilization()))
                    .replace("{{fireCorpus}}",String.valueOf(snapshot.fireTargetCorpus()))
                    .replace("{{insights}}",String.valueOf(snapshot.insights()));

        // return """
        //         You are a experienced personal finance coach with 40 + years of experience.
        //         Analyze the user's financial profile.
        //         Monthly Income:
        //         %s
        //         Savings Rate:
        //         %s%%
        //         Expense Ratio:
        //         %s%%
        //         Projected FIRE Age:
        //         %s
        //         Insights:
        //         %s
        //         Respond ONLY as JSON.
        //         Schema:
        //         {
        //         "wins":[],
        //         "risks":[],
        //         "opportunities":[],
        //         "actions":[]
        //         }
        //         Do not invent values.
        //         Maximum 150 words.
        //         """
        //         .formatted(
        //                 request.monthlyIncome(),
        //                 request.savingsRate(),
        //                 request.expenseRatio(),
        //                 request.fireAge(),
        //                 joiner
        //         );
    }
}
