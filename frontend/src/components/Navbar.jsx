import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token');

  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          InterviewPrep AI
        </Link>

        <div className="nav-right">
          {isAuthenticated ? (
            <div className="nav-links-container">
              <Link to="/dashboard" className={`nav-link-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                Dashboard
              </Link>
              <Link to="/generate-questions" className={`nav-link-item ${location.pathname === '/generate-questions' ? 'active' : ''}`}>
                Generate Questions
              </Link>
              <Link to="/feedback" className={`nav-link-item ${location.pathname === '/feedback' ? 'active' : ''}`}>
                Feedback
              </Link>
            </div>
          ) : (
            <div className="nav-links-container">
              <Link to="/login" className={`nav-link-item ${location.pathname === '/login' ? 'active' : ''}`}>
                Login
              </Link>
              <Link to="/register" className={`nav-link-item ${location.pathname === '/register' ? 'active' : ''}`}>
                Register
              </Link>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 