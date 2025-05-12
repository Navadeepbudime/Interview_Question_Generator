import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './GenerateQuestions.css';

function GenerateQuestions() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentFact, setCurrentFact] = useState('');
  const location = useLocation();

  // Fun facts to display during loading
  const funFacts = [
    'Did you know? The term "debugging" in programming originated when engineers removed a moth from a computer relay!',
    'Fun Fact: The first computer "bug" was an actual insect stuck in a Harvard Mark II computer in 1947.',
    'Interview Tip: Explaining your thought process clearly can impress interviewers, even if you don’t solve the problem perfectly.',
    'Tech Trivia: Python was named after the comedy series "Monty Python’s Flying Circus," not the snake!',
    'Pro Tip: Practice behavioral questions to showcase your teamwork and problem-solving skills.',
    'Did you know? The first website ever created is still online—it was made by Tim Berners-Lee in 1991.',
    'Interview Hack: Use the STAR method (Situation, Task, Action, Result) to structure your answers.',
    'Fun Fact: The first programming language, "Plankalkül," was designed in the 1940s but not implemented until 2000!',
  ];

  // Rotate fun facts every 3 seconds during loading
  useEffect(() => {
    let factInterval;
    if (loading) {
      setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
      factInterval = setInterval(() => {
        setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
      }, 3000);
    }
    return () => clearInterval(factInterval);
  }, [loading]);

  // Generate questions when a file is passed
  useEffect(() => {
    const pdfFile = location.state?.pdfFile;
    if (pdfFile) {
      handleGenerate(pdfFile);
    } else {
      setError('No PDF file provided. Please select a file from the Dashboard.');
    }
  }, [location.state]);

  const handleGenerate = async (pdfFile) => {
    if (!pdfFile) {
      setError('No PDF file provided.');
      return;
    }
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:9000/api/generate-questions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Backend Response:', res.data);
      setResponse(res.data);
    } catch (err) {
      console.error('Error processing file:', err.response?.data || err.message);
      setError('Failed to process the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQuestions = async () => {
    if (!response?.questionId) {
      setError('No questions available to download.');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:5000/api/questions/download/${response.questionId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated_questions.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err.response?.data || err.message);
      setError('Failed to download questions.');
    }
  };

  return (
    <div className="generate-questions container">
      {error && <div className="error-message">{error}</div>}

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <div className="fun-fact">
            <h3>While We Process...</h3>
            <p>{currentFact}</p>
          </div>
        </div>
      )}

      {response && response.questions ? (
        <div className="response-container">
          <h2 className="response-title">Generated Questions</h2>
          <button onClick={handleDownloadQuestions} className="download-questions-button">
            Download Questions as PDF
          </button>
          <ul className="questions-list">
            {Object.entries(response.questions).map(([skill, questions], index) => (
              <li key={index}>
                <strong className="skill-title">{skill}:</strong>
                <ul className="question-sublist">
                  {questions.map((question, qIndex) => (
                    <li key={qIndex} className="question-item">{question}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        response && <div>No questions generated.</div>
      )}
    </div>
  );
}

export default GenerateQuestions;