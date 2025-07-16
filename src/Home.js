import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

const Home = () => {
  const { userName } = useContext(UserContext);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="mb-4">
          {userName ? `Welcome back, ${userName}! 👋` : 'Welcome to Expense Tracker 🧾'}
        </h1>

        {userName ? (
          <p className="lead">You’re logged in. Start managing your expenses now.</p>
        ) : (
          <>
            <p className="lead mb-3">Please log in to continue tracking your expenses.</p>
            <Link to="/login" className="btn btn-primary">
              Go to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
