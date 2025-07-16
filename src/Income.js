import React from "react";

const Income = ({
  fixedIncome,
  setFixedIncome,
  additionalIncome,
  setAdditionalIncome,
  updateMonthlyIncome,
  incomeHistory,
  totalIncome,
  totalPaidExpenses,
  remainingBalance
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMonthlyIncome();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">💼 Income Details</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">

          {/* 💰 Income Form */}
          <div className="card shadow-sm p-4 mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Fixed Monthly Income</label>
                <input
                  type="number"
                  className="form-control"
                  value={fixedIncome}
                  onChange={(e) => setFixedIncome(Number(e.target.value))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Additional Income</label>
                <input
                  type="number"
                  className="form-control"
                  value={additionalIncome}
                  onChange={(e) => setAdditionalIncome(Number(e.target.value))}
                />
              </div>

              <div className="text-end">
                <button className="btn btn-primary" type="submit">
                  💾 Save This Month's Income
                </button>
              </div>
            </form>
          </div>

          {/* 🧮 Summary Section */}
          <div className="card bg-light p-3 mb-4">
            <h5 className="mb-2">📊 Monthly Summary</h5>
            <p className="mb-1">Total Income: ₹{totalIncome}</p>
            <p className="mb-1">Total Paid Expenses: ₹{totalPaidExpenses}</p>
            <p className="fw-bold text-success">💸 Saved Amount: ₹{remainingBalance}</p>
          </div>

          {/* 📅 Income History */}
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">📅 Income History (Last 1 Year)</h5>
            <ul className="list-group">
              {incomeHistory
                .slice()
                .reverse()
                .map((entry, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <div>
                      <strong>{entry.month}</strong> <br />
                      <small>Fixed: ₹{entry.fixed}</small><br />
                      <small>Additional: ₹{entry.additional}</small>
                    </div>
                    <span className="fw-bold text-success">₹{entry.total}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
