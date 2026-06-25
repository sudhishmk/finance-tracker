import type { Preferences } from "../types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#16a34a",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export default function AllocationChart({
  preferences,
}: {
  preferences: Preferences;
}) {
  const data = Object.entries(preferences.allocation).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  );

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ marginBottom: "10px" }}>Allocation Breakdown</h3>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
