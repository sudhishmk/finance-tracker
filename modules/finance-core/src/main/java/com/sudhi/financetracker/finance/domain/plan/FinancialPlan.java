package com.sudhi.financetracker.finance.domain.plan;

import java.util.List;

import com.sudhi.financetracker.finance.domain.allocation.Allocation;
import com.sudhi.financetracker.finance.domain.category.BudgetCategory;

public record FinancialPlan(

        int version,

        List<Allocation> allocations,

        List<BudgetCategory> categories

) {}