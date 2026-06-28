package com.sudhi.financetracker.finance.domain.budget;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;

import com.sudhi.financetracker.finance.domain.plan.PlanDefaults;
import com.sudhi.financetracker.finance.model.Expense;

class BudgetEngineV2Test {

    private final BudgetEngineV2 engine = new BudgetEngineV2();

    @Test
    void shouldCalculatePools() {
        var snapshot = engine.calculate(PlanDefaults.create(), 100000, List.of());

        assertEquals(70000, snapshot.spendingPool());

        assertEquals(30000, snapshot.investmentPool());

    }

    @Test
    void shouldCalculateAllocationBudgets() {

        var snapshot = engine.calculate(PlanDefaults.create(), 100000, List.of());

        var normal = snapshot.allocations().stream().filter(a -> a.id().equals("NORMAL")).findFirst().orElseThrow();

        assertEquals(50000, normal.budget());

    }

    @Test
    void shouldCalculateCategoryBudgets() {

        var snapshot = engine.calculate(PlanDefaults.create(), 100000, List.of());

        var food = snapshot.categories().stream().filter(c -> c.id().equals("FOOD")).findFirst().orElseThrow();

        assertEquals(15000, food.budget());

    }

    @Test
    void shouldCalculateTravelBudget() {

        var snapshot = engine.calculate(PlanDefaults.create(), 100000, List.of());

        var travel = snapshot.categories().stream().filter(c -> c.id().equals("TRAVEL")).findFirst().orElseThrow();

        assertEquals(5000, travel.budget());

    }

    @Test
    void shouldCalculateGrowthBudget() {

        var snapshot = engine.calculate(PlanDefaults.create(), 100000, List.of());

        var books = snapshot.categories().stream().filter(c -> c.id().equals("BOOKS")).findFirst().orElseThrow();
        assertEquals(10000, books.budget());

    }

    @Test
    void shouldCalculateFoodSpent() {

        Expense food = new Expense(1L, LocalDate.now(), "Lunch", 5000.0, "Food", "UPI", "HDFC", 8

        );

        BudgetSnapshot snapshot = engine.calculate(PlanDefaults.create(), 100000, List.of(food));

        CategorySnapshot category = snapshot.categories().stream().filter(c -> c.id().equals("FOOD")

        ).findFirst().orElseThrow();
        assertEquals(5000, category.spent());

        assertEquals(33.33, category.utilization(), 0.1);

    }

    @Test
    void shouldCalculateNormalSpent() {

        Expense food = new Expense(1L, LocalDate.now(), "Lunch", 5000.0, "Food", "UPI", "HDFC",

                8);

        BudgetSnapshot snapshot = engine.calculate(PlanDefaults.create(), 100000, List.of(food

        )

        );

        AllocationSnapshot normal = snapshot.allocations().stream().filter(a -> a.id().equals("NORMAL")

        ).findFirst().orElseThrow();

        assertEquals(5000, normal.spent());

        assertEquals(10.0, normal.utilization(), 0.1);

    }

}