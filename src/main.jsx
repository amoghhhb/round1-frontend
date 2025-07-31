import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Change from .js to .jsx
import './HomePage.css'; // Ensure the main CSS is imported here as well

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);