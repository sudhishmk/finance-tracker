package com.sudhi.finance.analytics.ai.coach.model;

import java.util.List;

public record FinancialSnapshot(

        double totalIncome,

        double totalExpenses,

        double savings,

        double savingsRate,

        String topCategory,

        double budgetUtilization,

        Double fireTargetCorpus,

        List<String> insights

) {

}