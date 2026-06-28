package com.sudhi.financetracker.finance.model;

import java.util.Map;

import com.sudhi.financetracker.finance.domain.plan.FinancialPlan;

public record UserPreferences(
        String currency,
        double monthlyIncome,
        Map<String, Double> allocation,
        Map<String, MonthlyBudget> categoryBudgets,
        FinancialPlan plan,
        boolean fireEnabled,
        Double fireTargetCorpus
) {}
