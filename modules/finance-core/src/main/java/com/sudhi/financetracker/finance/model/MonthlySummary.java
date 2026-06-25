package com.sudhi.financetracker.finance.model;

public record MonthlySummary(
        double totalIncome,
        double totalExpenses,
        double savings,
        double savingsRate,
        double highValueSpend,
        double lowValueSpend,
        String topSpendingCategory
) {}
