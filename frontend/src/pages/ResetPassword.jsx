import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

  console.log('ResetPassword loaded with token:', token); // Debug

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      console.log('Submitting reset request with token:', token, 'newPassword:', newPassword);
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        newPassword,
      });
      setMessage(res.data.msg);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'An error occurred.';
      console.error('Reset password error:', err.response?.data || err.message);
      setError(errorMsg);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form-wrapper">
        <h1 className="reset-password-title">Reset Password</h1>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="reset-password-form">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="reset-password-input"
            required
          />
          <button type="submit" className="reset-password-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;