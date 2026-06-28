package com.sudhi.financetracker.finance.domain.validation;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.sudhi.financetracker.finance.domain.plan.FinancialPlan;
import com.sudhi.financetracker.finance.model.Expense;

public class ExpenseCategoryValidator {

    public List<String> validate(FinancialPlan plan, List<Expense> expenses) {

        Set<String> categories = plan.categories().stream().map(c -> c.name()).collect(Collectors.toSet());
        return expenses.stream().map(Expense::getCategory).distinct().filter(category -> !categories.contains(category))
                .toList();
    }

}