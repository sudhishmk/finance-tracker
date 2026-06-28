package com.sudhi.financetracker.finance.domain.plan;

public final class PlanAdapter {

    private PlanAdapter() {
    }

    public static FinancialPlan legacyDefault() {
        return PlanDefaults.create();
    }

    public static FinancialPlan resolve(FinancialPlan plan) {

        if (plan == null) {
            return legacyDefault();
        }
        return plan;
    }

}