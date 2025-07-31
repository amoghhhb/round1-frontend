import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Assuming styles are in HomePage.css

const BACKEND_URL = "https://backendd-production-49f7.up.railway.app";

const ResultPage = ({ playerInfo, questions, selectedAnswers, score, onRestartQuiz, onViewLeaderboard }) => {
  const totalQuestions = questions.length;
  const incorrectAnswers = totalQuestions - score;
  const percentage = (score / totalQuestions) * 100;

  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ Send quiz result to backend on page load
  useEffect(() => {
    if (playerInfo && playerInfo.name && playerInfo.email && playerInfo.department) {
      fetch(`${BACKEND_URL}/quizresults`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playerInfo.name,
          email: playerInfo.email,
          department: playerInfo.department,
          correct: score,
          incorrect: incorrectAnswers,
          percentage: percentage,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Quiz result submitted:", data);
        })
        .catch((err) => {
          console.error("Error submitting quiz result:", err);
        });
    }
  }, []);

  const toggleReviewVisibility = () => {
    if (isReviewVisible) setActiveIndex(null);
    setIsReviewVisible(!isReviewVisible);
  };

  const handleQuestionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const reviewWrapperBaseStyle = {
    overflow: 'hidden',
    transition: 'max-height 0.5s ease-in-out, opacity 0.4s ease-in-out',
  };

  const reviewWrapperStyle = isReviewVisible
    ? { ...reviewWrapperBaseStyle, maxHeight: '1000px', opacity: 1 }
    : { ...reviewWrapperBaseStyle, maxHeight: '0px', opacity: 0 };

  const detailsBaseStyle = {
    overflow: 'hidden',
    transition: 'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out, padding-top 0.4s ease-in-out',
  };

  const getDetailsStyle = (index) => {
    return activeIndex === index
      ? { ...detailsBaseStyle, maxHeight: '200px', opacity: 1, paddingTop: '1rem' }
      : { ...detailsBaseStyle, maxHeight: '0px', opacity: 0, paddingTop: '0rem' };
  };

  return (
    <div className="main-arena" style={{ maxWidth: '600px' }}>
      <div className="hero-section">
        <h1 className="greeting-text">Quiz Results</h1>
        <p className="tagline">Well done, {playerInfo.name}!</p>
      </div>

      <div className="info-panel show" style={{ position: 'static', opacity: 1, visibility: 'visible', transform: 'none', width: '100%', marginBottom: '2rem' }}>
        <h3 className="panel-header">Summary</h3>
        <div className="info-item"><strong>Total Questions:</strong> {totalQuestions}</div>
        <div className="info-item"><strong>Correct Answers:</strong> {score}</div>
        <div className="info-item"><strong>Incorrect Answers:</strong> {incorrectAnswers}</div>
        <div className="info-item"><strong>Your Score:</strong> {percentage.toFixed(2)}%</div>
      </div>

      {/* Answer Review Dropdown Section */}
      <div style={{ width: '100%', marginBottom: '2rem' }}>
        <div style={{ border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', background: 'var(--bg-input)', overflow: 'hidden' }}>
          <div onClick={toggleReviewVisibility} style={{ padding: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="panel-header" style={{ margin: 0 }}>Answer Review</h3>
            <span style={{ transform: isReviewVisible ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
          </div>

          <div style={reviewWrapperStyle}>
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              {questions.map((q, index) => (
                <div key={index} style={{ marginTop: '1rem', borderTop: '1px solid var(--border-primary)', paddingTop: '1rem' }}>
                  <div onClick={() => handleQuestionToggle(index)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: 'var(--text-primary)', fontWeight: '600', margin: 0 }}>Q{index + 1}: {q.question}</p>
                    <span style={{ transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                  </div>

                  <div style={getDetailsStyle(index)}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', margin: 0 }}>
                      Your Answer: <span style={{ color: selectedAnswers[index] === q.correctAnswer ? 'var(--success-gradient)' : 'var(--warning-gradient)' }}>
                        {selectedAnswers[index] || 'No Answer'}
                      </span>
                    </p>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', margin: 0 }}>
                      Correct Answer: <span style={{ color: 'var(--text-accent)' }}>{q.correctAnswer}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="action-section" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="launch-btn" onClick={onViewLeaderboard}>
          View Leaderboard
        </button>
        <button className="launch-btn" onClick={onRestartQuiz} style={{ background: 'var(--secondary-gradient)' }}>
          Play Again
        </button>
      </div>

      <div className="credits-section" style={{ marginTop: '2rem' }}>
        <p className="credits-text">
          Thanks for playing!
        </p>
      </div>
    </div>
  );
};

export default ResultPage;
