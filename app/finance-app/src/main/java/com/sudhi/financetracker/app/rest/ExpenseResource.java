package com.sudhi.financetracker.app.rest;

import com.sudhi.financetracker.app.mapper.ExpenseMapper;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.repository.ExpenseRepository;
import com.sudhi.financetracker.finance.service.ExpenseService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/api/v1/expenses")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class ExpenseResource {

    private final ExpenseService service;

    @Inject
    public ExpenseResource(ExpenseRepository repository) {
        this.service = new ExpenseService(repository);
    }

    @POST
    public void addExpense(ExpenseRequest request) {
        Expense expense = ExpenseMapper.toDomain(request);
        service.addExpense(expense);
    }

    @GET
    public List<Expense> getByMonth(@QueryParam("month") String month) {
        return service.getMonthlyExpenses(month);
    }
    @PUT
    @Path("/{id}")
    public void updateExpense(@PathParam("id") Long id,
                            ExpenseRequest request) {
        Expense expense = ExpenseMapper.toDomain(request);
        service.updateExpense(id, expense);
    }

    @DELETE
    @Path("/{id}")
    public void deleteExpense(@PathParam("id") Long id) {
        service.deleteExpense(id);
    }

}
