import { useEffect, useState } from "react";
import type { Preferences } from "../types";
import MetricCard from "../components/MetricCard";
import FireTrajectoryChart from "../components/FireTrajectoryChart";
import { useNavigate } from "react-router-dom";

type FireResult = {
  currentAnnualExpense: number;
  requiredCorpus: number;
  projectedCorpus: number;
  yearsToFire: number;
  progressPercent: number;
  yearlyCorpus: { year: number; corpus: number }[];
};

function getCurrentMonth() {
  return new Date().toISOString().slice(0, 7);
}

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

export default function FirePage({
  preferences,
}: {
  preferences: Preferences;
}) {
  const navigate = useNavigate();
  const [month] = useState(getCurrentMonth());
  const [result, setResult] = useState<FireResult | null>(null);

  const [currentCorpus, setCurrentCorpus] =
    useState(0);
  const [returnRate, setReturnRate] =
    useState(10);
  const [inflation, setInflation] =
    useState(6);
  const [multiplier, setMultiplier] =
    useState(25);

  const symbol = getCurrencySymbol(
    preferences.currency
  );

  const loadProjection = async () => {
    const res = await fetch(
      `http://localhost:8080/api/v1/fire/projection?month=${month}&currentCorpus=${currentCorpus}&returnRate=${returnRate}&inflation=${inflation}&multiplier=${multiplier}`
    );

    const data = await res.json();
    setResult(data);
  };

  useEffect(() => {
    loadProjection();
  }, []);

  return (
    <div style={{ maxWidth: 900 }}>
      <h2>🔥 Wealth & FIRE Overview</h2>

      {/* Advanced Simulation Button */}
      {result && (
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

      {/* Assumptions Panel */}
      <div
        style={{
          padding: 20,
          borderRadius: 10,
          background: "#f8fafc",
          marginBottom: 30,
        }}
      >
        <h3>Assumptions</h3>

        <div>
          <label>Current Corpus </label>
          <input
            type="number"
            value={currentCorpus}
            onChange={(e) =>
              setCurrentCorpus(
                Number(e.target.value)
              )
            }
          />
        </div>

        <div>
          <label>Expected Return % </label>
          <input
            type="number"
            value={returnRate}
            onChange={(e) =>
              setReturnRate(
                Number(e.target.value)
              )
            }
          />
        </div>

        <div>
          <label>Inflation % </label>
          <input
            type="number"
            value={inflation}
            onChange={(e) =>
              setInflation(
                Number(e.target.value)
              )
            }
          />
        </div>

        <div>
          <label>FIRE Multiplier </label>
          <input
            type="number"
            value={multiplier}
            onChange={(e) =>
              setMultiplier(
                Number(e.target.value)
              )
            }
          />
        </div>

        <button
          style={{ marginTop: 10 }}
          onClick={loadProjection}
        >
          Recalculate
        </button>
      </div>

      {/* Result Snapshot */}
      {result && (
        <div style={{ marginBottom: 30 }}>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <MetricCard
              title="Required Corpus"
              value={`${symbol}${result.requiredCorpus.toLocaleString()}`}
            />

            <MetricCard
              title="Projected Corpus"
              value={`${symbol}${result.projectedCorpus.toLocaleString()}`}
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
              value={`${result.progressPercent.toFixed(
                1
              )}%`}
            />
          </div>

          {result.yearlyCorpus && (
            <FireTrajectoryChart
              data={result.yearlyCorpus}
            />
          )}
        </div>
      )}
    </div>
  );
}
