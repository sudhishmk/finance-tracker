package com.sudhi.financetracker.app.rest;

import java.util.List;

import com.sudhi.financetracker.app.service.BudgetService;
import com.sudhi.financetracker.budget.model.BudgetStatusResponse;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.Income;
import com.sudhi.financetracker.finance.model.UserPreferences;
import com.sudhi.financetracker.finance.repository.ExpenseRepository;
import com.sudhi.financetracker.finance.repository.IncomeRepository;
import com.sudhi.financetracker.finance.repository.UserPreferencesRepository;
import com.sudhi.financetracker.finance.service.IncomeService;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;

@Path("/api/v1/budget")
public class BudgetResource {

    private final ExpenseRepository expenseRepository;

    private final UserPreferencesRepository preferencesRepository;

    private final IncomeRepository incomeRepository;

    private final IncomeService incomeService =  new IncomeService();

    private final BudgetService budgetService = new BudgetService();

    public BudgetResource(ExpenseRepository expenseRepository,UserPreferencesRepository preferencesRepository,
        IncomeRepository incomeRepository) {

        this.expenseRepository = expenseRepository;
        this.preferencesRepository = preferencesRepository;
        this.incomeRepository =     incomeRepository;

    }

    @GET
    @Path("/status")
    public BudgetStatusResponse status( @QueryParam("month") String month ) {

        UserPreferences preferences = preferencesRepository.get().orElseThrow();

        List<Expense> expenses = expenseRepository.findByMonth( month);

        List<Income> incomes = incomeRepository.findByMonth(month);

        double monthlyIncome = incomeService.totalMonthlyIncome(incomes);

        return budgetService.calculate(preferences,expenses,monthlyIncome);

    }

}
