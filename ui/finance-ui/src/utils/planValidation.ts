import type { FinancialPlan } from "../types";

export interface ValidationResult {
  valid: boolean;

  errors: string[];
}

const isHundred = (value: number) => Math.abs(value - 100) < 0.01;

export function validatePlan(plan: FinancialPlan): ValidationResult {
  const errors: string[] = [];

  const allocationTotal = plan.allocations.reduce(
    (
      sum,

      allocation
    ) => sum + allocation.percentage,

    0
  );

  if (!isHundred(allocationTotal)) {
    errors.push(`Allocations total ${allocationTotal.toFixed(1)}%`);
  }

  plan.allocations.forEach((allocation) => {
    const categories = plan.categories.filter(
      (category) => category.allocationId === allocation.id
    );

    if (categories.length === 0) {
      return;
    }

    const total = categories.reduce(
      (
        sum,

        category
      ) => sum + category.percentage,

      0
    );

    if (!isHundred(total)) {
      errors.push(`${allocation.name} categories total ${total.toFixed(1)}%`);
    }
  });

  return {
    valid: errors.length === 0,

    errors,
  };
}
