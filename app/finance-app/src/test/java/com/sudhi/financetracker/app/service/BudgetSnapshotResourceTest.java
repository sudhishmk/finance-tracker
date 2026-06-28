package com.sudhi.financetracker.app.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import com.sudhi.financetracker.app.rest.BudgetSnapshotResource;

class BudgetSnapshotResourceTest {

    @Test
    void shouldInstantiateResource() {

        BudgetSnapshotResource resource = new BudgetSnapshotResource();

        assertNotNull(resource);

    }

}