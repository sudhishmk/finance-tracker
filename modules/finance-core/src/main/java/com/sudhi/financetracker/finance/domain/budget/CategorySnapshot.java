package com.sudhi.financetracker.finance.domain.budget;

public record CategorySnapshot(

        String id,

        String name,

        String allocationId,

        double budget,

        double spent,

        double remaining,

        double utilization

) {}