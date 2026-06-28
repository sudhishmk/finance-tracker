package com.sudhi.financetracker.finance.service;

import java.util.List;

import com.sudhi.financetracker.finance.model.Income;

public class IncomeService {

    public double totalMonthlyIncome(List<Income> incomes) {
        return incomes.stream()
                .mapToDouble(Income::amount).sum();
    }

}
