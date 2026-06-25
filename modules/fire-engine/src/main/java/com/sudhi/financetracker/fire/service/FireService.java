package com.sudhi.financetracker.fire.service;

import com.sudhi.financetracker.fire.model.FireFullSimulationResponse;
import com.sudhi.financetracker.fire.model.FireResult;
import com.sudhi.financetracker.fire.model.FireSimulationRequest;

public class FireService {

    private final FireCalculator calculator = new FireCalculator();

    public FireResult project(
            double annualExpense,
            double currentCorpus,
            double annualInvestment,
            double returnRate,
            double inflation,
            double multiplier
    ) {

        if (annualInvestment < 0) {
            annualInvestment = 0; // avoid negative compounding
        }

        return calculator.calculate(
                annualExpense,
                currentCorpus,
                annualInvestment,
                returnRate,
                inflation,
                multiplier
        );
    }

    public FireResult simulate(double annualExpense, double currentCorpus, double monthlyInvestment,
            double annualReturn, double inflation, int currentAge, int fireAge, int multiplier) {
        return calculator.simulate(annualExpense, currentCorpus, monthlyInvestment, annualReturn, inflation, currentAge, fireAge, multiplier) ;
        
    }

    public FireFullSimulationResponse fullSimulation(FireSimulationRequest request) {
        return calculator.fullSimulation(request);
    
    }
}
