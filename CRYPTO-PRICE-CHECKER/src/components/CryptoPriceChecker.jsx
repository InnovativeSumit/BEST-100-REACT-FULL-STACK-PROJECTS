// src/components/CryptoPriceChecker.jsx
import React, { useState, useEffect, useCallback } from 'react';

const CryptoPriceChecker = () => {
  const [prices, setPrices] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const cryptoData = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", color: "from-orange-400 to-orange-600" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", color: "from-blue-400 to-blue-600" },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", color: "from-yellow-400 to-yellow-600" },
    { id: "cardano", name: "Cardano", symbol: "ADA", color: "from-purple-400 to-purple-600" },
    { id: "litecoin", name: "Litecoin", symbol: "LTC", color: "from-gray-400 to-gray-600" },
    { id: "solana", name: "Solana", symbol: "SOL", color: "from-green-400 to-green-600" },
    { id: "polkadot", name: "Polkadot", symbol: "DOT", color: "from-pink-400 to-pink-600" },
    { id: "chainlink", name: "Chainlink", symbol: "LINK", color: "from-indigo-400 to-indigo-600" }
  ];

  const fetchPrices = useCallback(async () => {
    try {
      setError(null);
      const cryptoIds = cryptoData.map(crypto => crypto.id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd&include_24hr_change=true`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      
      const data = await response.json();
      setPreviousPrices(prices);
      setPrices(data);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      setError("Unable to fetch cryptocurrency prices. Please check your internet connection and try again.");
      setLoading(false);
    }
  }, [prices]);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getPriceChange = (crypto) => {
    const current = prices[crypto.id]?.usd;
    const previous = previousPrices[crypto.id]?.usd;
    if (!current || !previous) return null;
    return ((current - previous) / previous) * 100;
  };

  const formatPrice = (price) => {
    if (!price) return "Loading...";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };

  const formatPercentage = (percentage) => {
    if (!percentage) return "";
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const RefreshIcon = ({ className, spinning }) => (
    <svg 
      className={`${className} ${spinning ? 'animate-spin' : ''}`} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );

  const TrendIcon = ({ isPositive, className }) => (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      {isPositive ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      )}
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CryptoTracker Pro
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Real-time cryptocurrency prices and market data
          </p>
          
          {/* Refresh Button */}
          <button
            onClick={fetchPrices}
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <RefreshIcon className="w-5 h-5 mr-2" spinning={loading} />
            {loading ? 'Updating...' : 'Refresh Prices'}
          </button>
          
          {lastUpdated && (
            <p className="text-gray-400 text-sm mt-3">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-center">
            <div className="text-red-400 font-medium mb-2">⚠️ Error</div>
            <div className="text-red-300">{error}</div>
          </div>
        )}

        {/* Crypto Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cryptoData.map((crypto, index) => {
            const price = prices[crypto.id]?.usd;
            const change24h = prices[crypto.id]?.usd_24h_change;
            const priceChange = getPriceChange(crypto);
            const isPositive = change24h >= 0;
            
            return (
              <div
                key={crypto.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: loading ? 'none' : 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Crypto Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${crypto.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {crypto.symbol.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{crypto.name}</h3>
                      <p className="text-gray-400 text-sm">{crypto.symbol}</p>
                    </div>
                  </div>
                  
                  {change24h !== undefined && (
                    <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      <TrendIcon isPositive={isPositive} className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatPrice(price)}
                  </div>
                  
                  {/* 24h Change */}
                  {change24h !== undefined && (
                    <div className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {formatPercentage(change24h)} (24h)
                    </div>
                  )}
                </div>

                {/* Price Change Indicator */}
                {priceChange !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">Since last update:</span>
                    <span className={`text-xs font-medium ${priceChange > 0 ? 'text-green-400' : priceChange < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                      {priceChange === 0 ? 'No change' : formatPercentage(priceChange)}
                    </span>
                  </div>
                )}

                {/* Loading State */}
                {loading && !price && (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="text-sm">
            Data provided by CoinGecko API • Updates every 30 seconds
          </p>
          <p className="text-xs mt-2">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CryptoPriceChecker;

