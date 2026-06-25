import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  type BudgetItem = {
    account: string;
    allocated: number;
    spent: number;
    variance: number;
  };
  
  export default function BudgetChart({
    data,
    currencySymbol,
  }: {
    data: BudgetItem[];
    currencySymbol: string;
  }) {
    return (
      <div style={{ width: "100%", height: 350 }}>
        <h3 style={{ marginBottom: "10px" }}>
          Budget vs Actual
        </h3>
  
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="account" />
            <YAxis />
            <Tooltip
              formatter={(value: number) =>
                `${currencySymbol}${value.toLocaleString()}`
              }
            />
            <Legend />
            <Bar dataKey="allocated" fill="#3b82f6" name="Allocated" />
            <Bar dataKey="spent" fill="#ef4444" name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  