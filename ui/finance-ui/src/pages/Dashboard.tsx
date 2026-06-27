import { useEffect, useState } from "react";
import AllocationChart from "../components/AllocationChart";
import BudgetChart from "../components/BudgetChart";
import type { Preferences } from "../types";
import { formatCurrency, formatPercent } from "../utils/format";


type Summary = {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  savingsRate: number;
  highValueSpend: number;
  lowValueSpend: number;
  topSpendingCategory: string;
};

type CategoryBudget = {
  category: string;
  budget: number;
  spent: number;
  remaining: number;
  utilization: number;
  status: string;
};

type BudgetResponse = {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  utilization: number;
  categories: CategoryBudget[];
};




function getCurrencySymbol(currency: string) {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return "₹";
  }
}

function Card({
  title,
  value,
  highlight,
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        padding: "18px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        minWidth: "220px",
        flex: "1",
        border: highlight ? "2px solid #16a34a" : "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontSize: "14px", color: "#6b7280" }}>{title}</div>
      <div style={{ fontSize: "22px", fontWeight: 600 }}>{value}</div>
    </div>
  );
}

export default function Dashboard({
  preferences,
  month,
}: {
  preferences: Preferences;
  month: string;
}) {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [budgetData, setBudgetData] = useState<BudgetResponse | null>(null);


  const symbol = getCurrencySymbol(preferences.currency);

  const fetchSummary = async (selectedMonth: string) => {
    setLoading(true);

    const summaryRes = await fetch(
      `http://localhost:8080/api/v1/summary?month=${selectedMonth}`
    );
    const summaryData = await summaryRes.json();
    setSummary(summaryData);

    const budgetRes = await fetch(
      `http://localhost:8080/api/v1/budget/status?month=${selectedMonth}`
    );
    const budget = await budgetRes.json();
    setBudgetData(budget);

    setLoading(false);
  };


  useEffect(() => {
    fetchSummary(month);
  }, [month]);

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>📊 Monthly Dashboard</h2>


      {loading && <div>Loading...</div>}

      {summary && !loading && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
              marginBottom: 24,
            }}
          >
            <Card
              title="Total Income"
              value={`${formatCurrency(summary.totalIncome, preferences.currency)
                }`}
            />
            <Card
              title="Total Expenses"
              value={`${formatCurrency(summary.totalExpenses, preferences.currency)}`}
            />
            <Card
              title="Savings"
              value={`${formatCurrency(summary.savings, preferences.currency)}`}
              highlight
            />
            <Card
              title="Savings Rate"
              value={`${formatPercent(summary.savingsRate)
                }`}
            />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginBottom: 24,
          }}>
            <Card
              title="High Value Spend"
              value={`${formatCurrency(summary.highValueSpend, preferences.currency)}`}
            />
            <Card
              title="Low Value Spend"
              value={`${formatCurrency(summary.lowValueSpend, preferences.currency)}`}
            />
            <Card
              title="Top Category"
              value={summary.topSpendingCategory}
            />
          </div>
        </>
      )}
      <div style={{ marginTop: "40px" }}>
        <AllocationChart preferences={preferences} />
      </div>
      <Card
        title="Budget"
        value={formatCurrency(
          budgetData?.totalBudget ?? 0,
          preferences.currency
        )}
      />

      <Card
        title="Spent"
        value={formatCurrency(
          budgetData?.totalSpent ?? 0,
          preferences.currency
        )}
      />

      <Card
        title="Remaining"
        value={formatCurrency(
          budgetData?.remaining ?? 0,
          preferences.currency
        )}
      />

      <Card
        title="Utilization"
        value={`${budgetData?.utilization ?? 0}%`}
      />
      <div style={{ marginTop: "40px" }}>
        <BudgetChart data={budgetData?.categories ?? []} currencySymbol={symbol} />
      </div>

    </div>
  );
}
