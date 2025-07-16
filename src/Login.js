import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserName } = useContext(UserContext);

  const handleLogin = () => {
    if (name.trim() && password.trim()) {
      // For demo: Just store name. Password can be checked later if needed.
      localStorage.setItem('userName', name);
      setUserName(name);
      navigate('/dashboard');
    } else {
      alert('Please enter both name and password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Welcome Back 👋</h3>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="e.g. Shrutika"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <button onClick={handleLogin} className="btn btn-primary w-100">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
