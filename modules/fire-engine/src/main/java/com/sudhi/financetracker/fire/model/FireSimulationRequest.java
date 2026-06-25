package com.sudhi.financetracker.fire.model;

public class FireSimulationRequest {


    public double currentCorpus;

    public double monthlyInvestment;

    public double annualReturn;   // %
    public double inflation;      // %

    public int yearsToFire;
    public int retirementYears;

    public int multiplier;     // e.g. 25

    public int lifeExpectancy;          // e.g., 85

    public double safeWithdrawalRate;   // default 3.5%
    public double taxRate;              // %

    public Double annualExpense;
}
