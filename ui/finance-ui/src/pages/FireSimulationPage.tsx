import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import DataGrid from "../components/DataGrid";
import { formatCurrency } from "../utils/format";
import type { Preferences } from "../types";

export default function FireSimulationPage({
    preferences,
  }: {
    preferences: Preferences;
  }) {
  const location = useLocation();

  const navigate = useNavigate();

  const initial = location.state || {};

  const [form, setForm] = useState({
    currentCorpus: initial.currentCorpus ?? 0,
    monthlyInvestment: initial.monthlyInvestment ?? 0,
    annualReturn: initial.annualReturn ?? 10,
    inflation: initial.inflation ?? 6,
    annualExpense: initial.annualExpense ?? 0,
    yearsToFire: initial.yearsToFire ?? 20,
    retirementYears: initial.retirementYears ?? 30,
    safeWithdrawalRate: initial.safeWithdrawalRate ?? 5,
    taxRate: initial.taxRate ?? 10,
  });

  const [simulation, setSimulation] = useState<any>(null);

  const runSimulation = async () => {
    const res = await fetch(
      "http://localhost:8080/api/v1/fire/full-simulation",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    setSimulation(data);
  };

  type AccumulationRow = {
    year: number;
    monthlySip: number;
    annualSip: number;
    totalInvested: number;
    corpusStart: number;
    corpusEnd: number;
  };

  const accumulationColumns: ColumnDef<AccumulationRow>[] = [
    { header: "Year", accessorKey: "year" },
    { header: "Monthly SIP", accessorKey: "monthlySip",  cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ), },
    { header: "Annual SIP", accessorKey: "annualSip",   cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ), },
    { header: "Total Invested", accessorKey: "totalInvested",   cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ), },
    { header: "Corpus Start", accessorKey: "corpusStart",   cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ), },
    { header: "Corpus End", accessorKey: "corpusEnd",   cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ), },
  ];

  type WithdrawalRow = {
    year: number;
    corpusStart: number;
    inflatedExpense: number;
    grossWithdrawal: number;
    tax: number;
    netWithdrawal: number;
    corpusEnd: number;
    fireNumber: number;
    status: string;
  };

  const withdrawalColumns: ColumnDef<WithdrawalRow>[] = [
    { header: "Year", accessorKey: "year" },
    { header: "Corpus Start", accessorKey: "corpusStart" ,   cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ),},
    { header: "Inflated Expense", accessorKey: "inflatedExpense",   cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ), },
    { header: "Gross Withdrawal", accessorKey: "grossWithdrawal",   cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ), },
    { header: "Tax", accessorKey: "tax",   cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ), },
    { header: "Net Withdrawal", accessorKey: "netWithdrawal",   cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ), },
    { header: "Corpus End", accessorKey: "corpusEnd",   cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ), },
    { header: "FIRE Number", accessorKey: "fireNumber",   cell: ({ getValue }) =>
        formatCurrency(
          getValue() as number,
          preferences.currency
        ), },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <span
            style={{
              padding: "4px 8px",
              borderRadius: 8,
              background:
                value === "SAFE"
                  ? "#dcfce7"
                  : "#fee2e2",
              color:
                value === "SAFE"
                  ? "#166534"
                  : "#991b1b",
              fontWeight: 600,
            }}
          >
            {value}
          </span>
        );
      },
    },
  ];
  

  return (
    
   <div style={{ width: "100%" }}>
      <h2>Advanced FIRE Simulation</h2>

      <div style={{ marginBottom: 20 }}>
        {/* Breadcrumb */}
        <div
            style={{
            fontSize: 14,
            color: "#64748b",
            marginBottom: 8,
            }}
        >
            <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            >
            Dashboard
            </span>{" "}
            /{" "}
            <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/fire")}
            >
            FIRE
            </span>{" "}
            /{" "}
            <span style={{ fontWeight: 600 }}>
            Advanced Simulation
            </span>
        </div>

        {/* Back Button */}
        <button
            onClick={() => navigate("/fire")}
            style={{
            background: "#e2e8f0",
            border: "none",
            padding: "6px 12px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14,
            }}
        >
            ← Back to FIRE Overview
        </button>
        </div>


      {/* Editable Assumptions */}
      <div style={{ marginBottom: 20 }}>
      <label>Monthly Investment </label>
        <input
          type="number"
          value={form.monthlyInvestment}
          onChange={(e) =>
            setForm({
              ...form,
              monthlyInvestment:
                Number(e.target.value),
            })
          }
        />
        <label> Expected Return % </label>
        <input
          type="number"
          value={form.annualReturn}
          onChange={(e) =>
            setForm({
              ...form,
              annualReturn:
                Number(e.target.value),
            })
          }
        />
      </div>

      <button onClick={runSimulation}>
        Run Simulation
      </button>

      {simulation && (
        <>
          <h3>
            Corpus at FIRE Age:{" "}
            {formatCurrency(
                simulation.corpusAtFireAge,
                preferences.currency
            )}
          </h3>

          <DataGrid
            data={simulation.accumulationTable}
            columns={accumulationColumns}
          />

          <DataGrid
            data={simulation.withdrawalTable}
            columns={withdrawalColumns}
          />
        </>
      )}
    </div>
  );
}
