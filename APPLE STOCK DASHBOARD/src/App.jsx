import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import StockContext from './contexts/StockContext'
import ThemeContext from './contexts/ThemeContext'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      return JSON.parse(saved)
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  
  const [stockSymbol, setStockSymbol] = useState('AAPL')

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Dashboard />
        </div>
      </StockContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App

