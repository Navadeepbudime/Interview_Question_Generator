import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, LogOut } from 'lucide-react';
import Button from './Button';
import './Layout.css';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(
    document.body.getAttribute('data-theme') === 'dark'
  );
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('token'));
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const navItems = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Generate Questions', path: '/generate-questions' },
        { name: 'FAQ', path: '/faq' }
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'FAQ', path: '/faq' }
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout-wrapper">
      {/* Navigation */}
      <nav className="layout-nav">
        <div className="layout-nav-container">
          <div className="layout-nav-content">
            <div className="layout-nav-brand">
              <Link to="/" className="layout-brand-link">
                <span className="layout-brand-text">
                  InterviewQgen
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="layout-desktop-nav">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`layout-nav-link ${isActive(item.path)
                    ? 'layout-nav-link-active'
                    : 'layout-nav-link-inactive'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">Log In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="layout-logout-btn"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              )}

              <button
                onClick={toggleTheme}
                className="layout-theme-toggle"
              >
                {isDarkMode ? <Sun size={20} className="layout-theme-icon" /> : <Moon size={20} className="layout-theme-icon" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="layout-mobile-menu">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="layout-mobile-toggle"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="layout-mobile-nav">
            <div className="layout-mobile-nav-content">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`layout-mobile-nav-link ${isActive(item.path)
                    ? 'layout-mobile-nav-link-active'
                    : 'layout-mobile-nav-link-inactive'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="layout-mobile-login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="layout-mobile-signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="layout-mobile-logout"
                >
                  Logout
                </button>
              )}

              <button
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                className="layout-mobile-theme-toggle"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="layout-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="layout-footer">
        <div className="layout-footer-container">
          <div className="layout-footer-grid">
            <div className="layout-footer-section">
              <h3 className="layout-footer-title">
                InterviewQgen
              </h3>
              <p className="layout-footer-text">
                Empowering interview preparation with AI-generated questions.
              </p>
            </div>
            <div className="layout-footer-section">
              <h3 className="layout-footer-title">
                Quick Links
              </h3>
              <ul className="layout-footer-links">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="layout-footer-link"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="layout-footer-section">
              <h3 className="layout-footer-title">
                Contact
              </h3>
              <p className="layout-footer-text">
                Email: info@interviewqgen.com<br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="layout-footer-bottom">
            <p className="layout-footer-copyright">
              © {new Date().getFullYear()} InterviewQgen. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 