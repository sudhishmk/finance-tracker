package com.sudhi.financetracker.app.persistence;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "expenses")
public class ExpenseEntity extends PanacheEntity {

    public LocalDate date;
    public String month;
    public String description;
    public double amount;
    public String category;
    public String paymentMode;
    public String account;
    public Integer valueScore;
}
