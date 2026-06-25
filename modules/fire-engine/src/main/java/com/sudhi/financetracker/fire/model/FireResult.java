package com.sudhi.financetracker.fire.model;

import java.util.List;

public record FireResult(
        double currentAnnualExpense,
        double requiredCorpus,
        double projectedCorpus,
        int yearsToFire,
        double progressPercent,
        List<Double> yearlyCorpus
) {}
