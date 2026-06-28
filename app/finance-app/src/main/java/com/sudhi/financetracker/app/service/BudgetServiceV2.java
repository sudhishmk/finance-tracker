package com.sudhi.financetracker.app.service;

import java.util.List;

import com.sudhi.financetracker.finance.domain.budget.BudgetEngineV2;
import com.sudhi.financetracker.finance.domain.budget.BudgetSnapshot;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.UserPreferences;

public class BudgetServiceV2 {

    private final BudgetEngineV2 engine = new BudgetEngineV2();

    public BudgetSnapshot calculate(UserPreferences preferences, double income, List<Expense> expenses

    ) {

        return engine.calculate(preferences.plan(), income, expenses);

    }

}