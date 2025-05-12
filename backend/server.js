const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const questionRoutes = require('./routes/question');
const feedbackRoutes = require('./routes/feedback'); // NEW: Import feedback routes
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const nodemailer = require('nodemailer');

dotenv.config({ path: path.resolve(__dirname, '.env') });
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Proxy requests to Flask server for generate-questions endpoint
app.use('/api/generate-questions', createProxyMiddleware({
  target: 'http://localhost:9000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/generate-questions': '/api/generate-questions',
  },
  onProxyReq: (proxyReq, req) => {
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
  },
}));

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  
});

// Route to send thank-you email
app.post('/api/sendThankYouEmail', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank You for Your Feedback',
    text: 'Dear User,\n\nThank you for submitting your feedback to InterviewQgen. We value your input and will use it to improve our services.\n\nBest regards,\nThe InterviewQgen Team',
    html: `
      <h3>Dear User,</h3>
      <p>Thank you for submitting your feedback to InterviewQgen. We value your input and will use it to improve our services.</p>
      <p>Best regards,<br>The InterviewQgen Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Thank-you email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send thank-you email' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/feedback', feedbackRoutes); // NEW: Add feedback routes

// Root route
app.get('/', (req, res) => res.send('Server is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));