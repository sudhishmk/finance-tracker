import { useState, useMemo } from "react";

import type { FinancialPlan, BudgetCategory } from "../../types";

import AllocationGroup from "./AllocationGroup";

interface Props {
  plan: FinancialPlan;

  onChange: (plan: FinancialPlan) => void;
}

export default function PlanView({
  plan: initialPlan,

  onChange,
}: Props) {
  const [editing, setEditing] = useState(false);

  const [plan, setPlan] = useState(initialPlan);

  const spending = useMemo(
    () =>
      plan.allocations.filter((allocation) => allocation.type === "SPENDING"),

    [plan]
  );

  const investment = useMemo(
    () =>
      plan.allocations.filter((allocation) => allocation.type === "INVESTMENT"),

    [plan]
  );

  const spendingTotal = plan.allocations

    .filter((allocation) => allocation.type === "SPENDING")

    .reduce(
      (
        sum,

        allocation
      ) => sum + allocation.percentage,

      0
    );

  const investmentTotal = plan.allocations

    .filter((allocation) => allocation.type === "INVESTMENT")

    .reduce(
      (
        sum,

        allocation
      ) => sum + allocation.percentage,

      0
    );

  const updateAllocation = (
    id: string,

    field: string,

    value: string | number
  ) => {
    const allocations = plan.allocations.map((allocation) =>
      allocation.id === id
        ? {
            ...allocation,

            [field]: value,
          }
        : allocation
    );

    const updated = {
      ...plan,

      allocations,
    };

    setPlan(updated);

    onChange(updated);
  };

  const updateCategory = (
    id: string,

    field: string,

    value: string | number
  ) => {
    const categories = plan.categories.map((category) =>
      category.id === id
        ? {
            ...category,

            [field]: value,
          }
        : category
    );

    const updated = {
      ...plan,

      categories,
    };

    setPlan(updated);

    onChange(updated);
  };

  const addCategory = (allocationId: string) => {
    const category: BudgetCategory = {
      id: crypto.randomUUID(),

      name: "New Category",

      allocationId,

      percentage: 0,

      enabled: true,
    };

    const updated = {
      ...plan,

      categories: [...plan.categories, category],
    };

    setPlan(updated);

    onChange(updated);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          marginBottom: 32,
        }}
      >
        <div>
          <h2>📊 Financial Plan</h2>

          <div
            style={{
              color: "#64748B",
            }}
          >
            Manage your budgeting strategy
          </div>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          style={{
            padding: "10px 18px",

            borderRadius: 8,

            border: "none",

            background: editing ? "#DC2626" : "#2563EB",

            color: "white",

            cursor: "pointer",
          }}
        >
          {editing ? "Done" : "Edit"}
        </button>
      </div>

      <div
        style={{
          display: "flex",

          gap: 16,

          marginBottom: 32,
        }}
      >
        <div
          style={{
            background: "#DCFCE7",

            padding: "12px 18px",

            borderRadius: 12,

            fontWeight: 600,
          }}
        >
          💸 Spending {spendingTotal.toFixed(1)}%
        </div>

        <div
          style={{
            background: "#DBEAFE",

            padding: "12px 18px",

            borderRadius: 12,

            fontWeight: 600,
          }}
        >
          📈 Investment {investmentTotal.toFixed(1)}%
        </div>
      </div>

      <AllocationGroup
        title={"💸 Spending"}
        allocations={spending}
        categories={plan.categories}
        editing={editing}
        onAllocationChange={updateAllocation}
        onCategoryChange={updateCategory}
        onAddCategory={addCategory}
      />

      <AllocationGroup
        title={`📈 Investment`}
        allocations={investment}
        categories={plan.categories}
        editing={editing}
        onAllocationChange={updateAllocation}
        onCategoryChange={updateCategory}
        onAddCategory={addCategory}
      />
    </div>
  );
}
