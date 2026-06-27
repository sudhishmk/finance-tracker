package com.sudhi.financetracker.budget.model;

import java.util.List;

public record BudgetStatusResponse(

        double totalBudget,

        double totalSpent,

        double remaining,

        double utilization,

        List<CategoryBudget> categories

) {}
