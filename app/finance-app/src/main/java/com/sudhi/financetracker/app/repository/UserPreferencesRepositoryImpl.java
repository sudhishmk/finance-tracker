package com.sudhi.financetracker.app.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sudhi.financetracker.app.persistence.UserPreferencesEntity;
import com.sudhi.financetracker.finance.model.UserPreferences;
import com.sudhi.financetracker.finance.repository.UserPreferencesRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import com.fasterxml.jackson.core.type.TypeReference;
import com.sudhi.financetracker.finance.model.DefaultBudgets;
import com.sudhi.financetracker.finance.model.MonthlyBudget;

import java.util.HashMap;

import java.util.Map;
import java.util.Optional;

@ApplicationScoped
public class UserPreferencesRepositoryImpl implements UserPreferencesRepository {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    @Transactional
    public void save(UserPreferences preferences) {

        UserPreferencesEntity entity = UserPreferencesEntity.findAll().firstResult();

        if (entity == null) {
            entity = new UserPreferencesEntity();
        }

        entity.currency = preferences.currency();
        entity.monthlyIncome = preferences.monthlyIncome();

        try {
            entity.allocationJson = mapper.writeValueAsString(preferences.allocation());
            entity.categoryBudgets = mapper.writeValueAsString(preferences.categoryBudgets());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        entity.fireEnabled = preferences.fireEnabled();
        entity.fireTargetCorpus = preferences.fireTargetCorpus();

        entity.persist();
    }

    @Override
    public Optional<UserPreferences> get() {

        UserPreferencesEntity entity = UserPreferencesEntity.findAll().firstResult();

        if (entity == null) {
            return Optional.empty();
        }

        try {
            Map<String, Double> allocation = mapper.readValue(
                    entity.allocationJson,

                    new TypeReference<Map<String, Double>>() {
                    }

            );

            Map<String, MonthlyBudget> budgets =

                    new HashMap<>();

            if (entity.categoryBudgets != null
                    &&
                    !entity.categoryBudgets.isBlank()) {

                budgets = mapper.readValue(entity.categoryBudgets, new TypeReference<Map<String, MonthlyBudget>>() {
                });

            } else {
                budgets = DefaultBudgets.defaults();
                entity.categoryBudgets = mapper.writeValueAsString(budgets);

                entity.persist();
            }

            return Optional.of(
                    new UserPreferences(
                            entity.currency,
                            entity.monthlyIncome,
                            allocation,
                            budgets,
                            entity.fireEnabled,
                            entity.fireTargetCorpus));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
