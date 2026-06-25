package com.sudhi.financetracker.app.rest;

import com.sudhi.financetracker.finance.model.UserPreferences;
import com.sudhi.financetracker.finance.repository.UserPreferencesRepository;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/api/v1/preferences")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PreferencesResource {

    private final UserPreferencesRepository repository;

    public PreferencesResource(UserPreferencesRepository repository) {
        this.repository = repository;
    }

    @POST
    public void save(UserPreferences preferences) {
        repository.save(preferences);
    }

    @GET
    public UserPreferences get() {
        return repository.get().orElse(null);
    }

    @PUT
    public void update(UserPreferences preferences) {
        repository.save(preferences);
    }

}
