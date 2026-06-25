import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";
import FirePage from "./pages/FirePage";
import FireSimulationPage from "./pages/FireSimulationPage";
import Onboarding from "./pages/Onboarding";
import SettingsPage from "./pages/SettingsPage";
import MonthSelector from "./components/MonthSelector";
import { FiSettings } from "react-icons/fi";

const getCurrentMonth = () =>
  new Date().toISOString().slice(0, 7);

function App() {
  const [preferences, setPreferences] = useState<any>(undefined);

  const [selectedMonth, setSelectedMonth] =
    useState(getCurrentMonth());

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/preferences")
      .then((res) => res.json())
      .then((data) => {
        setPreferences(data);
      })
      .catch(() => {
        setPreferences(null);
      });
  }, []);

  if (preferences === undefined) {
    return <div>Loading...</div>;
  }

  if (!preferences) {
    return (
      <Onboarding
        onComplete={() => {
          fetch("http://localhost:8080/api/v1/preferences")
            .then((res) => res.json())
            .then(setPreferences);
        }}
      />
    );
  }

  const currentPath = location.pathname;

  const navButtonStyle = (path: string) => ({
    fontWeight: currentPath === path ? "bold" : "normal",
  });

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: "16px 24px",
          background: "#1e293b",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>
          💰 Finance Tracker
        </h2>

        <FiSettings
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/settings")}
        />
      </header>

      {/* NAVIGATION */}
      <nav
        style={{
          padding: "12px 24px",
          background: "#f1f5f9",
          display: "flex",
          gap: "12px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <button
          style={navButtonStyle("/")}
          onClick={() => navigate("/")}
        >
          Dashboard
        </button>

        <button
          style={navButtonStyle("/income")}
          onClick={() => navigate("/income")}
        >
          Income
        </button>

        <button
          style={navButtonStyle("/expense")}
          onClick={() => navigate("/expense")}
        >
          Expense
        </button>

        <button
          style={navButtonStyle("/fire")}
          onClick={() => navigate("/fire")}
        >
          FIRE
        </button>
      </nav>

      {/* GLOBAL MONTH SELECTOR */}
      <div
        style={{
          padding: "16px 24px",
          display: "flex",
          justifyContent: "flex-end",
          background: "#f8fafc",
        }}
      >
        <MonthSelector
          month={selectedMonth}
          onChange={setSelectedMonth}
        />
      </div>

      {/* MAIN CONTENT */}
      <main
        style={{
          padding: "24px",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                preferences={preferences}
                month={selectedMonth}
              />
            }
          />

          <Route
            path="/income"
            element={
              <IncomePage
                preferences={preferences}
                month={selectedMonth}
              />
            }
          />

          <Route
            path="/expense"
            element={
              <ExpensePage
                preferences={preferences}
                month={selectedMonth}
              />
            }
          />

          <Route
            path="/fire"
            element={
              <FirePage
                preferences={preferences}
                month={selectedMonth}
              />
            }
          />

          <Route
            path="/fire/simulation"
            element={
              <FireSimulationPage
                preferences={preferences}
              />
            }
          />

          <Route
            path="/settings"
            element={
              <SettingsPage
                preferences={preferences}
                onUpdated={(updated) =>
                  setPreferences(updated)
                }
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;