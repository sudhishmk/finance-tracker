package com.sudhi.financetracker.app.rest;

import java.util.List;

import com.sudhi.financetracker.app.service.BudgetService;
import com.sudhi.financetracker.budget.model.BudgetStatusResponse;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.UserPreferences;
import com.sudhi.financetracker.finance.repository.ExpenseRepository;
import com.sudhi.financetracker.finance.repository.UserPreferencesRepository;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;

@Path("/api/v1/budget")
public class BudgetResource {

    private final ExpenseRepository expenseRepository;

    private final UserPreferencesRepository preferencesRepository;

    private final BudgetService budgetService = new BudgetService();

    public BudgetResource(

            ExpenseRepository expenseRepository,

            UserPreferencesRepository preferencesRepository

    ) {

        this.expenseRepository = expenseRepository;

        this.preferencesRepository = preferencesRepository;

    }

    @GET
    @Path("/status")
    public BudgetStatusResponse status(

            @QueryParam("month")

            String month

    ) {

        UserPreferences preferences =

                preferencesRepository

                        .get()

                        .orElseThrow();

        List<Expense> expenses =

                expenseRepository.findByMonth(

                        month

                );

        return budgetService.calculate(

                preferences,

                expenses

        );

    }

}
