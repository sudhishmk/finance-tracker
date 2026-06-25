package com.sudhi.financetracker.finance.repository;

import com.sudhi.financetracker.finance.model.UserPreferences;

import java.util.Optional;

public interface UserPreferencesRepository {

    void save(UserPreferences preferences);

    Optional<UserPreferences> get();
}
