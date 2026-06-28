package com.sudhi.financetracker.app.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.sudhi.financetracker.finance.domain.plan.PlanDefaults;
import com.sudhi.financetracker.finance.model.UserPreferences;

class BudgetFacadeTest {

    private final BudgetFacade facade = new BudgetFacade();

    @Test
    void shouldUseBudgetServiceV2() {

        UserPreferences preferences = new UserPreferences("INR", 0, java.util.Map.of(), java.util.Map.of(),
                PlanDefaults.create(), false, null);

        var result = facade.calculate(preferences, 100000, List.of());

        assertNotNull(result);

    }

}