import React from 'react';

const GameStats = ({ remainingAttempts, totalAttempts, guessHistory }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-medium">Attempts Remaining:</span>
        <span className={`font-bold text-lg ${remainingAttempts <= 1 ? 'text-red-600' : 'text-blue-600'}`}>
          {remainingAttempts}
        </span>
      </div>
      
      {guessHistory.length > 0 && (
        <div>
          <span className="text-gray-600 font-medium block mb-2">Your Guesses:</span>
          <div className="flex flex-wrap gap-2">
            {guessHistory.map((guess, index) => (
              <span 
                key={index} 
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {guess}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStats;

