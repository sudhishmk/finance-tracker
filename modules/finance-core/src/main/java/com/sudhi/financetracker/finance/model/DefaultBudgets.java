package com.sudhi.financetracker.finance.model;

import java.util.Map;

public class DefaultBudgets {

    private DefaultBudgets() {}

    public static Map<String, MonthlyBudget> defaults() {

        return Map.of(

            "Food",
            new MonthlyBudget(30, true),

            "Travel",
            new MonthlyBudget(10, true),

            "Utilities",
            new MonthlyBudget(10, true),

            "Health",
            new MonthlyBudget(10, true),

            "Fun",
            new MonthlyBudget(15, true),

            "Personal Growth",
            new MonthlyBudget(15, true),

            "Contribution",
            new MonthlyBudget(10, true)

        );

    }

}