import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Users, MessageSquare, Activity, LogOut } from 'lucide-react';
import Card from '../components/Card';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalFeedbacks: 0,
  });
  const [activeUsersList, setActiveUsersList] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch statistics
        const statsRes = await axios.get('http://localhost:5000/api/admin/stats', { headers });
        setStats(statsRes.data);

        // Fetch active users
        const activeUsersRes = await axios.get('http://localhost:5000/api/admin/active-users', { headers });
        setActiveUsersList(activeUsersRes.data);

        // Fetch feedbacks
        const feedbacksRes = await axios.get('http://localhost:5000/api/admin/feedbacks', { headers });
        setFeedbacks(feedbacksRes.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to load admin data');
        setLoading(false);
        console.error('Admin dashboard error:', err);
      }
    };

    fetchData();
    
    // Set up polling for active users
    const pollInterval = setInterval(async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const activeUsersRes = await axios.get('http://localhost:5000/api/admin/active-users', { headers });
        setActiveUsersList(activeUsersRes.data);
      } catch (error) {
        console.error('Failed to poll active users:', error);
      }
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(pollInterval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-spinner"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <h1 className="admin-title">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="admin-logout-btn"
          >
            <LogOut className="w-5 h-5 inline-block mr-2" />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats-grid">
          <Card className="admin-stat-card">
            <Users className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="admin-stat-title">
              Total Users
            </h3>
            <p className="admin-stat-value text-blue-600 dark:text-blue-400">
              {stats.totalUsers}
            </p>
          </Card>
          <Card className="admin-stat-card">
            <Activity className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="admin-stat-title">
              Active Users
            </h3>
            <p className="admin-stat-value text-green-600 dark:text-green-400">
              {stats.activeUsers}
            </p>
          </Card>
          <Card className="admin-stat-card">
            <MessageSquare className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="admin-stat-title">
              Total Feedbacks
            </h3>
            <p className="admin-stat-value text-purple-600 dark:text-purple-400">
              {stats.totalFeedbacks}
            </p>
          </Card>
        </div>

        {/* Active Users Section */}
        <div className="admin-active-users">
          <h2 className="admin-active-users-title">
            <Activity className="w-6 h-6 text-green-500" />
            <span>Currently Active Users</span>
          </h2>
          {activeUsersList.length > 0 ? (
            <div className="admin-users-grid">
              {activeUsersList.map((user, index) => (
                <div key={index} className="admin-user-card">
                  <p className="admin-user-email">{user.email}</p>
                  <div className="admin-user-status">
                    <span className="admin-user-status-dot"></span>
                    <span>Online</span>
                  </div>
                  <p className="admin-user-last-active">
                    Active since: {new Date(user.lastActive).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No users currently active
            </p>
          )}
        </div>

        {/* Feedback Section */}
        <div className="admin-feedback-container">
          <h2 className="admin-feedback-title">
            <MessageSquare className="w-6 h-6 text-purple-500" />
            <span>User Feedbacks</span>
          </h2>
          {error && <p className="admin-error">{error}</p>}
          <div className="admin-feedback-list">
            {feedbacks.map((feedback, index) => (
              <div key={index} className="admin-feedback-item">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {feedback.userName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded text-sm text-purple-800 dark:text-purple-200">
                    Rating: {feedback.rating}/5
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {feedback.comment}
                </p>
              </div>
            ))}
            {feedbacks.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No feedbacks available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 