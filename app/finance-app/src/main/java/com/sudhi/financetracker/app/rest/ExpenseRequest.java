package com.sudhi.financetracker.app.rest;

import java.time.LocalDate;

public class ExpenseRequest {
    public LocalDate date;
    public String description;
    public double amount;
    public String category;
    public String paymentMode;
    public String account;
    public Integer valueScore;
}
