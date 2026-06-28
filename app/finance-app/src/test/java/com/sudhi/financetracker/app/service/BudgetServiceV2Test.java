package com.sudhi.financetracker.app.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.time.LocalDate;

import org.junit.jupiter.api.Test;

import com.sudhi.financetracker.finance.domain.plan.PlanDefaults;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.UserPreferences;

class BudgetServiceV2Test {

    private final BudgetServiceV2 service = new BudgetServiceV2();

    @Test
    void shouldDelegateToBudgetEngine() {
        UserPreferences preferences = new UserPreferences("INR",

                0, java.util.Map.of(), java.util.Map.of(),

                PlanDefaults.create(), true, 30000000.0

        );

        Expense expense = new Expense(1L, LocalDate.now(),

                "Lunch", 5000, "Food",

                "UPI", "HDFC", 8

        );

        var snapshot = service.calculate(preferences, 100000,

                List.of(expense));

        assertEquals(70000, snapshot.spendingPool());

    }

}