package com.sudhi.financetracker.fire.model;

public record FireAccumulationRow(
    int year,
    double monthlySip,
    double annualSip,
    double totalInvested,
    double corpusStart,
    double corpusEnd
) {}

