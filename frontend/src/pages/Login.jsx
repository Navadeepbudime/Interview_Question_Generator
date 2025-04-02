import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Login request payload:', { email, password });
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'An error occurred. Please try again.';
      console.error('Login error:', err.response?.data || err.message);
      setError(errorMsg);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    console.log('Google credential response:', credentialResponse); // Debug
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Decoded Google token:', decoded); // Debug
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google-login', {
        googleId: decoded.sub,
        email: decoded.email,
        name: decoded.name,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Google login failed.';
      console.error('Google login error:', err.response?.data || err.message);
      setError(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">Login</h1>
        {error && <p className="login-error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>
          <a href="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </a>
        </p>
        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError('Google login failed')}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;