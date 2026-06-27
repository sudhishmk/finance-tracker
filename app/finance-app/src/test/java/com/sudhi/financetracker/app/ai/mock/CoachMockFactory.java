package com.sudhi.financetracker.app.ai.mock;

import java.util.List;

import com.sudhi.finance.analytics.ai.coach.model.CoachRequest;
import com.sudhi.finance.analytics.ai.coach.model.FinancialSnapshot;

public final class CoachMockFactory {

    private CoachMockFactory() {}

    public static CoachRequest sample() {

        FinancialSnapshot snapshot = new FinancialSnapshot(
            100000.0,
            70000.0,
            30000.0,
            10.0,
            "Food",
            70.0,
            20000000.0,
            List.of(
                    "Food spending reached 92%",
                    "Savings remain healthy",
                    "Retirement contribution improved"
            )
    );

        return new CoachRequest(
            snapshot
        );

         }
}