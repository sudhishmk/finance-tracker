package com.sudhi.financetracker.app.persistence;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "incomes")
public class IncomeEntity extends PanacheEntity {

    public LocalDate date;
    public String month;
    public String source;
    public double amount;
}
