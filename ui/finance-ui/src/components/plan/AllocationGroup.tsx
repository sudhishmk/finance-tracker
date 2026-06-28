import type { Allocation, BudgetCategory } from "../../types";

import AllocationCard from "./AllocationCard";

interface Props {
  title: string;

  allocations: Allocation[];

  categories: BudgetCategory[];

  editing: boolean;

  onAllocationChange: (
    id: string,

    field: string,

    value: string | number
  ) => void;

  onCategoryChange: (
    id: string,

    field: string,

    value: string | number
  ) => void;

  onAddCategory: (allocationId: string) => void;
}

export default function AllocationGroup({
  title,

  allocations,

  categories,

  editing,

  onAllocationChange,

  onCategoryChange,

  onAddCategory,
}: Props) {
  const total = allocations.reduce(
    (
      sum,

      allocation
    ) => sum + allocation.percentage,

    0
  );

  const valid = true; // total === 100;

  return (
    <div
      style={{
        marginBottom: 40,
      }}
    >
      <div
        style={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          marginBottom: 16,
        }}
      >
        <h2>{title}</h2>

        <div
          style={{
            background: valid ? "#DCFCE7" : "#FEE2E2",

            color: valid ? "#166534" : "#991B1B",

            borderRadius: 20,

            padding: "6px 12px",

            fontWeight: 600,
          }}
        >
          {total.toFixed(1)}%
        </div>
      </div>

      {allocations.map((allocation) => (
        <AllocationCard
          key={allocation.id}
          allocation={allocation}
          categories={categories.filter(
            (category) => category.allocationId === allocation.id
          )}
          editing={editing}
          onAllocationChange={onAllocationChange}
          onCategoryChange={onCategoryChange}
          onAddCategory={onAddCategory}
        />
      ))}
    </div>
  );
}
