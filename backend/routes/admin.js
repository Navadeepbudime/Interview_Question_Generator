const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const jwt = require('jsonwebtoken');

// Admin middleware
const adminMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get admin statistics
router.get('/stats', adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }); // Active in last 30 days
    const totalFeedbacks = await Feedback.countDocuments();

    res.json({
      totalUsers,
      activeUsers: activeUsers || 0,
      totalFeedbacks,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get currently active users
router.get('/active-users', adminMiddleware, async (req, res) => {
  try {
    // Get users who were active in the last 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const activeUsers = await User.find(
      { lastActive: { $gte: fifteenMinutesAgo } },
      'email lastActive'
    ).sort({ lastActive: -1 });

    res.json(activeUsers);
  } catch (error) {
    console.error('Error fetching active users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all feedbacks
router.get('/feedbacks', adminMiddleware, async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);

    const formattedFeedbacks = feedbacks.map(feedback => ({
      id: feedback._id,
      userName: feedback.user ? feedback.user.name : 'Unknown User',
      userEmail: feedback.user ? feedback.user.email : 'unknown@email.com',
      rating: feedback.rating,
      comment: feedback.comment,
      createdAt: feedback.createdAt,
    }));

    res.json(formattedFeedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 