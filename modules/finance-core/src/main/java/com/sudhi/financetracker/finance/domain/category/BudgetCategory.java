package com.sudhi.financetracker.finance.domain.category;

public record BudgetCategory(

    String id,

    String name,

    String allocationId,

    double percentage,

    boolean enabled

) {}
