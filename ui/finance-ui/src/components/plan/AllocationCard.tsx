import { useState } from "react";

import type { Allocation, BudgetCategory } from "../../types";

import CategoryRow from "./CategoryRow";

interface Props {
  allocation: Allocation;

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

export default function AllocationCard({
  allocation,

  categories,

  editing,

  onAllocationChange,

  onCategoryChange,

  onAddCategory,
}: Props) {
  const [expanded, setExpanded] = useState(true);

  const categoryTotal = categories.reduce(
    (
      sum,

      category
    ) => sum + category.percentage,

    0
  );

  const valid = Math.abs(categoryTotal - 100) < 0.01;

  return (
    <div
      style={{
        background: "#FFFFFF",

        border: "1px solid #E2E8F0",

        borderRadius: 16,

        padding: 20,

        marginBottom: 20,

        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",

            gap: 12,

            alignItems: "center",
          }}
        >
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              border: "none",

              background: "transparent",

              cursor: "pointer",

              fontSize: 18,
            }}
          >
            {expanded ? "▼" : "▶"}
          </button>

          {editing ? (
            <input
              value={allocation.name}
              onChange={(e) =>
                onAllocationChange(
                  allocation.id,

                  "name",

                  e.target.value
                )
              }
            />
          ) : (
            <h4>{allocation.name}</h4>
          )}
        </div>

        {editing ? (
          <input
            type="number"
            value={allocation.percentage}
            onChange={(e) =>
              onAllocationChange(
                allocation.id,

                "percentage",

                Number(e.target.value)
              )
            }
            style={{
              width: 80,
            }}
          />
        ) : (
          <div
            style={{
              background: "#DBEAFE",

              borderRadius: 20,

              padding: "6px 12px",

              fontWeight: 600,
            }}
          >
            {allocation.percentage}%
          </div>
        )}
      </div>

      {expanded && (
        <>
          <div
            style={{
              marginTop: 16,

              borderTop: "1px solid #E2E8F0",

              paddingTop: 16,
            }}
          >
            {categories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
                editing={editing}
                onChange={onCategoryChange}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",

              justifyContent: "space-between",

              marginTop: 16,
            }}
          >
            <div
              style={{
                background: valid ? "#DCFCE7" : "#FEE2E2",

                color: valid ? "#166534" : "#991B1B",

                borderRadius: 20,

                padding: "6px 12px",

                fontSize: 13,
              }}
            >
              Categories {categoryTotal.toFixed(1)}%
            </div>

            {editing && (
              <button
                onClick={() => onAddCategory(allocation.id)}
                style={{
                  padding: "8px 14px",

                  borderRadius: 8,

                  border: "1px dashed #2563EB",

                  background: "transparent",

                  color: "#2563EB",

                  cursor: "pointer",
                }}
              >
                + Add Category
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
