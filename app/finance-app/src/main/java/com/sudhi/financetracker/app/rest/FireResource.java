package com.sudhi.financetracker.app.rest;

import com.sudhi.financetracker.fire.model.FireFullSimulationResponse;
import com.sudhi.financetracker.fire.model.FireResult;
import com.sudhi.financetracker.fire.model.FireSimulationRequest;
import com.sudhi.financetracker.fire.service.FireService;
import com.sudhi.financetracker.finance.model.Expense;
import com.sudhi.financetracker.finance.model.UserPreferences;
import com.sudhi.financetracker.finance.repository.ExpenseRepository;
import com.sudhi.financetracker.finance.repository.UserPreferencesRepository;
import org.jboss.logging.Logger;


import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;


@Path("/api/v1/fire")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FireResource {

    private final ExpenseRepository expenseRepository;
    private final UserPreferencesRepository preferencesRepository;
    private final FireService fireService = new FireService();
    private static final Logger LOG = Logger.getLogger(FireResource.class);


    public FireResource(ExpenseRepository expenseRepository, UserPreferencesRepository preferencesRepository) {
        this.expenseRepository = expenseRepository;
        this.preferencesRepository = preferencesRepository;
    }

    @GET
    @Path("/projection")
    public FireResult getProjection(
            @QueryParam("month") String month,
            @QueryParam("currentCorpus") double currentCorpus,
            @QueryParam("annualIncome") double annualIncome,
            @QueryParam("returnRate") @DefaultValue("10") double returnRate,
            @QueryParam("inflation") @DefaultValue("6") double inflation,
            @QueryParam("multiplier") @DefaultValue("25") double multiplier
    ) {

            UserPreferences prefs = preferencesRepository
            .get()
            .orElseThrow(() ->
                    new IllegalStateException("Preferences not configured"));

            LOG.info("---- FIRE PROJECTION REQUEST ----");
            LOG.info("Month: " + month);
            LOG.info("Incoming corpus: " + currentCorpus);
            LOG.info("Return rate: " + returnRate);
            LOG.info("Inflation: " + inflation);
            LOG.info("Multiplier: " + multiplier);
                    
            double monthlyIncome = prefs.monthlyIncome();

            double retirementPct =
            prefs.allocation().get("RETIREMENT");

            double annualInvestment =
            monthlyIncome
                    * (retirementPct / 100.0)
                    * 12;
        LOG.info("Retirement %: " + retirementPct);
        LOG.info("Annual investment: " + annualInvestment);
            
        List<Expense> expenses = expenseRepository.findByMonth(month);

        double monthlyExpense = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double annualExpense = monthlyExpense * 12;
        LOG.info("Monthly expense: " + monthlyExpense);
        LOG.info("Annual expense: " + annualExpense);
        
        return fireService.project(
                annualExpense,
                currentCorpus,
                annualInvestment,
                returnRate,
                inflation,
                multiplier
        );
    }

    @POST
    @Path("/simulate")
    public FireResult simulate(
            @QueryParam("month") String month,
            FireSimulationRequest request
    ) {
    
        double annualExpense;
    
        if (request.annualExpense != null) {
            annualExpense = request.annualExpense;
        } else {
            List<Expense> expenses =
                    expenseRepository.findByMonth(month);
    
            double monthlyExpense = expenses.stream()
                    .mapToDouble(Expense::getAmount)
                    .sum();
    
            annualExpense = monthlyExpense * 12;
        }
    
        return fireService.simulate(
                annualExpense,
                request.currentCorpus,
                request.monthlyInvestment,
                request.annualReturn,
                request.inflation,
                request.yearsToFire,
                request.retirementYears,
                request.multiplier
        );
    }
    
        @POST
        @Path("/full-simulation")
        public FireFullSimulationResponse runFullSimulation(
                FireSimulationRequest request
        ) {
        return fireService.fullSimulation(request);
        }

    
}

