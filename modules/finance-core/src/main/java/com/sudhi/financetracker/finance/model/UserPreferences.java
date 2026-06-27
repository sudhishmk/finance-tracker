package com.sudhi.financetracker.finance.model;

import java.util.Map;

public record UserPreferences(
        String currency,
        double monthlyIncome,
        Map<String, Double> allocation,
        Map<String, MonthlyBudget> categoryBudgets,
        boolean fireEnabled,
        Double fireTargetCorpus
) {}
