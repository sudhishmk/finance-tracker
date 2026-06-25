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

  const save = async () => {
    if (!isValid) {
      alert("Allocation must total exactly 100%");
      return;
    }
  
    await fetch("http://localhost:8080/api/v1/preferences", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  
    onUpdated(form);
  };
  

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
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

<div
  style={{
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
    backgroundColor: isValid ? "#ecfdf5" : "#fef2f2",
    border: `1px solid ${isValid ? "#10b981" : "#ef4444"}`,
  }}
>
  <strong>Total Allocation: {totalAllocation.toFixed(2)}%</strong>

  {!isValid && (
    <div style={{ color: "#b91c1c", marginTop: 5 }}>
      Allocation must total exactly 100%
    </div>
  )}
</div>


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
        <div>
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

      <div style={{ marginTop: 20 }}>
        <button onClick={save}>Save Changes</button>
      </div>
    </div>
  );
}
