package com.sudhi.financetracker.budget.model;

public record CategoryBudget(

    String category,

    double budget,

    double spent,

    double remaining,

    double utilization,

    String status

) {}
