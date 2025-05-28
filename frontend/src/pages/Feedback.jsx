import React, { useState, useEffect } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(localStorage.getItem('feedbackSubmitted') === 'true');
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // Fetch user email from profile endpoint on mount
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in again.');
        }

        const response = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        if (!data.email) {
          throw new Error('Email not found in profile. Please contact support.');
        }
        setUserEmail(data.email);
      } catch (err) {
        console.error('Error fetching user email:', err);
        setError(err.message);
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim() || rating === 0 || !userEmail) return;

    try {
      // Submit feedback
      const feedbackResponse = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ feedback, rating }),
      });

      if (!feedbackResponse.ok) {
        throw new Error('Failed to submit feedback');
      }

      // Send thank-you email
      const emailResponse = await fetch('http://localhost:5000/api/sendThankYouEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send thank-you email');
      }

      setSubmitted(true);
      localStorage.setItem('feedbackSubmitted', 'true'); // Persist submitted state
      setFeedback('');
      setRating(0);
      setError('');
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit feedback. Please try again.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    localStorage.removeItem('feedbackSubmitted'); // Clear submitted state
    setFeedback('');
    setRating(0);
    setError('');
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleStarHover = (star) => {
    setHoverRating(star);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="fb-page-container">
      <h1>Feedback</h1>
      {submitted ? (
        <div className="fb-success-message">
          Thank you for submitting your feedback! We've sent a confirmation email.
          <button onClick={handleReset} className="fb-reset-button">
            Submit Another Feedback
          </button>
        </div>
      ) : (
        <div className="fb-form">
          <p>We value your input! Please share your thoughts, suggestions, or issues.</p>
          {error && <div className="fb-error-message">{error}</div>}
          <div className="fb-star-rating">
            <label>Rate your experience:</label>
            <div className="fb-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`fb-star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
            rows="5"
            className="fb-textarea"
            disabled={!userEmail}
          />
          <button
            onClick={handleSubmit}
            className="fb-submit-button"
            disabled={!feedback.trim() || rating === 0 || !userEmail}
          >
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default Feedback;