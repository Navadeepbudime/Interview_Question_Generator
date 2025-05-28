import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { 
        name, 
        email, 
        password 
      });
      setIsSuccess(true);
      localStorage.setItem('token', res.data.token);
      // Add a small delay to show the success animation
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'An error occurred. Please try again.';
      console.error('Signup error:', err.response?.data || err.message);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className={`signup-form-wrapper ${isSuccess ? 'signup-success' : ''}`}>
        <h1 className="signup-title">Create Your Account</h1>
        {error && <p className="signup-error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="signup-input"
            required
            disabled={isLoading}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="signup-input"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a password"
            className="signup-input"
            required
            disabled={isLoading}
            minLength="6"
          />
          <button 
            type="submit" 
            className={`signup-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? '' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;