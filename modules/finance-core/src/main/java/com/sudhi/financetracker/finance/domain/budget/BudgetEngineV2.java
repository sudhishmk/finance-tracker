package com.sudhi.financetracker.finance.domain.budget;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.sudhi.financetracker.finance.domain.allocation.Allocation;
import com.sudhi.financetracker.finance.domain.allocation.AllocationType;
import com.sudhi.financetracker.finance.domain.category.BudgetCategory;
import com.sudhi.financetracker.finance.domain.plan.FinancialPlan;
import com.sudhi.financetracker.finance.domain.validation.FinancialPlanValidator;
import com.sudhi.financetracker.finance.domain.validation.ValidationResult;
import com.sudhi.financetracker.finance.model.Expense;

public class BudgetEngineV2 {

    private final AllocationCalculator allocationCalculator = new AllocationCalculator();

    private final CategoryCalculator categoryCalculator = new CategoryCalculator();

    private final FinancialPlanValidator validator = new FinancialPlanValidator();

    public BudgetSnapshot calculate(FinancialPlan plan, double income, List<Expense> expenses) {

        ValidationResult result = validator.validate(plan);

        if (!result.valid()) {

            throw new IllegalArgumentException(String.join(", ", result.errors()));

        }

        Map<String, Allocation> allocations = plan.allocations().stream()
                .collect(Collectors.toMap(Allocation::id, a -> a));

        Map<String, Double> categorySpent = categorySpent(expenses);

        List<CategorySnapshot> categorySnapshots = plan.categories().stream()
                .filter(BudgetCategory::enabled)
                .map(category -> {
                    Allocation allocation = allocations.get(category.allocationId());

                    double allocationBudget = allocationCalculator.calculate(income, allocation);

                    double categoryBudget = categoryCalculator.calculate(allocationBudget, category);

                    double spent = categorySpent.getOrDefault(category.name(), 0.0);

                    double remaining = categoryBudget - spent;

                    double utilization = categoryBudget == 0 ? 0 : spent * 100 / categoryBudget;

                    return new CategorySnapshot(category.id(), category.name(), category.allocationId(), categoryBudget,
                            spent, remaining, utilization);
                }).toList();

        Map<String, Double> allocationSpent = categorySnapshots.stream()
                .collect(Collectors.groupingBy(CategorySnapshot::allocationId,
                        Collectors.summingDouble(CategorySnapshot::spent)));

        List<AllocationSnapshot> allocationSnapshots = plan.allocations().stream().filter(Allocation::enabled)
                .map(allocation -> {
                    double budget = allocationCalculator.calculate(income, allocation);

                    double spent = allocationSpent.getOrDefault(allocation.id(), 0.0);

                    double remaining = budget - spent;

                    double utilization = budget == 0 ? 0 : spent * 100 / budget;

                    return new AllocationSnapshot(allocation.id(), allocation.name(), budget, spent, remaining,
                            utilization);
                }).toList();

        double spendingPool = allocationSnapshots.stream()
                .filter(snapshot -> allocations.get(snapshot.id()).type() == AllocationType.SPENDING)
                .mapToDouble(AllocationSnapshot::budget).sum();

        double investmentPool = allocationSnapshots.stream()
                .filter(snapshot -> allocations.get(snapshot.id()).type() == AllocationType.INVESTMENT)
                .mapToDouble(AllocationSnapshot::budget).sum();

        return new BudgetSnapshot(income, spendingPool, investmentPool, allocationSnapshots, categorySnapshots);

    }

    private Map<String, Double> categorySpent(List<Expense> expenses) {

        return expenses.stream()
                .collect(Collectors.groupingBy(Expense::getCategory, Collectors.summingDouble(Expense::getAmount)));

    }

}