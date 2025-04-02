import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilePdf, FaFile, FaTrash } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode'; // Added for decoding token
import './Dashboard.css';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [customFileNames, setCustomFileNames] = useState({}); // Store custom names per file ID
  const [userName, setUserName] = useState(''); // Added for user's name

  const fetchFiles = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    try {
      const decoded = jwtDecode(token); // Decode token to get name
      setUserName(decoded.name); // Set user's name from token

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

  useEffect(() => {
    fetchFiles();
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

    try {
      await axios.delete(`http://localhost:5000/api/files/${fileId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      console.log('File deleted:', fileId);
      fetchFiles();
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to delete file.';
      console.error('Delete file error:', errMsg);
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

      // Use custom filename if provided, otherwise fall back to originalFilename
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
      console.error('Download file error:', errMsg);
      setError(errorMsg);
    }
  };

  const handleCustomNameChange = (fileId, value) => {
    setCustomFileNames((prev) => ({
      ...prev,
      [fileId]: value,
    }));
  };

  const isPDF = (filename) => filename.toLowerCase().endsWith('.pdf');

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {userName || 'User'}</h1> {/* Updated title */}
      {error && <p className="error-message">{error}</p>}

      {/* File Upload Section */}
      <div className="upload-card">
        <h2 className="section-title">Upload a File</h2>
        <form onSubmit={handleFileUpload} className="upload-form">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="upload-input"
          />
          <button type="submit" className="upload-button">
            Upload
          </button>
        </form>
      </div>

      {/* Uploaded Files Section */}
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
                        View PDF
                      </a>
                      <input
                        type="text"
                        placeholder="Custom PDF name"
                        value={customFileNames[file._id] || ''}
                        onChange={(e) => handleCustomNameChange(file._id, e.target.value)}
                        className="custom-name-input"
                      />
                    </>
                  )}
                  <button
                    onClick={() => handleDownloadFile(file._id, file.originalFilename)}
                    className="download-button"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDeleteFile(file._id)}
                    className="delete-button"
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
  );
};

export default Dashboard;