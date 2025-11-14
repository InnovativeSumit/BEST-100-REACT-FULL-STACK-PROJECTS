import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NumberInput from './components/NumberInput';
import ResultMessage from './components/ResultMessage';
import GameStats from './components/GameStats';
import { Button } from '@/components/ui/button.jsx';
import './App.css';

const App = () => {
  const [secretNumber, setSecretNumber] = useState(() => Math.floor(Math.random() * 25) + 1);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('default');
  const [count, setCount] = useState(0);
  const [guessHistory, setGuessHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const maxCount = 5;

  useEffect(() => {
    if (count >= maxCount && gameStatus === 'playing') {
      setMessage(`Game Over! The number was ${secretNumber}. Better luck next time!`);
      setMessageType('error');
      setGameStatus('lost');
    }
  }, [count, maxCount, secretNumber, gameStatus]);

  const remainingAttempts = maxCount - count;

  const handleGuess = (value) => {
    if (gameStatus !== 'playing') return;

    const guessNum = parseInt(value);
    const newCount = count + 1;
    const newHistory = [...guessHistory, guessNum];
    
    setCount(newCount);
    setGuessHistory(newHistory);

    if (guessNum === secretNumber) {
      setMessage(`🎉 Congratulations! You guessed it right in ${newCount} attempt${newCount === 1 ? '' : 's'}!`);
      setMessageType('success');
      setGameStatus('won');
    } else if (newCount >= maxCount) {
      // This will be handled by useEffect
      return;
    } else {
      const difference = Math.abs(guessNum - secretNumber);
      let hint = '';
      
      if (difference === 1) {
        hint = ' You\'re very close!';
      } else if (difference <= 3) {
        hint = ' You\'re getting warm!';
      } else if (difference <= 5) {
        hint = ' You\'re getting closer!';
      }

      if (guessNum > secretNumber) {
        setMessage(`Too high! Try a smaller number.${hint}`);
      } else {
        setMessage(`Too low! Try a larger number.${hint}`);
      }
      setMessageType('warning');
    }
  };

  const resetGame = () => {
    setSecretNumber(Math.floor(Math.random() * 25) + 1);
    setMessage('');
    setMessageType('default');
    setCount(0);
    setGuessHistory([]);
    setGameStatus('playing');
  };

  const isGameOver = gameStatus === 'won' || gameStatus === 'lost';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {gameStatus === 'playing' ? 'Make Your Guess!' : 
               gameStatus === 'won' ? 'You Won!' : 'Game Over'}
            </h2>
            <p className="text-gray-600">
              {gameStatus === 'playing' ? 'I\'m thinking of a number between 1 and 25' : ''}
            </p>
          </div>

          <NumberInput 
            onSubmit={handleGuess} 
            disabled={isGameOver}
          />

          <ResultMessage 
            message={message} 
            type={messageType}
          />

          <GameStats 
            remainingAttempts={remainingAttempts}
            totalAttempts={maxCount}
            guessHistory={guessHistory}
          />

          {isGameOver && (
            <div className="text-center pt-4">
              <Button 
                onClick={resetGame} 
                className="w-full py-3 text-lg font-semibold bg-green-600 hover:bg-green-700"
              >
                🎮 Play Again
              </Button>
            </div>
          )}

          {gameStatus === 'playing' && guessHistory.length > 0 && (
            <div className="text-center">
              <Button 
                onClick={resetGame} 
                variant="outline"
                className="text-gray-600 hover:text-gray-800"
              >
                Start New Game
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Built with React + Vite • Professional Number Guessing Game</p>
        </div>
      </div>
    </div>
  );
};

export default App;

