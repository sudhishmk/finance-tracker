package com.sudhi.financetracker.finance.domain.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.sudhi.financetracker.finance.domain.allocation.Allocation;
import com.sudhi.financetracker.finance.domain.category.BudgetCategory;
import com.sudhi.financetracker.finance.domain.plan.FinancialPlan;

public class FinancialPlanValidator {

    public ValidationResult validate(FinancialPlan plan) {

        List<String> errors = new ArrayList<>();
        validateAllocationTotals(plan, errors);

        validateCategoryMappings(plan, errors);

        validateCategoryTotals(plan, errors);

        return new ValidationResult(errors.isEmpty(), errors);

    }

    private void validateAllocationTotals(FinancialPlan plan, List<String> errors) {

        double total = plan.allocations().stream().filter(Allocation::enabled

        ).mapToDouble(Allocation::percentage).sum();

        if (Math.abs(total - 100) > 0.01) {

            errors.add("Allocation total must equal 100%");

        }

    }

    private void validateCategoryMappings(FinancialPlan plan, List<String> errors

    ) {

        List<String> allocationIds = plan.allocations().stream().map(Allocation::id).toList();

        plan.categories().forEach(category -> {
            if (!allocationIds.contains(category.allocationId())) {

                errors.add("Category " + category.id() + " mapped to unknown allocation"

                );

            }

        }

        );

    }

    private void validateCategoryTotals(FinancialPlan plan, List<String> errors) {

        Map<String, Double> totals = plan.categories().stream().filter(

                BudgetCategory::enabled)
                .collect(Collectors.groupingBy(BudgetCategory::allocationId, Collectors.summingDouble(

                        BudgetCategory::percentage))

                );

        totals.forEach((allocation, total) -> {

            if (Math.abs(total - 100) > 0.01) {

                errors.add(allocation + " categories must total 100%");

            }

        }

        );

    }

}