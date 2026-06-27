import { useState } from "react";
import type { Preferences } from "../types";

export default function SettingsPage({
  preferences,
  onUpdated,
}: {
  preferences: Preferences;
  onUpdated: (prefs: Preferences) => void;
}) {
  const [form, setForm] = useState(preferences);

  const totalAllocation = Object.values(form.allocation).reduce(
    (sum, val) => sum + val,
    0
  );

  const totalBudgetAllocation = Object.values(form.categoryBudgets ?? {})
    .filter(b => b.enabled)
    .reduce((sum, b) => sum + b.percentage, 0);

  const budgetValid = totalBudgetAllocation >= 99.9 && totalBudgetAllocation <= 100.1;

  const isValid = totalAllocation >= 99.9 && totalAllocation <= 100.1;


  const updateAllocation = (key: string, value: number) => {
    setForm({
      ...form,
      allocation: {
        ...form.allocation,
        [key]: value,
      },
    });
  };

  const updateBudget = (key: string, field: "percentage" | "enabled", value: number | boolean) => {
    setForm({
      ...form,
      categoryBudgets: {
        ...form.categoryBudgets,
        [key]: {
          ...form.categoryBudgets[key],
          [field]: value
        }
      }
    });
  };

  const save = async () => {
    if (!isValid || !budgetValid) {
      alert("Allocation must total exactly 100%");
      return;
    }

    await fetch("http://localhost:8080/api/v1/preferences", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onUpdated(form);
    alert("Preferences updated");
  };


  return (
    <div style={{ padding: 20, width: "90%" }}>
      <h2>⚙ Settings</h2>

      <h3>Currency</h3>
      <select
        value={form.currency}
        onChange={(e) =>
          setForm({ ...form, currency: e.target.value })
        }
      >
        <option value="INR">INR ₹</option>
        <option value="USD">USD $</option>
        <option value="EUR">EUR €</option>
      </select>

      <h3 style={{ marginTop: 20 }}>Monthly Income</h3>
      <input
        type="number"
        value={form.monthlyIncome}
        onChange={(e) =>
          setForm({
            ...form,
            monthlyIncome: Number(e.target.value),
          })
        }
      />

      <div style={{
        padding: 20,
        background: "#fff",
        borderRadius: 12,
        marginBottom: 24,
        marginTop: 24,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <h3 style={{ marginTop: 20 }}>Allocation (%)</h3>

        {Object.entries(form.allocation).map(([key, value]) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <label>{key}</label>
            <input
              type="number"
              value={value}
              onChange={(e) =>
                updateAllocation(key, Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 6,
          backgroundColor: isValid ? "#ecfdf5" : "#fef2f2",
          border: `1px solid ${isValid ? "#10b981" : "#ef4444"}`,
        }}
      >
        <strong>Allocation Total: {totalAllocation.toFixed(1)}%</strong>

        {!isValid && (
          <div style={{ color: "#b91c1c", marginTop: 5 }}>
            Allocation must total exactly 100%
          </div>
        )}
      </div>

      <div style={{
        padding: 20,
        background: "#fff",
        borderRadius: 12,
        marginBottom: 24,
        marginTop: 24,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        {/* Category Budgets*/}
        <h3 style={{ marginTop: 20 }}>
          Category Budgets (%)
        </h3>

        {Object.entries(
          form.categoryBudgets
        ).map(([key, budget]) => (

          <div
            key={key}
            style={{
              display: "grid",
              gridTemplateColumns: "220px 100px auto",
              gap: 12,
              alignItems: "center",
              marginBottom: 10
            }}
          >

            <div style={{ width: 180 }}>
              {key}
            </div>

            <input
              type="number"
              value={budget.percentage}
              onChange={(e) =>
                updateBudget(
                  key,
                  "percentage",
                  Number(e.target.value)
                )
              }
            />
            <label>
              <input
                type="checkbox"
                checked={budget.enabled}
                onChange={(e) =>
                  updateBudget(
                    key,
                    "enabled",
                    e.target.checked
                  )
                }
              />
              Enabled
            </label>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 6,
          background:
            budgetValid ? "#ecfdf5" : "#fef2f2",
          border: `1px solid ${budgetValid ? "#10b981" : "#ef4444"}`
        }}
      >
        <strong>
          Category Total: {totalBudgetAllocation.toFixed(1)}% </strong>
        {
          !budgetValid && (
            <div style={{ color: "#b91c1c" }} >
              Category budgets
              must total 100%
            </div>
          )
        }
      </div>
      {/* Fire settings */}
      <div style={{
        padding: 20,
        background: "#fff",
        borderRadius: 12,
        marginBottom: 24,
        marginTop: 24,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <h3 style={{ marginTop: 20 }}>FIRE Settings</h3>

        <label>
          <input
            type="checkbox"
            checked={form.fireEnabled}
            onChange={() =>
              setForm({
                ...form,
                fireEnabled: !form.fireEnabled,
              })
            }
          />
          Enable FIRE
        </label>

        {form.fireEnabled && (
          <div style={{
            padding: 20,
            background: "#fff",
            borderRadius: 12,
            marginBottom: 16,
            marginTop: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}>
            <input
              type="number"
              placeholder="Target Corpus"
              value={form.fireTargetCorpus || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  fireTargetCorpus: Number(e.target.value),
                })
              }
            />
          </div>
        )}
      </div>
      <div style={{ marginTop: 20, opacity: isValid && budgetValid ? 1 : 0.5, cursor: isValid && budgetValid ? "pointer" : "not-allowed" }}>
        <button onClick={save} disabled={!isValid || !budgetValid}>Save Changes</button>
      </div>
    </div>
  );
}
