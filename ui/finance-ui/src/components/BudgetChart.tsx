import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import type { CategorySnapshot } from "../types";

export default function BudgetChart({
  data,

  currencySymbol,
}: {
  data: CategorySnapshot[];

  currencySymbol: string;
}) {
  if (data.length === 0) {
    return (
      <div
        style={{
          padding: 20,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <h3>Budget vs Actual</h3>

        <div
          style={{
            padding: 24,
            textAlign: "center",
            color: "#64748b",
          }}
        >
          No budget data available
        </div>
      </div>
    );
  }

  const chartData = data.map((category) => ({
    category: category.name,

    budget: category.budget,

    spent: category.spent,
  }));

  return (
    <div
      style={{
        width: "100%",

        height: 400,
      }}
    >
      <h3>Budget vs Actual</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="category" />

          <YAxis />

          <Tooltip
            formatter={(value: number) =>
              `${currencySymbol}${value.toLocaleString()}`
            }
          />

          <Legend />

          <Bar dataKey="budget" fill="#3b82f6" name="Budget" />

          <Bar dataKey="spent" fill="#ef4444" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
