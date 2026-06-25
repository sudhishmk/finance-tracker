package com.sudhi.financetracker.fire.model;

import java.util.List;

public record FireFullSimulationResponse(
    List<FireAccumulationRow> accumulationTable,
    List<FireWithdrawalRow> withdrawalTable,
    double corpusAtFireAge,
    boolean fireReady
) {}

