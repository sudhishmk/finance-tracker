package com.sudhi.financetracker.finance.model;

import java.util.Map;

public class AccountAllocation {

    public static Map<String, Double> defaultAllocation() {
        return Map.of(
                "NORMAL", 50.0,
                "LONG_TERM_SAVINGS", 15.0,
                "RETIREMENT", 15.0,
                "PERSONAL_GROWTH", 10.0,
                "FUN", 5.0,
                "CONTRIBUTION", 5.0
        );
    }
}
