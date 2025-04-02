const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');
require('dotenv').config();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server ready to send emails');
  }
});

// Signup Route (unchanged)
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Name, email, and password are required' });
    }
    const normalizedEmail = email.toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email: normalizedEmail, password });
    await user.save();

    const token = generateToken({ id: user.id, name: user.name });
    res.json({ token });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login Route (unchanged)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email, password });
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log('User not found for email:', normalizedEmail);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = generateToken({ id: user.id, name: user.name });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Forgot Password Route (unchanged)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    console.log('Sending reset email to:', email, 'URL:', resetUrl);
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Request',
      html: `Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.`,
    });

    res.json({ msg: 'Password reset link sent to your email' });
  } catch (err) {
    console.error('Forgot password error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Reset Password Routes
// GET: Validate reset token
router.get('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }
    res.json({ msg: 'Token is valid' });
  } catch (err) {
    console.error('Reset password token validation error:', err.message);
    res.status(400).json({ msg: 'Invalid or expired token' });
  }
});

// POST: Reset the password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  console.log('Reset password request:', { token, newPassword }); // Debug
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    user.password = newPassword; // Pre-save hook will hash it
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ msg: 'Password reset successfully' });
  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(400).json({ msg: 'Invalid or expired token' });
  }
});

// Google Login Route (unchanged)
router.post('/google-login', async (req, res) => {
  const { googleId, email, name } = req.body;
  try {
    const normalizedEmail = email.toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      user = new User({ name, email: normalizedEmail, googleId });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = generateToken({ id: user.id, name: user.name });
    res.json({ token });
  } catch (err) {
    console.error('Google login error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;