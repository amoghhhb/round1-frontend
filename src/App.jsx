import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage.jsx';
import QuizPage from './QuizPage.jsx';
import ResultPage from './ResultPage.jsx';
import SpinnerOverlay from './SpinnerOverlay.jsx';
import LeaderboardPage from './LeaderboardPage.jsx';
import questions from './QuestionData';
import './HomePage.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'quiz', 'results', 'leaderboard'
  const [playerInfo, setPlayerInfo] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showNavToggle, setShowNavToggle] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Show the hamburger menu only during the quiz
    if (currentPage === 'quiz') {
      setShowNavToggle(true);
    } else {
      setShowNavToggle(false);
      setShowInfoPanel(false); // Hide panel if not on quiz page
    }
  }, [currentPage]);

  const handleLaunchGame = (info) => {
    setPlayerInfo(info);
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      setCurrentPage('quiz');
    }, 1500);
  };

  const handleAnswerSelect = (selectedOption) => {
    const newSelectedAnswers = [...selectedAnswers, selectedOption];
    setSelectedAnswers(newSelectedAnswers);

    const currentQuestion = questions[currentQuestionIndex];
    let updatedScore = score; // Local variable for immediate use

    if (selectedOption === currentQuestion.correctAnswer) {
      updatedScore += 1;
      setScore(updatedScore); // Update state
    }

    // Move to the next question or end the quiz
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        // Quiz has ended, update the leaderboard with the final score
        setLeaderboard((prevLeaderboard) => [
          ...prevLeaderboard,
          {
            name: playerInfo.name,
            department: playerInfo.department,
            score: updatedScore, // Use the corrected final score
            totalQuestions: questions.length,
          },
        ]);
        setCurrentPage('results');
      }
    }, 500);
  };

  const toggleInfoPanel = () => {
    setShowInfoPanel(!showInfoPanel);
  };

  // Resets the entire app to the login page
  const handleRestartQuiz = () => {
    setCurrentPage('login');
    setPlayerInfo(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setScore(0);
    setShowInfoPanel(false);
  };

  // Navigates to the leaderboard page
  const handleViewLeaderboard = () => {
    setCurrentPage('leaderboard');
    setShowInfoPanel(false);
  };

  return (
    <div className="welcome-arena">
      {showNavToggle && (
        <div className={`nav-toggle ${showInfoPanel ? 'active' : ''}`} onClick={toggleInfoPanel}>
          <div className="toggle-bar"></div>
          <div className="toggle-bar"></div>
          <div className="toggle-bar"></div>
        </div>
      )}

      {showInfoPanel && (
        <div className="info-panel show">
          <h3 className="panel-header">Player Info</h3>
          {playerInfo && (
            <>
              <div className="info-item">
                <strong>Name:</strong> {playerInfo.name}
              </div>
              <div className="info-item">
                <strong>Department:</strong> {playerInfo.department}
              </div>
              <div className="info-item">
                <strong>Email:</strong> {playerInfo.email}
              </div>
            </>
          )}
          {currentPage === 'quiz' && (
            <>
              <h3 className="panel-header" style={{ marginTop: '1rem' }}>Quiz Progress</h3>
              <div className="info-item">
                <strong>Current Question:</strong> {currentQuestionIndex + 1} / {questions.length}
              </div>
              <div className="info-item">
                <strong>Score:</strong> {score}
              </div>
            </>
          )}
        </div>
      )}

      {currentPage === 'login' && <LoginPage onLaunchGame={handleLaunchGame} />}
      {currentPage === 'quiz' && (
        <QuizPage
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          onAnswerSelect={handleAnswerSelect}
        />
      )}
      {currentPage === 'results' && (
        <ResultPage
          playerInfo={playerInfo}
          questions={questions}
          selectedAnswers={selectedAnswers}
          score={score}
          onViewLeaderboard={handleViewLeaderboard}
          onRestartQuiz={handleRestartQuiz}
        />
      )}
      {currentPage === 'leaderboard' && (
        <LeaderboardPage
          leaderboard={leaderboard}
          onRestartQuiz={handleRestartQuiz}
        />
      )}

      <SpinnerOverlay show={showSpinner} />
    </div>
  );
};

export default App;
