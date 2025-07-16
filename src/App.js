// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Dashboard from "./Dashboard";
import Income from "./Income";
import Expense from "./Expense";
import CalendarPage from "./CalendarPage";
import Login from "./Login";
import { UserProvider } from "./UserContext";
import Home from "./Home";

function App() {
  const [fixedIncome, setFixedIncome] = useState(50000);
  const [additionalIncome, setAdditionalIncome] = useState(0);

  const [incomeHistory, setIncomeHistory] = useState([
    {
      month: "June 2025",
      fixed: 20000,
      additional: 1500,
      total: 21500,
    },
  ]);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Rent",
      amount: 5000,
      isPaid: false,
      dueDate: "2025-07-10",
      isFixed: true,
    },
    {
      id: 2,
      description: "EMI",
      amount: 2000,
      isPaid: false,
      dueDate: "2025-07-12",
      isFixed: true,
    },
    {
      id: 3,
      description: "LIC",
      amount: 1500,
      isPaid: false,
      dueDate: "2025-07-15",
      isFixed: true,
    },
    {
      id: 4,
      description: "Groceries",
      amount: 2500,
      isPaid: false,
      dueDate: "2025-07-18",
      isFixed: false,
    },
  ]);

  const markAsPaid = (id) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, isPaid: true } : exp))
    );
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const addNewExpense = (desc, amount, dueDate, isFixed = false) => {
    const newExp = {
      id: Date.now(),
      description: desc,
      amount,
      isPaid: false,
      dueDate,
      isFixed,
    };
    setExpenses([...expenses, newExp]);
  };

  const totalIncome = fixedIncome + additionalIncome;

  const totalPaidExpenses = expenses
    .filter((exp) => exp.isPaid)
    .reduce((acc, cur) => acc + cur.amount, 0);

  const remainingBalance = totalIncome - totalPaidExpenses;

  const updateMonthlyIncome = () => {
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const total = fixedIncome + additionalIncome;

    const newEntry = {
      month: currentMonth,
      fixed: fixedIncome,
      additional: additionalIncome,
      total,
    };

    setIncomeHistory((prev) => {
      const updated = [...prev.filter((e) => e.month !== currentMonth), newEntry];
      return updated.slice(-12);
    });
  };

  return (
    <UserProvider>


    <Router>
      <NavigationBar />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              income={totalIncome}
              remaining={remainingBalance}
              totalPaid={totalPaidExpenses}
              unpaidExpenses={expenses.filter((e) => !e.isPaid)}
            />
          }
        />
        <Route
          path="/income"
          element={
            <Income
              fixedIncome={fixedIncome}
              setFixedIncome={setFixedIncome}
              additionalIncome={additionalIncome}
              setAdditionalIncome={setAdditionalIncome}
              incomeHistory={incomeHistory}
              updateMonthlyIncome={updateMonthlyIncome}
              totalIncome={totalIncome}
              totalPaidExpenses={totalPaidExpenses}
              remainingBalance={remainingBalance}
            />
          }
        />
        <Route
          path="/expense"
          element={
            <Expense
              expenses={expenses}
              markAsPaid={markAsPaid}
              deleteExpense={deleteExpense}
              addNewExpense={addNewExpense}
            />
          }
        />
        <Route
          path="/calendar"
          element={<CalendarPage expenses={expenses} />}
        />
        <Route
          path="*"
          element={<h4 className="text-center mt-5">404 - Page Not Found</h4>}
        />
         <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />   {/* 👈 Home route */}
      </Routes>
    </Router>
        </UserProvider>
  );
}

export default App;
