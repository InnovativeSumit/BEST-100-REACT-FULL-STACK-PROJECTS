import React, { useState, useEffect } from 'react';
import './App.css';

const GreetingApp = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    occasion: 'general',
    timeOfDay: 'any'
  });
  const [showGreeting, setShowGreeting] = useState(false);
  const [generatedGreeting, setGeneratedGreeting] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [greetingHistory, setGreetingHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const occasions = [
    { value: 'general', label: 'General Greeting' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'holiday', label: 'Holiday' },
    { value: 'congratulations', label: 'Congratulations' },
    { value: 'welcome', label: 'Welcome' },
    { value: 'farewell', label: 'Farewell' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'get_well', label: 'Get Well Soon' }
  ];

  const timeOfDayOptions = [
    { value: 'any', label: 'Any Time' },
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
    { value: 'night', label: 'Night' }
  ];

  const greetingTemplates = {
    general: {
      morning: [
        "Good morning, {name}! Hope your day in {location} starts wonderfully!",
        "Rise and shine, {name}! Wishing you a fantastic morning from {location}!",
        "Hello {name}! May this beautiful morning in {location} bring you joy!"
      ],
      afternoon: [
        "Good afternoon, {name}! Hope you're having a great day in {location}!",
        "Hello {name}! Sending warm afternoon greetings to {location}!",
        "Hi there, {name}! Hope your afternoon in {location} is going splendidly!"
      ],
      evening: [
        "Good evening, {name}! Hope you're enjoying a lovely evening in {location}!",
        "Hello {name}! Wishing you a peaceful evening from {location}!",
        "Hi {name}! May your evening in {location} be filled with happiness!"
      ],
      night: [
        "Good night, {name}! Sweet dreams from {location}!",
        "Hello {name}! Wishing you a restful night in {location}!",
        "Hi there, {name}! Hope you have a wonderful night in {location}!"
      ],
      any: [
        "Hello, {name}! It's wonderful to meet someone from {location}!",
        "Hi {name}! Greetings from afar to beautiful {location}!",
        "Welcome, {name}! Hope you're having a great time in {location}!"
      ]
    },
    birthday: {
      any: [
        "🎉 Happy Birthday, {name}! Hope your special day in {location} is absolutely amazing!",
        "🎂 Wishing you the happiest of birthdays, {name}! Celebrate big in {location}!",
        "🎈 Happy {age}th Birthday, {name}! May this year bring you joy in {location} and beyond!"
      ]
    },
    holiday: {
      any: [
        "🎄 Season's Greetings, {name}! Hope the holidays are magical in {location}!",
        "✨ Happy Holidays, {name}! Wishing you warmth and joy in {location}!",
        "🎊 Holiday wishes to you, {name}! May your celebrations in {location} be wonderful!"
      ]
    },
    congratulations: {
      any: [
        "🎉 Congratulations, {name}! Your achievements make {location} proud!",
        "👏 Well done, {name}! Celebrating your success all the way from {location}!",
        "🌟 Congratulations, {name}! Your hard work has paid off beautifully!"
      ]
    },
    welcome: {
      any: [
        "🤝 Welcome, {name}! So glad to have you here in {location}!",
        "👋 A warm welcome to you, {name}! Hope you love your time in {location}!",
        "🌟 Welcome aboard, {name}! Excited to have you join us in {location}!"
      ]
    },
    farewell: {
      any: [
        "👋 Farewell, {name}! Wishing you all the best as you leave {location}!",
        "🌈 Goodbye, {name}! May your journey from {location} be filled with adventure!",
        "💫 Safe travels, {name}! {location} will miss you, but exciting things await!"
      ]
    },
    anniversary: {
      any: [
        "🎂 Happy Anniversary, {name}! Celebrating your special milestone in {location}!",
        "💕 Wishing you a wonderful anniversary, {name}! May {location} be filled with love!",
        "🎉 Happy Anniversary to you, {name}! Here's to many more years of happiness in {location}!"
      ]
    },
    get_well: {
      any: [
        "💪 Get well soon, {name}! Sending healing thoughts from {location}!",
        "🌸 Wishing you a speedy recovery, {name}! {location} is rooting for you!",
        "💙 Hope you feel better soon, {name}! Take care and rest well in {location}!"
      ]
    }
  };

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Load greeting history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('greetingHistory');
    if (savedHistory) {
      setGreetingHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Save greeting history
  useEffect(() => {
    localStorage.setItem('greetingHistory', JSON.stringify(greetingHistory));
  }, [greetingHistory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateGreeting = () => {
    const { name, age, location, occasion, timeOfDay } = formData;
    const templates = greetingTemplates[occasion];
    const timeTemplates = templates[timeOfDay] || templates.any;
    const randomTemplate = timeTemplates[Math.floor(Math.random() * timeTemplates.length)];
    
    return randomTemplate
      .replace('{name}', name)
      .replace('{age}', age)
      .replace('{location}', location);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    
    setTimeout(() => {
      const greeting = generateGreeting();
      setGeneratedGreeting(greeting);
      setShowGreeting(true);
      setIsAnimating(false);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        greeting: greeting,
        name: formData.name,
        occasion: formData.occasion,
        timestamp: new Date().toLocaleString()
      };
      setGreetingHistory(prev => [historyItem, ...prev.slice(0, 19)]);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      location: '',
      occasion: 'general',
      timeOfDay: 'any'
    });
    setShowGreeting(false);
    setGeneratedGreeting('');
    setIsAnimating(false);
  };

  const generateAnother = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const greeting = generateGreeting();
      setGeneratedGreeting(greeting);
      setIsAnimating(false);
    }, 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedGreeting).then(() => {
      setCopied(true);
      showNotif('Greeting copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadAsText = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedGreeting], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `greeting_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showNotif('Greeting downloaded!');
  };

  const showNotif = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const deleteHistoryItem = (id) => {
    setGreetingHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setGreetingHistory([]);
      showNotif('History cleared!');
    }
  };

  const restoreFromHistory = (item) => {
    setGeneratedGreeting(item.greeting);
    setShowGreeting(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-6 py-3 rounded-lg shadow-lg font-semibold ${
            darkMode 
              ? 'bg-green-600 text-white' 
              : 'bg-green-500 text-white'
          }`}>
            {notificationMessage}
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {isAnimating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-8 text-center shadow-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Generating your perfect greeting...
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-5xl px-4">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center pt-6 pb-8">
          <div className="text-center flex-1">
            <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              🌟 Greeting Generator
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Create personalized greetings for any occasion
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full transition-all duration-300 ${
              darkMode 
                ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
                : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
            }`}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            {!showGreeting ? (
              <div className={`shadow-xl rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800 bg-opacity-95' 
                  : 'bg-white bg-opacity-95'
              }`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block font-semibold mb-2 ${
                        darkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        👤 Name *
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name} 
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                            : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                        }`}
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <label className={`block font-semibold mb-2 ${
                        darkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        🎂 Age *
                      </label>
                      <input 
                        type="number" 
                        name="age"
                        value={formData.age} 
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                            : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                        }`}
                        placeholder="Enter your age"
                        min="1"
                        max="120"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      📍 Location *
                    </label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location} 
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                          : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                      }`}
                      placeholder="Enter your city or country"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block font-semibold mb-2 ${
                        darkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        🎯 Occasion
                      </label>
                      <select 
                        name="occasion"
                        value={formData.occasion} 
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                            : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                        }`}
                      >
                        {occasions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`block font-semibold mb-2 ${
                        darkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        🕐 Time of Day
                      </label>
                      <select 
                        name="timeOfDay"
                        value={formData.timeOfDay} 
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                            : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                        }`}
                      >
                        {timeOfDayOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
                  >
                    ✨ Generate My Greeting
                  </button>
                </form>
              </div>
            ) : (
              <div className={`shadow-xl rounded-2xl p-8 backdrop-blur-sm text-center transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800 bg-opacity-95' 
                  : 'bg-white bg-opacity-95'
              }`}>
                <div className="mb-6">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className={`text-2xl font-bold mb-6 ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Your Personalized Greeting
                  </h2>
                </div>
                
                <div className={`rounded-xl p-6 mb-6 transition-colors ${
                  darkMode
                    ? 'bg-gray-700'
                    : 'bg-gradient-to-r from-blue-50 to-purple-50'
                }`}>
                  <p className={`text-lg leading-relaxed font-medium ${
                    darkMode ? 'text-gray-100' : 'text-gray-700'
                  }`}>
                    {generatedGreeting}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                  <button 
                    onClick={copyToClipboard} 
                    className={`py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-2 ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                    }`}
                  >
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                  <button 
                    onClick={downloadAsText} 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-2"
                  >
                    📥 Download
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={generateAnother} 
                    className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-lg shadow-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 font-semibold"
                  >
                    🔄 Generate Another
                  </button>
                  <button 
                    onClick={resetForm} 
                    className={`py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold ${
                      darkMode
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700'
                    }`}
                  >
                    🔙 Start Over
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* History Sidebar */}
          <div className={`shadow-xl rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-800 bg-opacity-95' 
              : 'bg-white bg-opacity-95'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                📜 History
              </h3>
              {greetingHistory.length > 0 && (
                <button
                  onClick={clearAllHistory}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  title="Clear all history"
                >
                  🗑️
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {greetingHistory.length === 0 ? (
                <p className={`text-center py-8 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  No greetings yet. Generate one to get started!
                </p>
              ) : (
                greetingHistory.map(item => (
                  <div 
                    key={item.id} 
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div 
                        onClick={() => restoreFromHistory(item)}
                        className="flex-1"
                      >
                        <p className={`text-sm font-semibold ${
                          darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {item.name}
                        </p>
                        <p className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {item.occasion}
                        </p>
                        <p className={`text-xs mt-1 ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {item.timestamp}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteHistoryItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-lg"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center py-8 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p>Made with ❤️ for spreading joy and positivity</p>
          <p className="text-sm mt-2">v1.0.0 - Professional Greeting Generator</p>
        </div>
      </div>
    </div>
  );
};

export default GreetingApp;
