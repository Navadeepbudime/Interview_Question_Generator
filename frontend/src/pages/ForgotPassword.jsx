import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.msg);
      setTimeout(() => navigate('/login'), 3000); // Redirect after 3s
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'An error occurred.';
      setError(errorMsg);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form-wrapper">
        <h1 className="forgot-password-title">Forgot Password</h1>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="forgot-password-input"
            required
          />
          <button type="submit" className="forgot-password-button">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;