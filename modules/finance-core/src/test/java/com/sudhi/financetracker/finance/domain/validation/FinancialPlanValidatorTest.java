package com.sudhi.financetracker.finance.domain.validation;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.sudhi.financetracker.finance.domain.plan.PlanDefaults;

class FinancialPlanValidatorTest {

    private final FinancialPlanValidator validator = new FinancialPlanValidator();

    @Test
    void shouldValidateDefaultPlan() {

        ValidationResult result = validator.validate(PlanDefaults.create());

        assertTrue(result.valid());

    }

}