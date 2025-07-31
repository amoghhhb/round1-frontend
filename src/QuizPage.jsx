import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Import the CSS

const QuizPage = ({ questions, currentQuestionIndex, onAnswerSelect, onQuizEnd }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question
  const [timerActive, setTimerActive] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setSelectedOption(null); // Reset selected option for new question
    setTimeLeft(15); // Reset timer for new question
    setTimerActive(true); // Activate timer for new question
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (!timerActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Auto-submit if time runs out and no option is selected
          handleSubmitAnswer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, currentQuestionIndex]); // Dependency on currentQuestionIndex to restart timer

  const handleOptionClick = (option) => {
    if (timerActive) { // Only allow selection if timer is active
      setSelectedOption(option);
      setTimerActive(false); // Pause timer after selection
    }
  };

  const handleSubmitAnswer = () => {
    onAnswerSelect(selectedOption);
    setTimerActive(false); // Ensure timer is stopped
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (!currentQuestion) {
    return null; // Or a loading state, though this shouldn't happen if logic is correct
  }

  return (
    <div className="main-arena">
      <div className="hero-section">
        <p className="tagline">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h2 className="greeting-text" style={{ fontSize: '1.8rem', letterSpacing: '1px' }}>
          {currentQuestion.question}
        </h2>
        <p className="tagline" style={{ marginTop: '1rem', fontSize: '1.1rem', color: 'var(--text-accent)' }}>
          Time Left: {timeLeft}s
        </p>
      </div>
      <div className="registration-form"> {/* Reusing form styles for options */}
        {currentQuestion.options.map((option, index) => (
          <div className="field-group" key={index}>
            <button
              className="launch-btn" // Reusing button styles
              style={{
                background: selectedOption === option ? 'var(--accent-gradient)' : 'var(--bg-input)',
                color: selectedOption === option ? 'var(--bg-primary)' : 'var(--text-primary)',
                borderColor: selectedOption === option ? 'transparent' : 'var(--border-primary)',
                boxShadow: selectedOption === option ? 'var(--shadow-md)' : 'none',
                transition: 'all var(--transition-normal)',
                textTransform: 'none',
                letterSpacing: '0',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                cursor: timerActive ? 'pointer' : 'not-allowed', // Disable click if timer is not active
              }}
              onClick={() => handleOptionClick(option)}
              disabled={!timerActive} // Disable button when timer is not active (after selection or time up)
            >
              {option}
            </button>
          </div>
        ))}
      </div>
      <div className="action-section">
        <button
          className="launch-btn"
          onClick={handleSubmitAnswer}
          disabled={selectedOption === null && timerActive} // Disable if nothing selected AND timer is active (prevent early submit)
          style={{
            background: (selectedOption === null && timerActive) ? 'var(--text-muted)' : 'var(--success-gradient)',
            marginTop: '1.5rem'
          }}
        >
          {isLastQuestion ? 'View Results' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;