package com.sudhi.financetracker.finance.domain.budget;

import java.util.List;

public record BudgetSnapshot(

        double income,

        double spendingPool,

        double investmentPool,

        List<AllocationSnapshot> allocations,

        List<CategorySnapshot> categories

) {}