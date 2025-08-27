// src/components/FunFactGenerator.jsx
import React, { useState, useEffect } from 'react';

const FunFactGenerator = () => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('random');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [factHistory, setFactHistory] = useState([]);

  // Predefined facts for different categories
  const factCategories = {
    random: [
      "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
      "A group of flamingos is called a 'flamboyance'.",
      "Bananas are berries, but strawberries aren't.",
      "The shortest war in history lasted only 38-45 minutes between Britain and Zanzibar in 1896.",
      "Octopuses have three hearts and blue blood.",
      "A single cloud can weigh more than a million pounds.",
      "The human brain uses about 20% of the body's total energy.",
      "There are more possible games of chess than atoms in the observable universe."
    ],
    science: [
      "Light takes 8 minutes and 20 seconds to travel from the Sun to Earth.",
      "A teaspoon of neutron star material would weigh about 6 billion tons.",
      "The human body contains approximately 37.2 trillion cells.",
      "Water can exist in three states simultaneously at its triple point.",
      "The speed of light is exactly 299,792,458 meters per second.",
      "DNA is 99.9% identical between all humans.",
      "The Earth's core is as hot as the surface of the Sun.",
      "Quantum entanglement allows particles to instantly affect each other across vast distances."
    ],
    animals: [
      "Dolphins have names for each other - unique whistle signatures.",
      "Elephants can recognize themselves in mirrors, showing self-awareness.",
      "A shrimp's heart is in its head.",
      "Penguins propose to their mates with pebbles.",
      "Cats have a special scent organ called the Jacobson's organ in their mouths.",
      "Butterflies taste with their feet.",
      "A group of owls is called a 'parliament'.",
      "Koalas sleep 18-22 hours per day."
    ],
    space: [
      "One day on Venus is longer than one year on Venus.",
      "Jupiter has 95 known moons, with four large ones discovered by Galileo.",
      "The Milky Way galaxy is on a collision course with the Andromeda galaxy.",
      "A day on Mars is 24 hours and 37 minutes long.",
      "Saturn's moon Titan has lakes and rivers of liquid methane.",
      "The International Space Station orbits Earth every 90 minutes.",
      "Black holes can slow down time due to their immense gravity.",
      "The universe is approximately 13.8 billion years old."
    ],
    history: [
      "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.",
      "The Great Wall of China isn't visible from space with the naked eye.",
      "Napoleon was actually average height for his time at 5'7\".",
      "The first computer bug was an actual bug - a moth trapped in a computer relay.",
      "Oxford University is older than the Aztec Empire.",
      "The last mammoth died just 4,000 years ago on Wrangel Island.",
      "Ancient Romans used urine as mouthwash due to its ammonia content.",
      "The shortest presidency in US history was William Henry Harrison's at 31 days."
    ]
  };

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('funFactFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('funFactDarkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    // Save favorites to localStorage
    localStorage.setItem('funFactFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    // Save dark mode preference
    localStorage.setItem('funFactDarkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const getRandomFact = () => {
    const facts = factCategories[category];
    const randomIndex = Math.floor(Math.random() * facts.length);
    return facts[randomIndex];
  };

  const fetchFunFact = async () => {
    setLoading(true);
    setCopied(false);
    
    try {
      let newFact;
      
      if (category === 'random') {
        // Try to fetch from API first, fallback to local facts
        try {
          const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
          const data = await response.json();
          newFact = data.text;
        } catch (apiError) {
          newFact = getRandomFact();
        }
      } else {
        newFact = getRandomFact();
      }
      
      setFact(newFact);
      
      // Add to history (keep last 10)
      setFactHistory(prev => {
        const updated = [newFact, ...prev.filter(f => f !== newFact)];
        return updated.slice(0, 10);
      });
      
    } catch (error) {
      setFact("Couldn't fetch a fact. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (fact) {
      try {
        await navigator.clipboard.writeText(fact);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const addToFavorites = () => {
    if (fact && !favorites.includes(fact)) {
      setFavorites(prev => [...prev, fact]);
    }
  };

  const removeFromFavorites = (factToRemove) => {
    setFavorites(prev => prev.filter(f => f !== factToRemove));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const themeClasses = darkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800';

  const cardClasses = darkMode
    ? 'bg-gray-800 border-gray-700 shadow-2xl'
    : 'bg-white border-gray-200 shadow-xl';

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎯 Fun Fact Generator
          </h1>
          <p className="text-lg opacity-80">
            Discover amazing facts from around the world!
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              darkMode 
                ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              darkMode 
                ? 'bg-red-600 hover:bg-red-500' 
                : 'bg-red-500 hover:bg-red-600'
            } text-white`}
          >
            ❤️ Favorites ({favorites.length})
          </button>
        </div>

        {/* Category Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(factCategories).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full transition-all duration-300 capitalize ${
                category === cat
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat === 'random' ? '🎲' : cat === 'science' ? '🔬' : cat === 'animals' ? '🐾' : cat === 'space' ? '🚀' : '📚'} {cat}
            </button>
          ))}
        </div>

        {/* Main Fact Card */}
        {!showFavorites && (
          <div className={`max-w-4xl mx-auto p-8 rounded-2xl border transition-all duration-500 ${cardClasses}`}>
            <div className="text-center">
              <div className="mb-6">
                <div className={`text-6xl mb-4 ${loading ? 'animate-spin' : 'animate-bounce'}`}>
                  {loading ? '⏳' : category === 'science' ? '🔬' : category === 'animals' ? '🐾' : category === 'space' ? '🚀' : category === 'history' ? '📚' : '🎯'}
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  {category.charAt(0).toUpperCase() + category.slice(1)} Fun Fact
                </h2>
              </div>
              
              <div className={`text-lg leading-relaxed mb-8 p-6 rounded-xl ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              } transition-all duration-300`}>
                {fact || "Click the button below to discover an amazing fact!"}
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <button
                  onClick={fetchFunFact}
                  disabled={loading}
                  className={`px-8 py-3 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Loading...
                    </span>
                  ) : (
                    '✨ Generate New Fact'
                  )}
                </button>
                
                {fact && (
                  <>
                    <button
                      onClick={copyToClipboard}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        copied 
                          ? 'bg-green-500 text-white' 
                          : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {copied ? '✅ Copied!' : '📋 Copy'}
                    </button>
                    
                    <button
                      onClick={addToFavorites}
                      disabled={favorites.includes(fact)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        favorites.includes(fact)
                          ? 'bg-red-500 text-white cursor-not-allowed'
                          : darkMode
                            ? 'bg-red-600 text-white hover:bg-red-500'
                            : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {favorites.includes(fact) ? '❤️ Saved' : '🤍 Save'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Favorites View */}
        {showFavorites && (
          <div className={`max-w-4xl mx-auto p-8 rounded-2xl border transition-all duration-500 ${cardClasses}`}>
            <h2 className="text-3xl font-bold text-center mb-6">❤️ Your Favorite Facts</h2>
            {favorites.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">💔</div>
                <p className="text-xl opacity-70">No favorites yet! Start saving some amazing facts.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {favorites.map((favFact, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <p className="mb-3">{favFact}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(favFact)}
                        className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        📋 Copy
                      </button>
                      <button
                        onClick={() => removeFromFavorites(favFact)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recent Facts History */}
        {!showFavorites && factHistory.length > 0 && (
          <div className={`max-w-4xl mx-auto mt-8 p-6 rounded-2xl border transition-all duration-500 ${cardClasses}`}>
            <h3 className="text-xl font-bold mb-4 text-center">📚 Recent Facts</h3>
            <div className="grid gap-3 max-h-60 overflow-y-auto">
              {factHistory.slice(1).map((historyFact, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm cursor-pointer transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setFact(historyFact)}
                >
                  {historyFact.length > 100 ? historyFact.substring(0, 100) + '...' : historyFact}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 opacity-70">
          <p>Made with ❤️ for curious minds</p>
          <p className="text-sm mt-2">Discover something new every day!</p>
        </div>
      </div>
    </div>
  );
};

export default FunFactGenerator;

