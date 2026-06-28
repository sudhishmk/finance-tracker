import { useState } from "react";

import type { Preferences } from "../types";

import PlanView from "../components/plan/PlanView";

import { validatePlan } from "../utils/planValidation";

export default function SettingsPage({
  preferences,

  onUpdated,
}: {
  preferences: Preferences;

  onUpdated: (prefs: Preferences) => void;
}) {
  const [form, setForm] = useState(preferences);

  const validation = validatePlan(form.plan);

  const save = async () => {
    if (!validation.valid) {
      return;
    }
    await fetch("http://localhost:8080/api/v1/preferences", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    onUpdated(form);
    alert("Preferences updated");
  };

  return (
    <div
      style={{
        maxWidth: 1100,

        margin: "0 auto",

        padding: 24,
      }}
    >
      <h2>⚙ Settings</h2>

      <div
        style={{
          background: "#ffffff",

          border: "1px solid #E2E8F0",

          borderRadius: 16,

          padding: 24,

          marginBottom: 24,
        }}
      >
        <h3>Currency</h3>

        <select
          value={form.currency}
          onChange={(e) =>
            setForm({
              ...form,

              currency: e.target.value,
            })
          }
          style={{
            padding: 10,

            borderRadius: 8,

            border: "1px solid #CBD5E1",
          }}
        >
          <option value="INR">INR ₹</option>

          <option value="USD">USD $</option>

          <option value="EUR">EUR €</option>
        </select>
      </div>

      <div
        style={{
          background: "#ffffff",

          border: "1px solid #E2E8F0",

          borderRadius: 16,

          padding: 24,

          marginBottom: 24,
        }}
      >
        <PlanView
          plan={form.plan}
          onChange={(plan) =>
            setForm({
              ...form,

              plan,
            })
          }
        />
      </div>
      {!validation.valid && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            borderRadius: 12,
          }}
        >
          <h4>Validation Issues</h4>
          <ul>
            {validation.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div
        style={{
          background: "#ffffff",

          border: "1px solid #E2E8F0",

          borderRadius: 16,

          padding: 24,
        }}
      >
        <h3>FIRE Settings</h3>

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
          />{" "}
          Enable FIRE
        </label>

        {form.fireEnabled && (
          <div
            style={{
              marginTop: 16,
            }}
          >
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
              style={{
                padding: 10,

                borderRadius: 8,

                border: "1px solid #CBD5E1",
              }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: 24,

          display: "flex",

          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={save}
          disabled={!validation.valid}
          style={{
            background: validation.valid ? "#2563EB" : "#94A3B8",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            borderRadius: 8,
            cursor: validation.valid ? "pointer" : "not-allowed",
            opacity: validation.valid ? 1 : 0.6,
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
