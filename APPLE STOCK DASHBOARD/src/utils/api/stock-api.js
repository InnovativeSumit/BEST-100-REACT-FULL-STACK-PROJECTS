// Stock API configuration
const API_KEY = 'demo' // Using demo key for development
const BASE_URL = 'https://finnhub.io/api/v1'

// Helper function to make API requests
const apiRequest = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}&token=${API_KEY}`)
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

// Enhanced mock stock data with more realistic information
const MOCK_STOCKS = {
  'AAPL': {
    name: 'Apple Inc',
    country: 'US',
    currency: 'USD',
    exchange: 'NASDAQ',
    ipo: '1980-12-12',
    marketCapitalization: 3000000,
    shareOutstanding: 15000000,
    finnhubIndustry: 'Technology',
    weburl: 'https://www.apple.com',
    logo: 'https://logo.clearbit.com/apple.com',
    currentPrice: 193.56,
    previousClose: 190.24,
    dayChange: 3.32,
    dayChangePercent: 1.71
  },
  'MSFT': {
    name: 'Microsoft Corporation',
    country: 'US',
    currency: 'USD',
    exchange: 'NASDAQ',
    ipo: '1986-03-13',
    marketCapitalization: 2800000,
    shareOutstanding: 7400000,
    finnhubIndustry: 'Technology',
    weburl: 'https://www.microsoft.com',
    logo: 'https://logo.clearbit.com/microsoft.com',
    currentPrice: 415.75,
    previousClose: 420.27,
    dayChange: -4.52,
    dayChangePercent: -1.08
  },
  'GOOGL': {
    name: 'Alphabet Inc',
    country: 'US',
    currency: 'USD',
    exchange: 'NASDAQ',
    ipo: '2004-08-19',
    marketCapitalization: 1800000,
    shareOutstanding: 13000000,
    finnhubIndustry: 'Technology',
    weburl: 'https://www.alphabet.com',
    logo: 'https://logo.clearbit.com/google.com',
    currentPrice: 175.32,
    previousClose: 173.89,
    dayChange: 1.43,
    dayChangePercent: 0.82
  },
  'TSLA': {
    name: 'Tesla Inc',
    country: 'US',
    currency: 'USD',
    exchange: 'NASDAQ',
    ipo: '2010-06-29',
    marketCapitalization: 800000,
    shareOutstanding: 3200000,
    finnhubIndustry: 'Automotive',
    weburl: 'https://www.tesla.com',
    logo: 'https://logo.clearbit.com/tesla.com',
    currentPrice: 248.87,
    previousClose: 252.14,
    dayChange: -3.27,
    dayChangePercent: -1.30
  },
  'AMZN': {
    name: 'Amazon.com Inc',
    country: 'US',
    currency: 'USD',
    exchange: 'NASDAQ',
    ipo: '1997-05-15',
    marketCapitalization: 1500000,
    shareOutstanding: 10500000,
    finnhubIndustry: 'Consumer Cyclical',
    weburl: 'https://www.amazon.com',
    logo: 'https://logo.clearbit.com/amazon.com',
    currentPrice: 145.86,
    previousClose: 147.23,
    dayChange: -1.37,
    dayChangePercent: -0.93
  },
  'NVDA': {
    name: 'NVIDIA Corporation',
    country: 'US',
    currency: 'USD',
    exchange: 'NASDAQ',
    ipo: '1999-01-22',
    marketCapitalization: 2200000,
    shareOutstanding: 24600000,
    finnhubIndustry: 'Technology',
    weburl: 'https://www.nvidia.com',
    logo: 'https://logo.clearbit.com/nvidia.com',
    currentPrice: 125.61,
    previousClose: 123.45,
    dayChange: 2.16,
    dayChangePercent: 1.75
  }
}

// Search for stock symbols
export const searchSymbols = async (query) => {
  try {
    return await apiRequest(`/search?q=${encodeURIComponent(query)}`)
  } catch (error) {
    // Return enhanced mock data on error
    const mockResults = Object.entries(MOCK_STOCKS)
      .filter(([symbol, data]) => 
        symbol.toLowerCase().includes(query.toLowerCase()) ||
        data.name.toLowerCase().includes(query.toLowerCase())
      )
      .map(([symbol, data]) => ({
        symbol,
        description: data.name,
        type: 'Common Stock'
      }))

    return { result: mockResults }
  }
}

// Get stock details/profile
export const fetchStockDetails = async (symbol) => {
  try {
    return await apiRequest(`/stock/profile2?symbol=${symbol}`)
  } catch (error) {
    // Return enhanced mock data on error
    const mockData = MOCK_STOCKS[symbol]
    if (mockData) {
      return {
        name: mockData.name,
        country: mockData.country,
        currency: mockData.currency,
        exchange: mockData.exchange,
        ipo: mockData.ipo,
        marketCapitalization: mockData.marketCapitalization,
        shareOutstanding: mockData.shareOutstanding,
        finnhubIndustry: mockData.finnhubIndustry,
        weburl: mockData.weburl,
        logo: mockData.logo
      }
    }
    
    return {
      name: `${symbol} Inc`,
      country: 'US',
      currency: 'USD',
      exchange: 'NASDAQ',
      finnhubIndustry: 'Technology'
    }
  }
}

// Get current stock quote
export const fetchQuote = async (symbol) => {
  try {
    return await apiRequest(`/quote?symbol=${symbol}`)
  } catch (error) {
    // Return enhanced mock data on error
    const mockData = MOCK_STOCKS[symbol]
    if (mockData) {
      return {
        pc: mockData.previousClose, // Previous close
        c: mockData.currentPrice,   // Current price
        d: mockData.dayChange,      // Change
        dp: mockData.dayChangePercent // Change percent
      }
    }

    // Generate random data for unknown symbols
    const basePrice = Math.random() * 200 + 50
    const change = (Math.random() - 0.5) * 10
    const changePercent = (change / basePrice) * 100
    
    return {
      pc: parseFloat(basePrice.toFixed(2)), // Previous close
      c: parseFloat((basePrice + change).toFixed(2)), // Current price
      d: parseFloat(change.toFixed(2)), // Change
      dp: parseFloat(changePercent.toFixed(2)) // Change percent
    }
  }
}

// Get historical stock data with improved change calculations
export const fetchHistoricalData = async (symbol, resolution, days) => {
  try {
    const to = Math.floor(Date.now() / 1000)
    const from = to - (days * 24 * 60 * 60)
    
    return await apiRequest(`/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`)
  } catch (error) {
    // Return enhanced mock data on error
    const mockData = MOCK_STOCKS[symbol]
    const basePrice = mockData ? mockData.currentPrice : 150
    
    // Generate more realistic historical data
    const dataPoints = days === 1 ? 24 : days === 7 ? 7 : days === 30 ? 30 : 52
    const now = Math.floor(Date.now() / 1000)
    const interval = days === 1 ? 3600 : days === 7 ? 86400 : days === 30 ? 86400 : 604800
    
    const timestamps = []
    const prices = []
    
    // Create more realistic price movements
    let currentPrice = basePrice
    for (let i = 0; i < dataPoints; i++) {
      const timestamp = now - (dataPoints - i - 1) * interval
      
      // Add some trend and volatility
      const trend = days === 365 ? (i - dataPoints/2) * 0.1 : 0
      const volatility = (Math.random() - 0.5) * (basePrice * 0.02) // 2% volatility
      const momentum = i > 0 ? (prices[i-1] - (i > 1 ? prices[i-2] : basePrice)) * 0.3 : 0
      
      currentPrice = basePrice + trend + volatility + momentum
      
      timestamps.push(timestamp)
      prices.push(parseFloat(Math.max(currentPrice, basePrice * 0.5).toFixed(2))) // Prevent negative prices
    }
    
    return {
      c: prices, // Close prices
      h: prices.map(p => p + Math.random() * 2), // High prices
      l: prices.map(p => p - Math.random() * 2), // Low prices
      o: prices.map((p, i) => i > 0 ? prices[i-1] : p), // Open prices
      t: timestamps, // Timestamps
      v: prices.map(() => Math.floor(Math.random() * 1000000)), // Volume
      s: 'ok' // Status
    }
  }
}

// Calculate period-specific changes (1W, 1M, etc.)
export const calculatePeriodChange = (historicalData, currentPrice) => {
  if (!historicalData || !historicalData.c || historicalData.c.length === 0) {
    return { change: 0, changePercent: 0 }
  }
  
  const startPrice = historicalData.c[0]
  const endPrice = currentPrice || historicalData.c[historicalData.c.length - 1]
  
  const change = endPrice - startPrice
  const changePercent = (change / startPrice) * 100
  
  return {
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2))
  }
}

// Get comprehensive stock data
export const fetchComprehensiveStockData = async (symbol) => {
  try {
    const [details, quote] = await Promise.all([
      fetchStockDetails(symbol),
      fetchQuote(symbol)
    ])
    
    return {
      details,
      quote,
      symbol
    }
  } catch (error) {
    console.error('Error fetching comprehensive stock data:', error)
    throw error
  }
}

