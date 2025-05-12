import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilePdf, FaFile, FaTrash, FaDownload, FaEye, FaQuestionCircle, FaCalendarAlt } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the scoped CSS

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [customFileNames, setCustomFileNames] = useState({});
  const [customQuestionNames, setCustomQuestionNames] = useState({});
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const fetchFiles = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserName(decoded.name);

      const res = await axios.get('http://localhost:5000/api/files/myfiles', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setUploadedFiles(res.data);
      setError('');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to fetch files.';
      console.error('Fetch files error:', errorMsg);
      setError(errorMsg);
    }
  };

  const fetchQuestionHistory = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/questions/myquestions', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setQuestionHistory(res.data);
      setError('');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to fetch question history.';
      console.error('Fetch question history error:', errorMsg);
      setError(errorMsg);
    }
  };

  useEffect(() => {
    fetchFiles();
    fetchQuestionHistory();
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded:', res.data);
      setError('');
      setFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      fetchFiles();
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'An error occurred during upload.';
      console.error('Upload error:', errorMsg);
      setError(errorMsg);
    }
  };

  const handleDeleteFile = async (fileId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/files/${fileId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      console.log('File deleted:', fileId);
      fetchFiles();
      fetchQuestionHistory();
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to delete file.';
      console.error('Delete file error:', errorMsg);
      setError(errorMsg);
    }
  };

  const handleDownloadFile = async (fileId, originalFilename) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/files/download/${fileId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob',
      });

      const customName = customFileNames[fileId];
      const downloadName = customName ? `${customName}.pdf` : originalFilename;

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadName || 'downloaded_file');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to download file.';
      console.error('Download file error:', errorMsg);
      setError(errorMsg);
    }
  };

  const handleGenerateQuestions = async (fileId, filename) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/files/download/${fileId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob',
      });

      const pdfFile = new File([res.data], filename, { type: 'application/pdf' });
      navigate('/generate-questions', { state: { pdfFile } });
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to fetch file for question generation.';
      console.error('Generate questions error:', errorMsg);
      setError(errorMsg);
    }
  };

  const handleDownloadQuestions = async (questionId, filename) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    try {
      const customName = customQuestionNames[questionId] || filename.replace(/\.[^/.]+$/, '');
      const res = await axios.get(`http://localhost:5000/api/questions/download/${questionId}?customName=${encodeURIComponent(customName)}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob',
      });

      const downloadName = `questions-${customName}.pdf`;
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to download questions as PDF.';
      console.error('Download questions error:', errorMsg);
      setError(errorMsg);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this question history?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/questions/${questionId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      console.log('Question deleted:', questionId);
      setQuestionHistory(questionHistory.filter(q => q._id !== questionId));
      setCustomQuestionNames(prev => {
        const updated = { ...prev };
        delete updated[questionId];
        return updated;
      });
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to delete question.';
      console.error('Delete question error:', errorMsg);
      setError(errorMsg);
    }
  };

  const handleCustomQuestionNameChange = (questionId, value) => {
    setCustomQuestionNames(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCustomNameChange = (fileId, value) => {
    setCustomFileNames(prev => ({
      ...prev,
      [fileId]: value,
    }));
  };

  const isPDF = (filename) => filename.toLowerCase().endsWith('.pdf');
  
  // Get random number of questions (5-20) for UI display - replace with actual count from API
  const getQuestionCount = (questionId) => {
    return Math.floor(Math.random() * 15) + 5;
  };

  // Format date with better readability
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Apply the dashboard-dark class to the wrapper div
  return (
    <div className="dashboard-dark">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome, {userName || 'User'}</h1>
        {error && <p className="error-message">{error}</p>}

        <div className="upload-card">
          <h2 className="section-title">Upload a File</h2>
          <form onSubmit={handleFileUpload} className="upload-form">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="upload-input"
              accept="application/pdf"
            />
            <button type="submit" className="upload-button">
              Upload
            </button>
          </form>
        </div>

        <div className="files-card">
          <h2 className="section-title">Your Uploaded Files</h2>
          {uploadedFiles.length === 0 ? (
            <p className="no-files">No files uploaded yet.</p>
          ) : (
            <ul className="files-list">
              {uploadedFiles.map((file) => (
                <li key={file._id} className="file-item">
                  <div className="file-info">
                    {isPDF(file.filename) ? (
                      <FaFilePdf className="file-icon pdf-icon" />
                    ) : (
                      <FaFile className="file-icon" />
                    )}
                    <span className="file-name">
                      {file.originalFilename || file.filename}
                    </span>
                  </div>
                  <div className="file-actions">
                    {isPDF(file.filename) && (
                      <>
                        <a
                          href={`http://localhost:5000/uploads/${file.filename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-pdf-link"
                        >
                          <FaEye style={{ marginRight: '5px' }} /> View
                        </a>
                        <input
                          type="text"
                          placeholder="Custom PDF name"
                          value={customFileNames[file._id] || ''}
                          onChange={(e) => handleCustomNameChange(file._id, e.target.value)}
                          className="custom-name-input"
                        />
                        <button
                          onClick={() => handleGenerateQuestions(file._id, file.originalFilename)}
                          className="generate-button"
                        >
                          <FaQuestionCircle style={{ marginRight: '5px' }} /> Generate Questions
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDownloadFile(file._id, file.originalFilename)}
                      className="download-button"
                    >
                      <FaDownload style={{ marginRight: '5px' }} /> Download
                    </button>
                    <button
                      onClick={() => handleDeleteFile(file._id)}
                      className="delete-button"
                      title="Delete file"
                    >
                      <FaTrash className="delete-icon" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="questions-card">
          <h2 className="section-title">Question History</h2>
          {questionHistory.length === 0 ? (
            <p className="no-questions">No questions generated yet.</p>
          ) : (
            <ul className="questions-list">
              {questionHistory.map((questionSet) => (
                <li key={questionSet._id} className="question-item">
                  <div className="question-info">
                    <span className="question-filename">
                      {questionSet.filename}
                      <span className="question-badge">{getQuestionCount(questionSet._id)} questions</span>
                    </span>
                    <span className="question-date">
                      <FaCalendarAlt style={{ marginRight: '5px', fontSize: '0.8rem' }} />
                      {formatDate(questionSet.createdAt)}
                    </span>
                  </div>
                  <div className="question-actions">
                    <input
                      type="text"
                      placeholder="Custom PDF name"
                      value={customQuestionNames[questionSet._id] || ''}
                      onChange={(e) => handleCustomQuestionNameChange(questionSet._id, e.target.value)}
                      className="custom-name-input"
                    />
                    <button
                      onClick={() => handleDownloadQuestions(questionSet._id, questionSet.filename)}
                      className="download-questions-button"
                    >
                      <FaDownload style={{ marginRight: '5px' }} /> Download Questions 
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(questionSet._id)}
                      className="delete-button"
                      title="Delete question set"
                    >
                      <FaTrash className="delete-icon" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;