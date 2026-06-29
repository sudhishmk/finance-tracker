package com.sudhi.financetracker.app.ai.api;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import com.sudhi.finance.analytics.ai.coach.model.FinancialSnapshot;

import com.sudhi.financetracker.app.repository.ExpenseRepositoryImpl;
import com.sudhi.financetracker.app.repository.IncomeRepositoryImpl;
import com.sudhi.financetracker.app.repository.UserPreferencesRepositoryImpl;

import com.sudhi.financetracker.app.service.BudgetService;
import com.sudhi.financetracker.app.service.BudgetServiceV2;
import com.sudhi.financetracker.finance.domain.budget.BudgetSnapshot;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.Income;
import com.sudhi.financetracker.finance.model.MonthlySummary;
import com.sudhi.financetracker.finance.model.UserPreferences;
import com.sudhi.financetracker.finance.service.IncomeService;
import com.sudhi.financetracker.finance.service.SummaryService;

@ApplicationScoped
public class FinancialContextAssembler {

        @Inject
        ExpenseRepositoryImpl expenseRepository;

        @Inject
        IncomeRepositoryImpl incomeRepository;

        @Inject
        UserPreferencesRepositoryImpl preferencesRepository;

        SummaryService summaryService = new SummaryService();

        BudgetService budgetService = new BudgetService();

        BudgetServiceV2 budgetServicev2 = new BudgetServiceV2();

        IncomeService incomeService = new IncomeService();

        public FinancialSnapshot build(String month) {

                List<Income> incomes = incomeRepository.findByMonth(month);

                List<Expense> expenses = expenseRepository.findByMonth(month);

                UserPreferences preferences = preferencesRepository.get()
                                .orElseThrow(() -> new RuntimeException("User preferences not found"));

                MonthlySummary summary = summaryService.generate(incomes, expenses);
                double monthlyIncome = incomeService.totalMonthlyIncome(incomes);

                var budget = budgetServicev2.calculate(preferences, monthlyIncome, expenses);

                double totalBudget = budget.categories().stream().mapToDouble(c -> c.budget()).sum();

                double totalSpent = budget.categories().stream().mapToDouble(c -> c.spent()).sum();

                double budgetUtilization = totalBudget == 0 ? 0 : (totalSpent / totalBudget) * 100;

                List<String> insights = budget.categories().stream().filter(c -> c.utilization() > 80)
                                .map(c -> c.name() + " utilization is " + String.format("%.1f%%", c.utilization()))
                                .toList();

                return new FinancialSnapshot(
                                summary.totalIncome(),
                                summary.totalExpenses(),
                                summary.savings(),
                                summary.savingsRate(),
                                summary.topSpendingCategory(),
                                budgetUtilization,
                                preferences.fireTargetCorpus(),
                                insights

                );

        }

}