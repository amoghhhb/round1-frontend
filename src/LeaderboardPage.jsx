import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Use LeaderboardPage.css if you have it

const BACKEND_URL = "https://backendd-production-49f7.up.railway.app"; // ✅ Your Railway backend URL

const LeaderboardPage = ({ onRestartQuiz }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/quizresults`)
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch leaderboard:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-arena" style={{ maxWidth: '600px' }}>
      <div className="hero-section">
        <h1 className="greeting-text">Leaderboard</h1>
        <p className="tagline">Top Scores</p>
      </div>

      <div
        className="info-panel show"
        style={{
          position: 'static',
          opacity: 1,
          visibility: 'visible',
          transform: 'none',
          width: '100%',
          marginBottom: '2rem',
        }}
      >
        <h3 className="panel-header">Rankings</h3>

        {loading ? (
          <p className="info-item">Loading...</p>
        ) : leaderboard.length === 0 ? (
          <p className="info-item">No scores yet. Play the quiz to appear here!</p>
        ) : (
          leaderboard
            .sort((a, b) => b.correct - a.correct || b.percentage - a.percentage)
            .map((entry, index) => {
              const total = entry.correct + entry.incorrect;
              return (
                <div className="info-item" key={index}>
                  <strong>{index + 1}. {entry.name}</strong> - {entry.correct} / {total} ({entry.percentage.toFixed(2)}%)
                  <br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {entry.department}
                  </span>
                </div>
              );
            })
        )}
      </div>

      <div className="action-section">
        <button className="launch-btn" onClick={onRestartQuiz} style={{ marginTop: '1.5rem' }}>
          Play Again
        </button>
      </div>

      <div className="credits-section" style={{ marginTop: '2rem' }}>
        <p className="credits-text">Thanks for playing!</p>
      </div>
    </div>
  );
};

export default LeaderboardPage;
