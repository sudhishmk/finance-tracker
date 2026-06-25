package com.sudhi.financetracker.app.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sudhi.financetracker.app.persistence.UserPreferencesEntity;
import com.sudhi.financetracker.finance.model.UserPreferences;
import com.sudhi.financetracker.finance.repository.UserPreferencesRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

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
            Map<String, Double> allocation =
                    mapper.readValue(entity.allocationJson, Map.class);

            return Optional.of(
                    new UserPreferences(
                            entity.currency,
                            entity.monthlyIncome,
                            allocation,
                            entity.fireEnabled,
                            entity.fireTargetCorpus
                    )
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
