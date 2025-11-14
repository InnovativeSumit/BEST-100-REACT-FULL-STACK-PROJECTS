import React from 'react';

const ResultMessage = ({ message, type = 'default' }) => {
  const getMessageStyle = () => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'warning':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  if (!message) return null;

  return (
    <div className={`p-4 rounded-lg border-2 text-center font-medium ${getMessageStyle()}`}>
      {message}
    </div>
  );
};

export default ResultMessage;

