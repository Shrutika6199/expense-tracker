import React, { useState } from "react";

const Expense = ({ expenses, markAsPaid, addNewExpense, deleteExpense }) => {
  const [newDesc, setNewDesc] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newDesc || !newAmount) return;

    addNewExpense(newDesc, Number(newAmount));
    setNewDesc("");
    setNewAmount("");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">💸 Monthly Fixed Expenses</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {/* Expense Cards */}
        {expenses.map((expense) => (
          <div className="col" key={expense.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{expense.description}</h5>
                <p className="card-text">Amount: ₹{expense.amount}</p>

                <span
                  className={`badge ${
                    expense.isPaid ? "bg-success" : "bg-warning text-dark"
                  }`}
                >
                  {expense.isPaid ? "Paid" : "Unpaid"}
                </span>

                <div className="mt-3 d-flex justify-content-between">
                  {!expense.isPaid && (
                    <button
                      onClick={() => markAsPaid(expense.id)}
                      className="btn btn-outline-success btn-sm"
                    >
                      ✅ Mark as Paid
                    </button>
                  )}
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Expense Card */}
        <div className="col">
          <div className="card border-primary h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">➕ Add New Expense</h5>
              <form onSubmit={handleAdd}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Expense Name"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Amount"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
                <button className="btn btn-primary w-100" type="submit">
                  Add Expense
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
