package com.sudhi.financetracker.app.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.sudhi.financetracker.budget.model.BudgetStatusResponse;
import com.sudhi.financetracker.budget.service.BudgetCalculator;
import com.sudhi.financetracker.finance.model.DefaultBudgets;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.MonthlyBudget;
import com.sudhi.financetracker.finance.model.UserPreferences;

public class BudgetService {

    private final BudgetCalculator calculator = new BudgetCalculator();

    public BudgetStatusResponse calculate(
            UserPreferences preferences,
            List<Expense> expenses) {

        double monthlyIncome = preferences.monthlyIncome();

        double normalPct = preferences.allocation()
                .getOrDefault(
                        "NORMAL",
                        0.0);

        Map<String, MonthlyBudget> configs = preferences.categoryBudgets();

        if (configs == null || configs.isEmpty()) {
            configs = DefaultBudgets.defaults();
        }

        double normalBudget = monthlyIncome
                * normalPct
                / 100.0;

        Map<String, Double> budgets =

                preferences.categoryBudgets()

                        .entrySet()

                        .stream()

                        .filter(

                                e -> e.getValue().enabled()

                        )

                        .collect(

                                Collectors.toMap(

                                        Map.Entry::getKey,

                                        e ->

                                        normalBudget

                                                *

                                                e.getValue()

                                                        .percentage()

                                                / 100.0

                                )

                        );

        Map<String, Double> actuals =

                expenses.stream()

                        .collect(

                                Collectors.groupingBy(

                                        Expense::getCategory,

                                        Collectors.summingDouble(

                                                Expense::getAmount

                                        )

                                )

                        );

        return calculator.calculate(

                budgets,

                actuals

        );

    }
}