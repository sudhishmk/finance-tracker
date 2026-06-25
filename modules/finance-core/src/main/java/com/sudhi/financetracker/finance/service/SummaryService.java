package com.sudhi.financetracker.finance.service;

import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.Income;
import com.sudhi.financetracker.finance.model.MonthlySummary;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SummaryService {

    public MonthlySummary generate(
            List<Income> incomes,
            List<Expense> expenses
    ) {

        double totalIncome = incomes.stream()
                .mapToDouble(Income::amount)
                .sum();

        double totalExpenses = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double savings = totalIncome - totalExpenses;

        double savingsRate = totalIncome == 0
                ? 0
                : (savings / totalIncome) * 100;

        double highValueSpend = expenses.stream()
                .filter(e -> e.getValueScore() != null && e.getValueScore() >= 7)
                .mapToDouble(Expense::getAmount)
                .sum();

        double lowValueSpend = expenses.stream()
                .filter(e -> e.getValueScore() != null && e.getValueScore() <= 3)
                .mapToDouble(Expense::getAmount)
                .sum();

        Map<String, Double> categorySpend = expenses.stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.summingDouble(Expense::getAmount)
                ));

        String topCategory = categorySpend.entrySet().stream()
                .max(Comparator.comparingDouble(Map.Entry::getValue))
                .map(Map.Entry::getKey)
                .orElse("None");

        return new MonthlySummary(
                totalIncome,
                totalExpenses,
                savings,
                savingsRate,
                highValueSpend,
                lowValueSpend,
                topCategory
        );
    }
}
