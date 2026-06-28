package com.sudhi.financetracker.finance.domain.budget;

import com.sudhi.financetracker.finance.domain.allocation.Allocation;

public class AllocationCalculator {

    public double calculate(double income, Allocation allocation) {

        return income * allocation.percentage() / 100.0;

    }

}