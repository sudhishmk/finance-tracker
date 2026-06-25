package com.sudhi.financetracker.finance.service;

import java.util.List;

public class IncomeService {

    public double totalMonthlyIncome(List<Double> incomes) {
        return incomes.stream().mapToDouble(Double::doubleValue).sum();
    }
}
