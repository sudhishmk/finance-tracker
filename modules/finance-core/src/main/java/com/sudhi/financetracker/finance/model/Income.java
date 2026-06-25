package com.sudhi.financetracker.finance.model;

import java.time.LocalDate;

public record Income(
        Long id,
        LocalDate date,
        String source,
        double amount
) {}
