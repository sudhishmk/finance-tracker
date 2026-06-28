package com.sudhi.financetracker.finance.domain.budget;

import com.sudhi.financetracker.finance.domain.category.BudgetCategory;

public class CategoryCalculator {

    public double calculate(double allocationBudget, BudgetCategory category) {

        return allocationBudget * category.percentage() / 100.0;

    }

}