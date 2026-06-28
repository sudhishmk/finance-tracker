package com.sudhi.financetracker.finance.domain.allocation;

public record Allocation(
        String id,

        String name,

        AllocationType type,

        double percentage,

        boolean enabled) {

}
