package com.sudhi.financetracker.finance.domain.budget;

public record AllocationSnapshot(

        String id,

        String name,

        double budget,

        double spent,

        double remaining,

        double utilization

) {}