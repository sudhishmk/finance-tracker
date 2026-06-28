package com.sudhi.financetracker.finance.model;

import java.time.LocalDate;

public class Expense {

    private Long id;   
    private LocalDate date;
    private String description;
    private double amount;
    private String category;
    private String paymentMode;
    private String account;
    private Integer valueScore;

    public Expense() {}

    public Expense(Long id,
                   LocalDate date,
                   String description,
                   double amount,
                   String category,
                   String paymentMode,
                   String account,
                   Integer valueScore) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.paymentMode = paymentMode;
        this.account = account;
        this.valueScore = valueScore;
    }

    public Long getId() { return id; }   
    public LocalDate getDate() { return date; }
    public String getDescription() { return description; }
    public double getAmount() { return amount; }
    public String getCategory() { return category; }
    public String getAccount() { return account; }
    public Integer getValueScore() { return valueScore; }
    public String getPaymentMode() { return paymentMode; }

}
