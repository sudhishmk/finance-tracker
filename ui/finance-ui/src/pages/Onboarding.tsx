import { useState } from "react";

const defaultAllocation = {
  NORMAL: 50,
  RETIREMENT: 15,
  LONG_TERM_SAVINGS: 15,
  PERSONAL_GROWTH: 10,
  FUN: 5,
  CONTRIBUTION: 5,
};

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState("INR");
  const [income, setIncome] = useState("");
  const [allocation, setAllocation] = useState(defaultAllocation);
  const [fireEnabled, setFireEnabled] = useState(false);
  const [fireCorpus, setFireCorpus] = useState("");

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const finish = async () => {
    await fetch("http://localhost:8080/api/v1/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency,
        monthlyIncome: Number(income),
        allocation,
        fire: fireEnabled
          ? { targetCorpus: Number(fireCorpus) }
          : null,
      }),
    });

    onComplete();
  };

  return (
    <div style={{ padding: 30, width: "100%", margin: "auto" }}>
      <h2>Step {step} of 4</h2>

      {step === 1 && (
        <>
          <h3>Welcome 👋</h3>
          <p>
            Let’s set up your financial system in less than 2 minutes.
          </p>
          <button onClick={next}>Start</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Select Currency</h3>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="INR">INR ₹</option>
            <option value="USD">USD $</option>
            <option value="EUR">EUR €</option>
          </select>
          <div style={{ marginTop: 20 }}>
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h3>Monthly Income</h3>
          <input
            type="number"
            placeholder="Enter monthly income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />

          <h4 style={{ marginTop: 20 }}>Allocation</h4>
          {Object.entries(allocation).map(([key, value]) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="number"
                value={value}
                onChange={(e) =>
                  setAllocation({
                    ...allocation,
                    [key]: Number(e.target.value),
                  })
                }
              />
            </div>
          ))}

          <div style={{ marginTop: 20 }}>
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h3>FIRE Setup (Optional)</h3>

          <label>
            <input
              type="checkbox"
              checked={fireEnabled}
              onChange={() => setFireEnabled(!fireEnabled)}
            />
            Enable FIRE planning
          </label>

          {fireEnabled && (
            <input
              type="number"
              placeholder="Target Corpus"
              value={fireCorpus}
              onChange={(e) => setFireCorpus(e.target.value)}
            />
          )}

          <div style={{ marginTop: 20 }}>
            <button onClick={back}>Back</button>
            <button onClick={finish}>Finish</button>
          </div>
        </>
      )}
    </div>
  );
}
