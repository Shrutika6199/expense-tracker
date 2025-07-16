// src/SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import index from ".index.css" // custom styles

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    // Dummy validation (replace with real auth)
    if (email === "admin@example.com" && password === "admin123") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form shadow-lg" onSubmit={handleSignIn}>
        <h2 className="text-center mb-4">🔐 Expense Tracker Login</h2>

        <div className="form-group mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </div>

        <div className="form-group mb-4">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
          />
        </div>
        <button type="submit" className="btn btn-purple w-100">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
