package com.sudhi.financetracker.finance.domain.validation;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;

import com.sudhi.financetracker.finance.domain.plan.PlanDefaults;
import com.sudhi.financetracker.finance.model.Expense;

class ExpenseCategoryValidatorTest {

    ExpenseCategoryValidator validator = new ExpenseCategoryValidator();

    @Test
    void shouldDetectUnknownCategories() {

        Expense expense = new Expense(1L, LocalDate.now(), "Movie",

                1000, "Fun", "UPI", "HDFC",

                8);

        List<String> result = validator.validate(PlanDefaults.create(), List.of(

                expense));

        assertEquals(1, result.size());

        assertEquals("Fun", result.get(0));

    }

}