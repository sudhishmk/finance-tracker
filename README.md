# 💰 Finance Tracker

A modern personal finance, budgeting, and **FIRE (Financial Independence, Retire Early)** planning application built with **Quarkus** and **React**.

The goal of this project is to evolve beyond a traditional expense tracker into a comprehensive personal wealth management platform that helps users understand their financial health, plan for retirement, and make better financial decisions.

---

## ✨ Features

### 📊 Dashboard

- Monthly income & expense overview
- Savings summary
- Budget allocation analysis
- FIRE progress snapshot
- Interactive financial metrics

---

### 💰 Income Management

- Add, edit and delete income
- Monthly income history
- Multiple income sources
- Persistent SQLite storage

---

### 💳 Expense Management

- Add, edit and delete expenses
- Expense categories
- Payment modes
- Value score tracking
- Budget allocation tracking
- Category-wise spending analysis

---

### ⚙️ Settings

Configure personal financial preferences including:

- Preferred currency
- Monthly income
- Budget allocation percentages
- FIRE settings

Allocation validation ensures the total allocation always equals **100%**.

---

### 🔥 FIRE Planner

Current implementation includes:

- FIRE projection
- Required retirement corpus
- Years to FIRE
- Wealth accumulation projection
- Retirement withdrawal simulation
- Inflation adjustment
- Safe Withdrawal Rate (SWR)
- Tax assumptions
- SIP planning

---

## 🏗️ Technology Stack

### Backend

- Java 21
- Quarkus
- Jakarta REST
- Hibernate ORM
- Panache
- SQLite
- Maven

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Table
- Recharts

---

## 📁 Project Structure

```text
finance-tracker/
│
├── app/                # Quarkus REST application
├── modules/            # Shared/domain modules
├── ui/                 # React frontend
├── scripts/            # Development helper scripts
├── README.md
├── LICENSE
└── pom.xml
```

---

## 🚀 Getting Started

### Prerequisites

- Java 21+
- Maven
- Node.js 20+
- npm

---

### Start Backend

```bash
cd app
./mvnw quarkus:dev
```

Backend:

```
http://localhost:8080
```

---

### Start Frontend

```bash
cd ui
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

### Start Everything

A helper script is provided to start both backend and frontend together.

```bash
chmod +x scripts/start.sh
./scripts/start.sh
```

---

## 💾 Database

The application uses **SQLite** for local persistence.

The database is automatically created as:

```
finance.db
```

Data stored includes:

- User preferences
- Income
- Expenses
- Financial settings

---

## 📸 Screenshots

Screenshots will be added as the application evolves.

---

## 🧠 Design Principles

The project follows a few core principles:

- Clean architecture
- Modular design
- Separation of UI and business logic
- Data-driven financial insights
- Simplicity over unnecessary complexity

---

## 🤝 Contributing

Contributions, ideas and feature requests are welcome.

If you find a bug or have an idea for improvement, please open an issue.

Pull requests are always appreciated.

---

## 📄 License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sudhish Nair**

- Cloud Native Engineer
- Java & Quarkus Developer
- Kubernetes & OpenShift Enthusiast
- DevOps & Platform Engineering
- Personal Finance & FIRE Advocate

GitHub: https://github.com/sudhishmk

---

⭐ If you find this project useful, consider giving it a star!
