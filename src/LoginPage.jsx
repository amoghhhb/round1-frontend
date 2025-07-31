import React, { useState } from 'react';
import './HomePage.css'; // Import the CSS

const LoginPage = ({ onLaunchGame }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !department || !email) {
    setError('All fields are required!');
    return;
  }

  setError('');

  try {
    const response = await fetch('https://backendd-production-49f7.up.railway.app/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name, department, email }),
});


    const result = await response.json();
    console.log("Backend response:", result);

    if (response.ok) {
      onLaunchGame({ name, department, email });
    } else {
      setError(result.message || 'Something went wrong!');
    }
  } catch (err) {
    console.error("Error submitting form:", err);
    setError('Network error. Please try again later.');
  }
};


  return (
    <div className="main-arena">
      <div className="hero-section">
        <h1 className="greeting-text">Welcome to the</h1>
        <h1 className="challenge-text">Tech Quiz Arena!</h1>
        <p className="tagline">Test your knowledge and challenge yourself.</p>
      </div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="field-group player-name-group">
          <label htmlFor="name" className="field-label">Name</label>
          <input
            type="text"
            id="name"
            className="player-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="field-group dept-group">
          <label htmlFor="department" className="field-label">Department</label>
          <input
            type="text"
            id="department"
            className="player-input"
            placeholder="Your department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="field-group">
          <label htmlFor="email" className="field-label">Email</label>
          <input
            type="email"
            id="email"
            className="player-input"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: '#f5576c', marginBottom: '1rem' }}>{error}</p>}
        <div className="action-section">
          <button type="submit" className="launch-btn">Launch Game</button>
        </div>
      </form>
      <div className="credits-section">
        <p className="credits-text">
        </p>
      </div>
    </div>
  );
};

export default LoginPage;