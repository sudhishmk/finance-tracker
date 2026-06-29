# Finance Tracker

A modern personal finance platform built with Java, Quarkus and React.

Track expenses, design financial plans, monitor budgets, project FIRE goals and receive AI-powered financial insights.

## Features

### Expense Tracking

- Expense management
- Category based spending
- Payment mode support
- Value score analysis
- Monthly summaries

### Financial Planning

- Hierarchical Financial Plans
- Spending allocations
- Investment allocations
- Category level budgeting
- Validation engine
- Customizable plans

### Budget Engine

- BudgetEngineV2
- Allocation snapshots
- Category snapshots
- Budget vs Actual tracking
- Utilization analysis
- Remaining budget insights

### FIRE Planning

- FIRE projections
- Inflation adjustments
- Corpus calculations
- Withdrawal simulations
- Scenario analysis
- Growth trajectories

### AI Financial Coach

- Monthly review
- Wins
- Risks
- Opportunities
- Action recommendations
- Pluggable LLM providers

## Architecture

```text
React UI
   ↓

Quarkus API
   ↓

Finance Core
Budget Engine
FIRE Engine
Analytics Engine
AI Coach
   ↓

SQLite
```

## Modules

```text
modules/

finance-core/
budget-engine/
fire-engine/
analytics-engine/

app/

finance-app/
```

## Technology Stack

Backend

- Java 21
- Quarkus
- Maven
- SQLite

Frontend

- React
- Vite
- TypeScript
- Recharts

AI

- OpenAI Compatible APIs
- Granite
- Extensible Provider Layer

## Running Locally

Linux

```bash
./scripts/start.sh
```

Mac

```bash
./scripts/start-mac.sh
```

Windows

```powershell
scripts\start.ps1
```

## Tests

```bash
mvn clean test
```

## Build

Parent

```bash
mvn clean install
```

Frontend

```bash
npm install
npm run build
```

Start Application

Backend

```bash
cd app/finance-app/

./mvnw quarkus:dev
```

Frontend

```bash
cd ui/finance-ui/
npm run dev
```

Access Application at 

 Local:   http://localhost:5173/

 Backend API available at -: http://localhost:8080/



## Roadmap


### v0.7

FIRE Redesign

Scenario Analysis

Goal Tracking

### v0.8

Forecasting

Trends

Savings Analytics

### v1.0

Open Source Release

## License

MIT License
