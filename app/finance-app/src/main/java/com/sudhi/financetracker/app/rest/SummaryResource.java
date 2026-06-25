package com.sudhi.financetracker.app.rest;

import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.Income;
import com.sudhi.financetracker.finance.model.MonthlySummary;
import com.sudhi.financetracker.finance.repository.ExpenseRepository;
import com.sudhi.financetracker.finance.repository.IncomeRepository;
import com.sudhi.financetracker.finance.service.SummaryService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/api/v1/summary")
@Produces(MediaType.APPLICATION_JSON)
public class SummaryResource {

    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;
    private final SummaryService summaryService = new SummaryService();

    public SummaryResource(
            ExpenseRepository expenseRepository,
            IncomeRepository incomeRepository
    ) {
        this.expenseRepository = expenseRepository;
        this.incomeRepository = incomeRepository;
    }

    @GET
    public MonthlySummary getSummary(
            @QueryParam("month") String month
    ) {

        List<Income> incomes = incomeRepository.findByMonth(month);
        List<Expense> expenses = expenseRepository.findByMonth(month);

        return summaryService.generate(incomes, expenses);
    }
}
