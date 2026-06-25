package com.sudhi.financetracker.fire.model;

public record FireWithdrawalRow(
    int year,
    double corpusStart,
    double inflatedExpense,
    double grossWithdrawal,
    double tax,
    double netWithdrawal,
    double corpusEnd,
    double fireNumber,
    String status
) {}

