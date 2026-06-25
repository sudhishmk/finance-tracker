package com.sudhi.financetracker.finance.model;

import java.util.Map;

public record UserPreferences(
        String currency,
        double monthlyIncome,
        Map<String, Double> allocation,
        boolean fireEnabled,
        Double fireTargetCorpus
) {}
