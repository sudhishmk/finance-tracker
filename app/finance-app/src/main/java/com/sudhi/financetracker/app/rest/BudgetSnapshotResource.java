package com.sudhi.financetracker.app.rest;

import java.util.List;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;

import com.sudhi.financetracker.app.repository.ExpenseRepositoryImpl;
import com.sudhi.financetracker.app.repository.IncomeRepositoryImpl;
import com.sudhi.financetracker.app.repository.UserPreferencesRepositoryImpl;
import com.sudhi.financetracker.app.service.BudgetServiceV2;

import com.sudhi.financetracker.finance.domain.budget.BudgetSnapshot;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.Income;
import com.sudhi.financetracker.finance.model.UserPreferences;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@Path("/api/v2/budget")
@ApplicationScoped
public class BudgetSnapshotResource {

    @Inject
    ExpenseRepositoryImpl expenseRepository;

    @Inject
    IncomeRepositoryImpl incomeRepository;

    @Inject
    UserPreferencesRepositoryImpl preferencesRepository;

    private final BudgetServiceV2 service = new BudgetServiceV2();

    @GET
    @Path("/snapshot")
    public BudgetSnapshot snapshot(@QueryParam("month") String month) {

        UserPreferences preferences = preferencesRepository.get().orElseThrow();

        List<Expense> expenses = expenseRepository.findByMonth(month);

        List<Income> incomes = incomeRepository.findByMonth(month);

        double income = incomes.stream().mapToDouble(Income::amount).sum();

        return service.calculate(preferences, income, expenses);

    }

}