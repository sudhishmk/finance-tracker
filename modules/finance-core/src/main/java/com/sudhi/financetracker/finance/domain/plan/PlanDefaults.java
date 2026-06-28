package com.sudhi.financetracker.finance.domain.plan;

import java.util.List;

import com.sudhi.financetracker.finance.domain.allocation.Allocation;
import com.sudhi.financetracker.finance.domain.allocation.AllocationType;
import com.sudhi.financetracker.finance.domain.category.BudgetCategory;

public final class PlanDefaults {

    private PlanDefaults() {
    }

    public static FinancialPlan create() {

        return new FinancialPlan(

                1,

                defaultAllocations(),

                defaultCategories()

        );

    }

    private static List<Allocation> defaultAllocations() {

        return List.of(

                new Allocation(
                        "NORMAL",
                        "Normal",
                        AllocationType.SPENDING,
                        50,
                        true),

                new Allocation(
                        "PERSONAL_GROWTH",
                        "Personal Growth",
                        AllocationType.SPENDING,
                        10,
                        true),

                new Allocation(
                        "CONTRIBUTION",
                        "Contribution",
                        AllocationType.SPENDING,
                        5,
                        true),

                new Allocation(
                        "FUN",
                        "Fun",
                        AllocationType.SPENDING,
                        5,
                        true),

                new Allocation(
                        "RETIREMENT",
                        "Retirement",
                        AllocationType.INVESTMENT,
                        15,
                        true),

                new Allocation(
                        "LONG_TERM",
                        "Long Term Savings",
                        AllocationType.INVESTMENT,
                        15,
                        true)

        );

    }

    private static List<BudgetCategory> defaultCategories() {

        return List.of(

                new BudgetCategory(
                        "FOOD",
                        "Food",
                        "NORMAL",
                        30,
                        true),

                new BudgetCategory(
                        "HOUSING",
                        "Housing",
                        "NORMAL",
                        20,
                        true),

                new BudgetCategory(
                        "UTILITIES",
                        "Utilities",
                        "NORMAL",
                        15,
                        true),

                new BudgetCategory(
                        "HEALTH",
                        "Health",
                        "NORMAL",
                        35,
                        true),

                new BudgetCategory(
                        "TRAVEL",
                        "Travel",
                        "FUN",
                        100,
                        true),

                new BudgetCategory(
                        "BOOKS",
                        "Books",
                        "PERSONAL_GROWTH",
                        100,
                        true)

        );

    }

}