import { useEffect, useState } from "react";
import type { Preferences, BudgetStatusResponse } from "../types";
import { formatCurrency } from "../utils/format";

type Expense = {
  id: number;
  item: string;
  amount: number;
  date: string;
  category: string;
  paymentMode: string;
  account: string;
  valueScore: number;
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

const CATEGORIES = [
  "Food",
  "Rent",
  "Travel",
  "Utilities",
  "Personal Growth",
  "Fun",
  "Health",
  "Other",
];


const PAYMENT_MODES = ["Cash", "Online", "Credit Card"];

export default function ExpensePage({
  preferences,
  month,
}: {
  preferences: Preferences;
  month: string;
}) {

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<BudgetStatusResponse | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    item: "",
    amount: "",
    date: "",
    category: "Food",
    paymentMode: "Cash",
    account: "NORMAL",
    valueScore: 5,
  });


  const fetchBudget = async () => {
    const res = await fetch(
      `http://localhost:8080/api/v1/budget/status?month=${month}`
    );
    const data =
      await res.json();
    setBudget(data);
  };

  const fetchExpenses = async () => {
    const res = await fetch(
      `http://localhost:8080/api/v1/expenses?month=${month}`
    );
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
    fetchBudget();
  }, [month]);

  const addExpense = async () => {
    await fetch("http://localhost:8080/api/v1/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: form.item,
        amount: Number(form.amount),
        date: form.date,
        category: form.category,
        account: form.account,
        paymentMode: form.paymentMode,
        valueScore: Number(form.valueScore),
      }),
    });

    setForm({
      item: "",
      amount: "",
      date: "",
      category: "Food",
      account: "NORMAL",
      paymentMode: "Cash",
      valueScore: 5,
    });

    await fetchExpenses();
    await fetchBudget();
  };

  const updateExpense = async (id: number) => {
    const expense = expenses.find((e) => e.id === id);
    if (!expense) return;

    await fetch(
      `http://localhost:8080/api/v1/expenses/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      }
    );

    setEditingId(null);
    await fetchExpenses();
    await fetchBudget();
  };

  const deleteExpense = async (id: number) => {
    await fetch(
      `http://localhost:8080/api/v1/expenses/${id}`,
      { method: "DELETE" }
    );
    await fetchExpenses();
    await fetchBudget();
  };

  const cardStyle = {
    padding: 16,
    borderRadius: 12,
    background: "#fff",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.05)"
  };

  const getBudgetColor = (status: string) => {
    switch (status) {
      case "OVER":
        return "#dc2626";
      case "WARNING":
        return "#f59e0b";
      default:
        return "#16a34a";
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h2>💸 Expenses</h2>
      {budget && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16,
            marginBottom: 24
          }}
        >
          <div style={cardStyle}>
            <h4>Budget</h4>
            <p>
              {formatCurrency(
                budget.totalBudget,
                preferences.currency
              )}
            </p>
          </div>
          <div style={cardStyle}>
            <h4>Spent</h4>
            <p>
              {formatCurrency(
                budget.totalSpent,
                preferences.currency
              )}
            </p>
          </div>
          <div style={cardStyle}>
            <h4>Remaining</h4>
            <p>
              {formatCurrency(
                budget.remaining,
                preferences.currency
              )}
            </p>
          </div>
          <div style={cardStyle}>
            <h4>Utilization</h4>
            <p>
              {budget.utilization.toFixed(1)}%
            </p>
          </div>
        </div>
      )}

      {/* BUdget SUmmary */}

      {budget?.categories?.map(c => (
        <div key={c.category}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>

            <strong>{c.category}</strong>

            <span style={{
              background:
                c.status === "OVER"
                  ? "#fee2e2"
                  : c.status === "WARNING"
                    ? "#fef3c7"
                    : "#dcfce7",

              color:
                c.status === "OVER"
                  ? "#dc2626"
                  : c.status === "WARNING"
                    ? "#d97706"
                    : "#16a34a",

              padding: "2px 8px",
              borderRadius: 12,
              fontSize: 11,
              fontWeight: 600
            }}>
              {c.status}
            </span>

          </div>
          <div>
            {formatCurrency(c.spent, preferences.currency)}
            /
            {formatCurrency(c.budget, preferences.currency)}
          </div>
          <div style={{
            marginTop: 6,
            height: 8,
            background: "#e5e7eb",
            borderRadius: 8,
            overflow: "hidden"
          }}>

            <div style={{
              width: `${Math.min(c.utilization, 100)}%`,
              height: "100%",
              background:
                c.status === "OVER"
                  ? "#dc2626"
                  : c.status === "WARNING"
                    ? "#f59e0b"
                    : "#16a34a",
              transition: "width 0.3s ease"
            }} />

          </div>

          <div style={{
            marginTop: 4,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "#64748b"
          }}>

            <span>
              Remaining {formatCurrency(c.remaining, preferences.currency)}
            </span>

            <span>
              {c.utilization.toFixed(1)}%
            </span>

          </div>



        </div>
      ))}

      {/* Add Expense Card */}
      <div
        style={{
          padding: 20,
          borderRadius: 10,
          background: "#f8fafc",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          marginBottom: 30,
        }}
      >
        <h3>Add Expense</h3>

        <input
          placeholder="Item"
          value={form.item}
          onChange={(e) =>
            setForm({ ...form, item: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          {CATEGORIES.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={form.account}
          onChange={(e) =>
            setForm({ ...form, account: e.target.value })
          }
        >
          {Object.keys(preferences.allocation).map((acc) => (
            <option key={acc}>{acc}</option>
          ))}
        </select>

        <select
          value={form.paymentMode}
          onChange={(e) =>
            setForm({
              ...form,
              paymentMode: e.target.value,
            })
          }
        >
          {PAYMENT_MODES.map((mode) => (
            <option key={mode}>{mode}</option>
          ))}
        </select>

        <label>
          Value Score: {form.valueScore}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={form.valueScore}
          onChange={(e) =>
            setForm({
              ...form,
              valueScore: Number(e.target.value),
            })
          }
        />

        <button
          style={{ marginTop: 10 }}
          onClick={addExpense}
        >
          Add
        </button>
      </div>

      {/* Expense Cards */}
      {expenses.map((expense) => (
        <div
          key={expense.id}
          style={{
            padding: 16,
            borderRadius: 10,
            background: "white",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
            marginBottom: 15,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {editingId === expense.id ? (
            <>
              <input
                type="date"
                value={expense.date}
                onChange={(e) =>
                  setExpenses((prev) =>
                    prev.map((ex) =>
                      ex.id === expense.id
                        ? { ...ex, date: e.target.value }
                        : ex
                    )
                  )
                }
              />

              <input
                value={expense.item}
                onChange={(e) =>
                  setExpenses((prev) =>
                    prev.map((ex) =>
                      ex.id === expense.id
                        ? { ...ex, item: e.target.value }
                        : ex
                    )
                  )
                }
              />

              <input
                type="number"
                value={expense.amount}
                onChange={(e) =>
                  setExpenses((prev) =>
                    prev.map((ex) =>
                      ex.id === expense.id
                        ? { ...ex, amount: Number(e.target.value) }
                        : ex
                    )
                  )
                }
              />

              <select
                value={expense.category}
                onChange={(e) =>
                  setExpenses((prev) =>
                    prev.map((ex) =>
                      ex.id === expense.id
                        ? { ...ex, category: e.target.value }
                        : ex
                    )
                  )
                }
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={expense.account}
                onChange={(e) =>
                  setExpenses((prev) =>
                    prev.map((ex) =>
                      ex.id === expense.id
                        ? { ...ex, account: e.target.value }
                        : ex
                    )
                  )
                }
              >
                {Object.keys(preferences.allocation).map((acc) => (
                  <option key={acc}>{acc}</option>
                ))}
              </select>

              <select
                value={expense.paymentMode}
                onChange={(e) =>
                  setExpenses((prev) =>
                    prev.map((ex) =>
                      ex.id === expense.id
                        ? { ...ex, paymentMode: e.target.value }
                        : ex
                    )
                  )
                }
              >
                {PAYMENT_MODES.map((mode) => (
                  <option key={mode}>{mode}</option>
                ))}
              </select>

              <div>
                Value: {expense.valueScore}
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={expense.valueScore}
                  onChange={(e) =>
                    setExpenses((prev) =>
                      prev.map((ex) =>
                        ex.id === expense.id
                          ? {
                            ...ex,
                            valueScore: Number(e.target.value),
                          }
                          : ex
                      )
                    )
                  }
                />
              </div>

              <button
                onClick={() =>
                  updateExpense(expense.id)
                }
              >
                Save
              </button>

              <button onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <div>
                <strong>{expense.item}</strong>
                <div style={{ fontSize: 12 }}>
                  {expense.date}
                </div>
                <div style={{ fontSize: 12 }}>
                  {expense.category} •{" "}
                  {expense.paymentMode}
                </div>
                <div style={{ fontSize: 12 }}>
                  Value: {expense.valueScore}/10
                </div>
              </div>

              <div>
                {formatCurrency(expense.amount, preferences.currency)}
              </div>

              <div>
                <button
                  onClick={() =>
                    setEditingId(expense.id)
                  }
                >
                  ✏
                </button>
                <button
                  onClick={() =>
                    deleteExpense(expense.id)
                  }
                >
                  🗑
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
