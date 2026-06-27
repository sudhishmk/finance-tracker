package com.sudhi.financetracker.app.persistence;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "user_preferences")
public class UserPreferencesEntity extends PanacheEntity {

    public String currency;

    public double monthlyIncome;

    @Column(length = 2000)
    public String allocationJson;

    @Column(length = 4000)
    public String categoryBudgets;

    public boolean fireEnabled;

    public Double fireTargetCorpus;
}
