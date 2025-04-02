import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot for React 18
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css'; // Assuming you have a global CSS file

// Get the root DOM element
const container = document.getElementById('root');
const root = createRoot(container); // Create a root

// Render the app wrapped with GoogleOAuthProvider
root.render(
  <GoogleOAuthProvider clientId="454782187916-3s61n52arelh9p94bttau4mr3h2n3ig5.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);