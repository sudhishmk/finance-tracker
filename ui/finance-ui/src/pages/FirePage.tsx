import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Preferences } from "../types";
import MetricCard from "../components/MetricCard";
import FireTrajectoryChart from "../components/FireTrajectoryChart";
import { formatCurrency } from "../utils/format";

type FireResult = {
  currentAnnualExpense: number;
  requiredCorpus: number;
  projectedCorpus: number;
  yearsToFire: number;
  progressPercent: number;
  yearlyCorpus: { year: number; corpus: number }[];
};

type AnnualExpenseSource =
  | "SELECTED_MONTH"
  | "LAST_6_MONTHS"
  | "LAST_12_MONTHS"
  | "MANUAL";

export default function FirePage({
  preferences,
  month,
}: {
  preferences: Preferences;
  month: string;
}) {
  const navigate = useNavigate();

  const [result, setResult] =
    useState<FireResult | null>(null);

  const [currentCorpus, setCurrentCorpus] =
    useState(0);

  const [returnRate, setReturnRate] =
    useState(10);

  const [inflation, setInflation] =
    useState(6);

  const [multiplier, setMultiplier] =
    useState(25);

  const [expenseSource, setExpenseSource] =
    useState<AnnualExpenseSource>(
      "SELECTED_MONTH"
    );

  const [
    manualAnnualExpense,
    setManualAnnualExpense,
  ] = useState(0);

  const loadProjection = async () => {
    try {
      const url =
        `http://localhost:8080/api/v1/fire/projection` +
        `?month=${month}` +
        `&currentCorpus=${currentCorpus}` +
        `&returnRate=${returnRate}` +
        `&inflation=${inflation}` +
        `&multiplier=${multiplier}` +
        `&expenseSource=${expenseSource}` +
        `&manualAnnualExpense=${manualAnnualExpense}`;

      const res = await fetch(url);

      if (!res.ok) {
        setResult(null);
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult(null);
    }
  };

  useEffect(() => {
    loadProjection();
  }, [
    month,
    currentCorpus,
    returnRate,
    inflation,
    multiplier,
    expenseSource,
    manualAnnualExpense,
  ]);

  return (
    <div style={{ width: "100%" }}>
      <h2>🔥 Wealth & FIRE Overview</h2>
  
      {/* Advanced Simulation */}
  
      {result && result.currentAnnualExpense > 0 && (
        <button
          style={{ marginBottom: 20 }}
          onClick={() =>
            navigate("/fire/simulation", {
              state: {
                currentCorpus,
                annualReturn: returnRate,
                inflation,
                annualExpense:
                  result.currentAnnualExpense,
              },
            })
          }
        >
          Run Advanced Simulation
        </button>
      )}
  
      {/* Assumptions */}
  
      <div
        style={{
          background: "#ffffff",
          borderRadius: 12,
          padding: 24,
          boxShadow:
            "0 2px 8px rgba(0,0,0,.08)",
          marginBottom: 30,
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          Assumptions
        </h3>
  
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: 20,
          }}
        >
          <div>
            <label>Current Corpus</label>
  
            <input
              type="number"
              value={currentCorpus}
              onChange={(e) =>
                setCurrentCorpus(
                  Number(e.target.value)
                )
              }
              style={{ width: "100%" }}
            />
          </div>
  
          <div>
            <label>Expected Return (%)</label>
  
            <input
              type="number"
              value={returnRate}
              onChange={(e) =>
                setReturnRate(
                  Number(e.target.value)
                )
              }
              style={{ width: "100%" }}
            />
          </div>
  
          <div>
            <label>Inflation (%)</label>
  
            <input
              type="number"
              value={inflation}
              onChange={(e) =>
                setInflation(
                  Number(e.target.value)
                )
              }
              style={{ width: "100%" }}
            />
          </div>
  
          <div>
            <label>FIRE Multiplier</label>
  
            <input
              type="number"
              value={multiplier}
              onChange={(e) =>
                setMultiplier(
                  Number(e.target.value)
                )
              }
              style={{ width: "100%" }}
            />
          </div>
  
          <div>
            <label>
              Annual Expense Source
            </label>
  
            <select
              value={expenseSource}
              onChange={(e) =>
                setExpenseSource(
                  e.target
                    .value as AnnualExpenseSource
                )
              }
              style={{ width: "100%" }}
            >
              <option value="SELECTED_MONTH">
                Selected Month × 12
              </option>
  
              <option value="LAST_6_MONTHS">
                Average of Last 6 Months
              </option>
  
              <option value="LAST_12_MONTHS">
                Average of Last 12 Months
              </option>
  
              <option value="MANUAL">
                Manual Annual Expense
              </option>
            </select>
          </div>
  
          {expenseSource === "MANUAL" && (
            <div>
              <label>
                Manual Annual Expense
              </label>
  
              <input
                type="number"
                value={manualAnnualExpense}
                onChange={(e) =>
                  setManualAnnualExpense(
                    Number(e.target.value)
                  )
                }
                style={{ width: "100%" }}
              />
            </div>
          )}
        </div>
  
        <div
          style={{
            marginTop: 24,
          }}
        >
          <button
            onClick={loadProjection}
          >
            Recalculate Projection
          </button>
        </div>
      </div>
  

    {/* Result Snapshot */}

    {result && result.currentAnnualExpense > 0 ? (
      <div style={{ marginBottom: 30 }}>

        {/* Annual Expense Banner */}

        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            padding: 16,
            borderRadius: 10,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#475569",
            }}
          >
            Annual Expense Used
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#1e3a8a",
            }}
          >
            {formatCurrency(
              result.currentAnnualExpense,
              preferences.currency
            )}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#64748b",
              marginTop: 6,
            }}
          >
            Source :
            {" "}
            {expenseSource === "SELECTED_MONTH" &&
              "Selected Month × 12"}

            {expenseSource === "LAST_6_MONTHS" &&
              "Average of Last 6 Months"}

            {expenseSource === "LAST_12_MONTHS" &&
              "Average of Last 12 Months"}

            {expenseSource === "MANUAL" &&
              "Manual Entry"}
          </div>
        </div>

        {/* KPI Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <MetricCard
            title="Required Corpus"
            value={formatCurrency(
              result.requiredCorpus,
              preferences.currency
            )}
          />

          <MetricCard
            title="Projected Corpus"
            value={formatCurrency(
              result.projectedCorpus,
              preferences.currency
            )}
          />

          <MetricCard
            title="Years to FIRE"
            value={
              result.yearsToFire === -1
                ? "Not Reachable"
                : result.yearsToFire
            }
          />

          <MetricCard
            title="Progress"
            value={`${Number(
              result.progressPercent
            ).toFixed(1)} %`}
          />
        </div>

        {/* Projection Chart */}

        {result.yearlyCorpus.length > 0 && (
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: 20,
              boxShadow:
                "0 2px 8px rgba(0,0,0,.08)",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              FIRE Growth Projection
            </h3>

            <FireTrajectoryChart
              data={result.yearlyCorpus}
            />
          </div>
        )}
      </div>
    ) : result ? (

      /* Empty State */

      <div
        style={{
          background: "#fff7ed",
          border: "1px solid #fed7aa",
          borderRadius: 12,
          padding: 32,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 48,
            marginBottom: 12,
          }}
        >
          📊
        </div>

        <h3
          style={{
            marginTop: 0,
          }}
        >
          No Financial Data Available
        </h3>

        <p
          style={{
            color: "#57534e",
            marginBottom: 8,
          }}
        >
          No expense data was found for
          <strong> {month}</strong>.
        </p>

        <p
          style={{
            color: "#78716c",
            fontSize: 14,
          }}
        >
          Select another month,
          choose
          <strong>
            {" "}Average of Last 6 Months
          </strong>,
          <strong>
            {" "}Average of Last 12 Months
          </strong>,
          or enter a
          <strong>
            {" "}Manual Annual Expense
          </strong>.
        </p>
      </div>

    ) : (

      <div>Loading...</div>

    )}
  </div>
);
}
