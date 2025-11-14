import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';

const NumberInput = ({ onSubmit, disabled }) => {
  const [guess, setGuess] = useState('');

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (guess && !isNaN(guess) && guess >= 1 && guess <= 25) {
      onSubmit(guess);
      setGuess('');
    } else {
      alert("Please enter a valid number between 1 and 25.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        value={guess}
        onChange={handleChange}
        placeholder="Enter your guess (1-25)"
        min="1"
        max="25"
        disabled={disabled}
        className='w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed'
      />
      <Button 
        type="submit" 
        disabled={disabled || !guess}
        className='w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400'
      >
        Submit Guess
      </Button>
    </form>
  );
};

export default NumberInput;

