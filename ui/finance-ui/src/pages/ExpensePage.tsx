import { useEffect, useState } from "react";
import type { Preferences } from "../types";
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

  const symbol = getCurrencySymbol(preferences.currency);

  const fetchExpenses = async () => {
    const res = await fetch(
      `http://localhost:8080/api/v1/expenses?month=${month}`
    );
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    fetchExpenses();
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

    fetchExpenses();
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
    fetchExpenses();
  };

  const deleteExpense = async (id: number) => {
    await fetch(
      `http://localhost:8080/api/v1/expenses/${id}`,
      { method: "DELETE" }
    );
    fetchExpenses();
  };

  return (
    <div style={{ width: "100%" }}>
      <h2>💸 Expenses</h2>

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
