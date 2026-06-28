package com.sudhi.financetracker.app.service;

import java.util.List;

import com.sudhi.financetracker.budget.model.BudgetStatusResponse;
import com.sudhi.financetracker.finance.domain.budget.BudgetSnapshot;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.UserPreferences;

public class BudgetFacade {

    private final BudgetService legacyService = new BudgetService();

    private final BudgetServiceV2 budgetServiceV2 = new BudgetServiceV2();

    public BudgetStatusResponse calculate(UserPreferences preferences, double income, List<Expense> expenses

    ) {

        if (preferences.plan() != null) {

            return adapt(budgetServiceV2.calculate(preferences, income, expenses));

        }

        return legacyService.calculate(preferences, expenses, income);

    }

    private BudgetStatusResponse adapt(BudgetSnapshot snapshot) {

        return new BudgetStatusResponse(snapshot.spendingPool(), 0, 0, 0, List.of());

    }

}