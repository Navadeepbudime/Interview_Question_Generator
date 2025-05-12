import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FAQ from './pages/FAQ';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import GenerateQuestions from './pages/GenerateQuestions';
import Feedback from './pages/Feedback';
import './App.css';

const Navbar = () => {
  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">InterviewQgen</div>
        <div className="navbar-links">
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <button onClick={toggleTheme} className="theme-toggle">
            {document.body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('sidebarOpen');
    navigate('/login');
  };

  const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-toggle-container">
        <button className={`sidebar-toggle ${isOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>
          {isOpen ? '✖' : '☰'}
        </button>
      </div>
      <div className={`sidebar-content ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-brand-container">
          <div className="sidebar-brand">InterviewQgen</div>
        </div>
        <div className="sidebar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/generate-questions">Generate Questions</Link>
          <Link to="/feedback">Feedback</Link>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={toggleTheme} className="theme-toggle">
            {document.body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : children;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    localStorage.getItem('sidebarOpen') === 'true' || false
  );

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', newState);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme);
    }

    // Listen for storage changes to update token
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setToken(newToken);
      if (newToken && localStorage.getItem('sidebarOpen') !== 'false') {
        setIsSidebarOpen(true);
        localStorage.setItem('sidebarOpen', 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Check localStorage periodically for changes in same tab
    const interval = setInterval(() => {
      const newToken = localStorage.getItem('token');
      if (newToken !== token) {
        setToken(newToken);
        const savedSidebarState = localStorage.getItem('sidebarOpen');
        setIsSidebarOpen(savedSidebarState !== 'false');
      }
    }, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [token]);

  return (
    <Router>
      {token ? (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      ) : (
        <Navbar />
      )}
      <div className={token && isSidebarOpen ? 'content-with-sidebar' : 'page-container'}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <About />
              </AuthRoute>
            }
          />
          <Route
            path="/about"
            element={
              <AuthRoute>
                <About />
              </AuthRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <AuthRoute>
                <FAQ />
              </AuthRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <PrivateRoute>
                <Feedback />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthRoute>
                <ForgotPassword />
              </AuthRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <AuthRoute>
                <ResetPassword />
              </AuthRoute>
            }
          />
          <Route
            path="/generate-questions"
            element={
              <PrivateRoute>
                <GenerateQuestions />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;