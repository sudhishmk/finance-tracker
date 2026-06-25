package com.sudhi.financetracker.app.rest;

import com.sudhi.financetracker.finance.model.Income;
import com.sudhi.financetracker.finance.repository.IncomeRepository;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/api/v1/incomes")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class IncomeResource {

    private final IncomeRepository repository;

    public IncomeResource(IncomeRepository repository) {
        this.repository = repository;
    }

    @POST
    public void addIncome(IncomeRequest request) {
        repository.save(
                new Income(
                        null,
                        request.date,
                        request.source,
                        request.amount
                )
        );
    }

    @GET
    public List<Income> getMonthly(@QueryParam("month") String month) {
        return repository.findByMonth(month);
    }
    @PUT
    @Path("/{id}")
    public void update(@PathParam("id") Long id, Income income) {
        repository.update(id, income);
    }
    
    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Long id) {
        repository.delete(id);
    }
    

}
