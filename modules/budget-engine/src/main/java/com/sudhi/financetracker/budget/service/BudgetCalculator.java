package com.sudhi.financetracker.budget.service;

import java.util.*;

import com.sudhi.financetracker.budget.model.*;

public class BudgetCalculator {

    public BudgetStatusResponse calculate(

            Map<String, Double> budgets,

            Map<String, Double> actuals

    ) {

        List<CategoryBudget> rows =
                new ArrayList<>();

        double totalBudget = 0;
        double totalSpent = 0;

        for (Map.Entry<String, Double> entry :
                budgets.entrySet()) {

            String category =
                    entry.getKey();

            double budget =
                    entry.getValue();

            double spent =
                    actuals.getOrDefault(
                            category,
                            0.0
                    );

            double remaining =
                    budget - spent;

            double utilization =
                    budget == 0
                            ? 0
                            : spent * 100 / budget;

            String status;

            if (utilization >= 100) {

                status = "OVER";

            }
            else if (utilization >= 90) {

                status = "WARNING";

            }
            else {

                status = "GOOD";

            }

            rows.add(

                    new CategoryBudget(

                            category,

                            budget,

                            spent,

                            remaining,

                            utilization,

                            status

                    )

            );

            totalBudget += budget;

            totalSpent += spent;

        }

        double remaining =
                totalBudget - totalSpent;

        double utilization =
                totalBudget == 0
                        ? 0
                        : totalSpent * 100 / totalBudget;

        return new BudgetStatusResponse(

                totalBudget,

                totalSpent,

                remaining,

                utilization,

                rows

        );

    }

}