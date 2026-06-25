package com.sudhi.financetracker.budget.service;

import com.sudhi.financetracker.budget.model.BudgetStatus;

public class BudgetCalculator {

    public BudgetStatus calculate(
            String account,
            double totalIncome,
            double allocationPercent,
            double actualSpent
    ) {
        double allocated = totalIncome * (allocationPercent / 100.0);
        return new BudgetStatus(account, allocated, actualSpent);
    }
}
