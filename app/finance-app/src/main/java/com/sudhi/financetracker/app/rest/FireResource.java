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
import com.sudhi.financetracker.fire.model.AnnualExpenseSource;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.time.YearMonth;
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
            @QueryParam("multiplier") @DefaultValue("25") double multiplier,
            @QueryParam("expenseSource") @DefaultValue("SELECTED_MONTH") AnnualExpenseSource expenseSource,
            @QueryParam("manualAnnualExpense") Double manualAnnualExpense
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
            
        double annualExpense = calculateAnnualExpense(
                month,
                expenseSource,
                manualAnnualExpense
        );
        
        LOG.info("Expense Source : " + expenseSource);
        LOG.info("Annual Expense : " + annualExpense);
        
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

        private double calculateAnnualExpense(
                String month,
                AnnualExpenseSource expenseSource,
                Double manualAnnualExpense
        ) {

        switch (expenseSource) {

                case MANUAL:
                return manualAnnualExpense == null
                        ? 0
                        : manualAnnualExpense;

                case LAST_6_MONTHS: {

                YearMonth current = YearMonth.parse(month);

                double total = 0;

                for (int i = 0; i < 6; i++) {

                        String m = current.minusMonths(i).toString();

                        total += expenseRepository
                                .findByMonth(m)
                                .stream()
                                .mapToDouble(Expense::getAmount)
                                .sum();
                }

                return (total / 6.0) * 12;
                }

                case LAST_12_MONTHS: {

                YearMonth current = YearMonth.parse(month);

                double total = 0;

                for (int i = 0; i < 12; i++) {

                        String m = current.minusMonths(i).toString();

                        total += expenseRepository
                                .findByMonth(m)
                                .stream()
                                .mapToDouble(Expense::getAmount)
                                .sum();
                }

                return total;
                }

                case SELECTED_MONTH:
                default:

                double monthlyExpense =
                        expenseRepository
                                .findByMonth(month)
                                .stream()
                                .mapToDouble(Expense::getAmount)
                                .sum();

                return monthlyExpense * 12;
        }
        }

    
}

