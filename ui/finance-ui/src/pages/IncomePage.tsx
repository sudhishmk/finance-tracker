import { useEffect, useState } from "react";
import type { Preferences } from "../types";
import { formatCurrency } from "../utils/format";

type Income = {
  id: number;
  source: string;
  amount: number;
  date: string;
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

export default function IncomePage({
  preferences,
  month,
}: {
  preferences: Preferences;
  month: string;
}) {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [form, setForm] = useState({
    source: "",
    amount: "",
    date: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const symbol = getCurrencySymbol(preferences.currency);

  const fetchIncomes = async () => {
    const res = await fetch(
      `http://localhost:8080/api/v1/incomes?month=${month}`
    );
    const data = await res.json();
    setIncomes(data);
  };

  useEffect(() => {
    fetchIncomes();
  }, [month]);

  const addIncome = async () => {
    await fetch("http://localhost:8080/api/v1/incomes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: form.source,
        amount: Number(form.amount),
        date: form.date,
      }),
    });

    setForm({ source: "", amount: "", date: "" });
    fetchIncomes();
  };

  const updateIncome = async (id: number) => {
    await fetch(
      `http://localhost:8080/api/v1/incomes/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          incomes.find((i) => i.id === id)
        ),
      }
    );

    setEditingId(null);
    fetchIncomes();
  };

  const deleteIncome = async (id: number) => {
    await fetch(
      `http://localhost:8080/api/v1/incomes/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchIncomes();
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <h2>💰 Income</h2>

      {/* Month Selector */}
      <div style={{ marginBottom: 20 }}>
        <label>Select Month: </label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>

      {/* Add Income Card */}
      <div
        style={{
          padding: 20,
          borderRadius: 10,
          background: "#f8fafc",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          marginBottom: 30,
        }}
      >
        <h3>Add Income</h3>

        <input
          placeholder="Source"
          value={form.source}
          onChange={(e) =>
            setForm({ ...form, source: e.target.value })
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

        <button
          style={{ marginTop: 10 }}
          onClick={addIncome}
        >
          Add
        </button>
      </div>

      {/* Income Cards */}
      {incomes.map((income) => (
        <div
          key={income.id}
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
          {editingId === income.id ? (
            <>
              <input
                value={income.source}
                onChange={(e) =>
                  setIncomes((prev) =>
                    prev.map((i) =>
                      i.id === income.id
                        ? {
                            ...i,
                            source: e.target.value,
                          }
                        : i
                    )
                  )
                }
              />

              <input
                type="number"
                value={income.amount}
                onChange={(e) =>
                  setIncomes((prev) =>
                    prev.map((i) =>
                      i.id === income.id
                        ? {
                            ...i,
                            amount: Number(
                              e.target.value
                            ),
                          }
                        : i
                    )
                  )
                }
              />

              <button
                onClick={() =>
                  updateIncome(income.id)
                }
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div>
                <strong>{income.source}</strong>
                <div style={{ fontSize: 12 }}>
                  {income.date}
                </div>
              </div>

              <div>
                {formatCurrency(income.amount, preferences.currency)}
              </div>

              <div>
                <button
                  onClick={() =>
                    setEditingId(income.id)
                  }
                >
                  ✏
                </button>

                <button
                  onClick={() =>
                    deleteIncome(income.id)
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
