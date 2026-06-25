package com.sudhi.financetracker.app.rest;

import com.sudhi.financetracker.budget.model.BudgetStatus;
import com.sudhi.financetracker.budget.service.BudgetCalculator;
import com.sudhi.financetracker.finance.model.AccountAllocation;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.Income;
import com.sudhi.financetracker.finance.repository.ExpenseRepository;
import com.sudhi.financetracker.finance.repository.IncomeRepository;
import com.sudhi.financetracker.finance.repository.UserPreferencesRepository;
import com.sudhi.financetracker.finance.model.UserPreferences;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Path("/api/v1/budget/status")
@Produces(MediaType.APPLICATION_JSON)
public class BudgetResource {

    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;
    private final UserPreferencesRepository preferencesRepository;
    private final BudgetCalculator calculator = new BudgetCalculator();

    public BudgetResource(ExpenseRepository expenseRepository,
        IncomeRepository incomeRepository, 
        UserPreferencesRepository preferencesRepository) {
        this.expenseRepository = expenseRepository;
        this.incomeRepository = incomeRepository;
        this.preferencesRepository = preferencesRepository;
    }

    @GET
    public List<BudgetStatus> getBudgetStatus(
            @QueryParam("month") String month
    ) {
        List<Income> incomes = incomeRepository.findByMonth(month);

        double totalIncome = incomes.stream()
                .mapToDouble(Income::amount)
                .sum();

        List<Expense> expenses = expenseRepository.findByMonth(month);
        UserPreferences preferences =
        preferencesRepository.get().orElse(null);

        Map<String, Double> allocation;

        if (preferences != null && preferences.allocation() != null) {
            allocation = preferences.allocation();
        } else {
            allocation = AccountAllocation.defaultAllocation();
        }

        List<BudgetStatus> result = new ArrayList<>();

        for (Map.Entry<String, Double> entry : allocation.entrySet()) {
            String account = entry.getKey();
            double percent = entry.getValue();

            double spent = expenses.stream()
                    .filter(e -> account.equals(e.getAccount()))
                    .mapToDouble(Expense::getAmount)
                    .sum();

            result.add(
                    calculator.calculate(account, totalIncome, percent, spent)
            );
        }

        return result;
    }
}
