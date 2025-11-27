// src/components/ColorGuesser.jsx
import React, { useState, useEffect } from 'react';

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b, rgb: `rgb(${r}, ${g}, ${b})` };
};

const ColorGuesser = () => {
  const [targetColor, setTargetColor] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'correct', 'incorrect'
  const [difficulty, setDifficulty] = useState('medium');

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  const generateSimilarColor = (baseColor, variance) => {
    const r = Math.max(0, Math.min(255, baseColor.r + (Math.random() - 0.5) * variance));
    const g = Math.max(0, Math.min(255, baseColor.g + (Math.random() - 0.5) * variance));
    const b = Math.max(0, Math.min(255, baseColor.b + (Math.random() - 0.5) * variance));
    return { r: Math.floor(r), g: Math.floor(g), b: Math.floor(b), rgb: `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})` };
  };

  const resetGame = () => {
    const newTargetColor = generateRandomColor();
    let newOptions = [newTargetColor];
    
    // Generate similar colors based on difficulty
    const variance = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 50 : 25;
    
    for (let i = 0; i < 2; i++) {
      newOptions.push(generateSimilarColor(newTargetColor, variance));
    }
    
    // Shuffle options
    newOptions = newOptions.sort(() => Math.random() - 0.5);
    
    setTargetColor(newTargetColor);
    setOptions(newOptions);
    setMessage('');
    setGameState('playing');
  };

  const handleGuess = (color) => {
    setAttempts(prev => prev + 1);
    
    if (color.rgb === targetColor.rgb) {
      setMessage('Excellent! Perfect match! 🎉');
      setScore(prev => prev + 1);
      setGameState('correct');
      setTimeout(() => {
        resetGame();
      }, 2000);
    } else {
      setMessage('Not quite right. Try again! 🤔');
      setGameState('incorrect');
      setTimeout(() => {
        setGameState('playing');
        setMessage('');
      }, 1500);
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 hover:bg-green-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'hard': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          RGB Color Challenge
        </h1>
        <p className="text-gray-600 text-lg">Test your color perception skills</p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8 mb-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{score}</div>
          <div className="text-sm text-gray-500">Correct</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{attempts}</div>
          <div className="text-sm text-gray-500">Attempts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
          </div>
          <div className="text-sm text-gray-500">Accuracy</div>
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          {['easy', 'medium', 'hard'].map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                difficulty === level
                  ? 'bg-white shadow-md text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Target Color Display */}
      {targetColor && (
        <div className="text-center mb-8">
          <div className="text-lg text-gray-700 mb-2">Match this RGB color:</div>
          <div className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-mono text-xl font-bold tracking-wider">
            rgb({targetColor.r}, {targetColor.g}, {targetColor.b})
          </div>
        </div>
      )}

      {/* Color Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {options.map((color, index) => (
          <button
            key={index}
            onClick={() => gameState === 'playing' && handleGuess(color)}
            disabled={gameState !== 'playing'}
            style={{ backgroundColor: color.rgb }}
            className={`
              aspect-square rounded-2xl border-4 transition-all duration-300 transform
              ${gameState === 'playing' 
                ? 'border-gray-300 hover:border-gray-400 hover:scale-105 hover:shadow-lg cursor-pointer' 
                : 'border-gray-200 cursor-not-allowed'
              }
              ${gameState === 'correct' && color.rgb === targetColor.rgb 
                ? 'ring-4 ring-green-400 ring-opacity-75 scale-105' 
                : ''
              }
              active:scale-95
            `}
            title={`RGB: ${color.rgb}`}
          >
            <div className="w-full h-full rounded-xl flex items-center justify-center">
              <span className="bg-black bg-opacity-20 text-white text-xs px-2 py-1 rounded font-mono opacity-0 hover:opacity-100 transition-opacity">
                {color.rgb}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Message Display */}
      <div className="text-center mb-6">
        <div className={`
          text-xl font-semibold transition-all duration-300 min-h-[2rem]
          ${gameState === 'correct' ? 'text-green-600 animate-pulse' : ''}
          ${gameState === 'incorrect' ? 'text-orange-600' : ''}
          ${gameState === 'playing' ? 'text-gray-600' : ''}
        `}>
          {message}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={resetGame}
          className={`
            px-8 py-3 text-white font-semibold rounded-lg transition-all duration-200 transform
            ${getDifficultyColor()}
            hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl
          `}
        >
          New Challenge
        </button>
        <button
          onClick={() => {
            setScore(0);
            setAttempts(0);
            resetGame();
          }}
          className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Reset Score
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">How to Play:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Look at the RGB values displayed above</li>
          <li>• Click on the color square that matches those RGB values</li>
          <li>• Choose your difficulty level to adjust the challenge</li>
          <li>• Try to achieve the highest accuracy percentage!</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorGuesser;

