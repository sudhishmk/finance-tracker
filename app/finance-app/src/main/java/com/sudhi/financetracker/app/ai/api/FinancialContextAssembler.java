package com.sudhi.financetracker.app.ai.api;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import com.sudhi.finance.analytics.ai.coach.model.FinancialSnapshot;

import com.sudhi.financetracker.app.repository.ExpenseRepositoryImpl;
import com.sudhi.financetracker.app.repository.IncomeRepositoryImpl;
import com.sudhi.financetracker.app.repository.UserPreferencesRepositoryImpl;

import com.sudhi.financetracker.app.service.BudgetService;

import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.Income;
import com.sudhi.financetracker.finance.model.MonthlySummary;
import com.sudhi.financetracker.finance.model.UserPreferences;

import com.sudhi.financetracker.finance.service.SummaryService;

@ApplicationScoped
public class FinancialContextAssembler {

    @Inject
    ExpenseRepositoryImpl expenseRepository;

    @Inject
    IncomeRepositoryImpl incomeRepository;

    @Inject
    UserPreferencesRepositoryImpl preferencesRepository;

    SummaryService summaryService =

            new SummaryService();

    BudgetService budgetService =

            new BudgetService();

    public FinancialSnapshot build(

            String month

    ) {

        List<Income> incomes =

                incomeRepository.findByMonth(

                        month

                );

        List<Expense> expenses =

                expenseRepository.findByMonth(

                        month

                );

        UserPreferences preferences =

                preferencesRepository

                        .get()

                        .orElseThrow(

                                () -> new RuntimeException(

                                        "User preferences not found"

                                )

                        );

        MonthlySummary summary =

                summaryService.generate(

                        incomes,

                        expenses

                );

        var budget =

                budgetService.calculate(

                        preferences,

                        expenses

                );

        return new FinancialSnapshot(

                summary.totalIncome(),

                summary.totalExpenses(),

                summary.savings(),

                summary.savingsRate(),

                summary.topSpendingCategory(),

                budget.utilization(),

                preferences.fireTargetCorpus(),

                List.of()

        );

    }

}