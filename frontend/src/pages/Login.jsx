import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isAdmin ? 'admin-login' : 'login';
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAdmin', isAdmin);
      navigate(isAdmin ? '/admin-dashboard' : '/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'An error occurred. Please try again.';
      console.error('Login error:', err.response?.data || err.message);
      setError(errorMsg);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const res = await axios.post('http://localhost:5000/api/auth/google-login', {
        googleId: decoded.sub,
        email: decoded.email,
        name: decoded.name,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAdmin', false);
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Google login failed.';
      console.error('Google login error:', err.response?.data || err.message);
      setError(errorMsg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 animate-[fadeIn_1s_ease] font-sans">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <h1 className="text-center mb-5 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-[slideIn_0.5s_forwards]">
          Welcome Back
        </h1>
        {error && (
          <p className="text-red-600 dark:text-red-400 text-center mb-4 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg border border-red-200 dark:border-red-800 animate-[fadeIn_0.5s_forwards]">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg
                     bg-gray-50 dark:bg-gray-700 
                     text-gray-900 dark:text-gray-200 
                     placeholder-gray-500 dark:placeholder-gray-400
                     transition-colors duration-200
                     focus:border-blue-500 dark:focus:border-blue-400 
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                     focus:outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg
                     bg-gray-50 dark:bg-gray-700 
                     text-gray-900 dark:text-gray-200 
                     placeholder-gray-500 dark:placeholder-gray-400
                     transition-colors duration-200
                     focus:border-blue-500 dark:focus:border-blue-400 
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                     focus:outline-none"
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="adminLogin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-4 h-4 text-blue-600 dark:text-blue-400 
                       border-2 border-gray-300 dark:border-gray-600 
                       rounded focus:ring-blue-500 dark:focus:ring-blue-400
                       bg-white dark:bg-gray-700"
            />
            <label htmlFor="adminLogin" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Login as Administrator
            </label>
          </div>
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 
                     dark:from-blue-500 dark:to-purple-500
                     hover:from-blue-700 hover:to-purple-700
                     dark:hover:from-blue-600 dark:hover:to-purple-600
                     text-white font-medium rounded-lg
                     transform transition-all duration-200
                     hover:shadow-lg hover:-translate-y-0.5"
          >
            {isAdmin ? 'Admin Login' : 'Login'}
          </button>
        </form>
        {!isAdmin && (
          <>
            <a
              href="/forgot-password"
              className="block text-center mt-4 text-blue-600 dark:text-blue-400 
                       hover:text-blue-700 dark:hover:text-blue-300 
                       transition-colors duration-200"
            >
              Forgot Password?
            </a>
            <div className="relative mt-6 mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="text-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError('Google login failed')}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;


