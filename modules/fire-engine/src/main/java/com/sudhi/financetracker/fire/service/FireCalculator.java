package com.sudhi.financetracker.fire.service;

import com.sudhi.financetracker.fire.model.FireAccumulationRow;
import com.sudhi.financetracker.fire.model.FireFullSimulationResponse;
import com.sudhi.financetracker.fire.model.FireResult;
import com.sudhi.financetracker.fire.model.FireSimulationRequest;
import com.sudhi.financetracker.fire.model.FireWithdrawalRow;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FireCalculator {

    private static final Logger LOG =
        LoggerFactory.getLogger(FireCalculator.class);

    public FireResult calculate(
            double currentAnnualExpense,
            double currentCorpus,
            double annualInvestment,
            double expectedReturnRate,
            double inflationRate,
            double multiplier
    ) {

        double returnRate = expectedReturnRate / 100.0;
        double inflation = inflationRate / 100.0;

        int years = 0;
        double corpus = currentCorpus;
        double requiredCorpus = 0;
        List<Double> trajectory = new ArrayList<>();
        
        
        while (years < 60) {

            // Inflation-adjusted annual expense
            double futureAnnualExpense =
                    currentAnnualExpense * Math.pow(1 + inflation, years);

            requiredCorpus = futureAnnualExpense * multiplier;
            trajectory.add(corpus);

            if (corpus >= requiredCorpus) {
                double progress = (corpus / requiredCorpus) * 100;
                return new FireResult(
                        currentAnnualExpense,
                        requiredCorpus,
                        corpus,
                        years,
                        progress,
                        trajectory
                );
            }

            // Grow corpus
            corpus = corpus * (1 + returnRate) + annualInvestment;
            years++;
        }
        
        LOG.info("fire_projection result | requiredCorpus={} projectedCorpus={} yearsToFire={}",
        requiredCorpus,
        corpus,
        years);
        return new FireResult(
                currentAnnualExpense,
                0,
                corpus,
                -1,
                0,
                trajectory
        );
    }

    public FireResult simulate(
        double currentAnnualExpense,
        double currentCorpus,
        double monthlyInvestment,
        double annualReturn,
        double inflation,
        int currentAge,
        int fireAge,
        double multiplier
) {

    double returnRate = annualReturn / 100.0;
    double inflationRate = inflation / 100.0;

    int years = fireAge - currentAge;

    double corpus = currentCorpus;
    List<Double> trajectory = new ArrayList<>();
    for (int i = 0; i < years; i++) {
        corpus = corpus * (1 + returnRate)
                + (monthlyInvestment * 12);
        trajectory.add(corpus);
    }

    double futureAnnualExpense =
            currentAnnualExpense * Math.pow(1 + inflationRate, years);

    double requiredCorpus = futureAnnualExpense * multiplier;

    double progress = requiredCorpus == 0
            ? 0
            : (corpus / requiredCorpus) * 100;

    return new FireResult(
            currentAnnualExpense,
            requiredCorpus,
            corpus,
            years,
            progress,
            trajectory
    );
}


public FireFullSimulationResponse fullSimulation(
    FireSimulationRequest request
) {

double returnRate = request.annualReturn / 100.0;
double inflationRate = request.inflation / 100.0;
double withdrawalRate =
        request.safeWithdrawalRate / 100.0;
double taxRate = request.taxRate / 100.0;

List<FireAccumulationRow> accumulationRows =
        new ArrayList<>();
List<FireWithdrawalRow> withdrawalRows =
        new ArrayList<>();

double corpus = request.currentCorpus;
double totalInvested = 0;

// =============================
// PHASE 1 — ACCUMULATION
// =============================

for (int year = 1;
     year <= request.yearsToFire;
     year++) {

    double corpusStart = corpus;

    double annualInvestment =
            request.monthlyInvestment * 12;

    corpus =
            corpusStart * (1 + returnRate)
                    + annualInvestment;

    totalInvested += annualInvestment;

    accumulationRows.add(
            new FireAccumulationRow(
                    year,
                    request.monthlyInvestment,
                    annualInvestment,
                    totalInvested,
                    corpusStart,
                    corpus
            )
    );
}

double corpusAtFire = corpus;

double inflatedExpenseAtFire =
    request.annualExpense *
    Math.pow(1 + inflationRate, request.yearsToFire);

double fireNumber =
    inflatedExpenseAtFire / withdrawalRate;

boolean fireReady =
        corpusAtFire >= fireNumber;

// =============================
// PHASE 2 — WITHDRAWAL
// =============================

for (int year = 1;
     year <= request.retirementYears;
     year++) {

    double corpusStart = corpus;

    double inflatedExpense =
            request.annualExpense *
                    Math.pow(
                            1 + inflationRate,
                            request.yearsToFire + year - 1
                    );

    double netWithdrawal =
            inflatedExpense;

    double tax =
            inflatedExpense * taxRate;

    double grossWithdrawal =
            netWithdrawal + tax;

    corpus =
            corpusStart * (1 + returnRate)
                    - grossWithdrawal;

    double dynamicFireNumber =
            withdrawalRate > 0
                    ? inflatedExpense
                        / withdrawalRate
                    : Double.POSITIVE_INFINITY;

    String status =
            corpus >= dynamicFireNumber
                    ? "SAFE"
                    : "UNSAFE";

    withdrawalRows.add(
            new FireWithdrawalRow(
                    year,
                    corpusStart,
                    inflatedExpense,
                    grossWithdrawal,
                    tax,
                    netWithdrawal,
                    corpus,
                    dynamicFireNumber,
                    status
            )
    );

    if (corpus <= 0) {
        break;
    }
}

return new FireFullSimulationResponse(
        accumulationRows,
        withdrawalRows,
        corpusAtFire,
        fireReady
);
}







}
