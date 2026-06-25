package com.sudhi.financetracker.budget.model;

public class BudgetStatus {

    private final String account;
    private final double allocated;
    private final double spent;
    private final double variance;

    public BudgetStatus(String account, double allocated, double spent) {
        this.account = account;
        this.allocated = allocated;
        this.spent = spent;
        this.variance = allocated - spent;
    }

    public String getAccount() {
        return account;
    }

    public double getAllocated() {
        return allocated;
    }

    public double getSpent() {
        return spent;
    }

    public double getVariance() {
        return variance;
    }
}
