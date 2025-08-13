import React, { useState, useEffect } from 'react'
import './Home.css'

const Home = () => {
  const [isFlipping, setIsFlipping] = useState(false)
  const [result, setResult] = useState(null)
  const [tails, setTails] = useState(0)
  const [heads, setHeads] = useState(0)
  const [totalFlips, setTotalFlips] = useState(0)
  const [showStats, setShowStats] = useState(false)
  const [flipHistory, setFlipHistory] = useState([])

  const handleFlip = () => {
    if (isFlipping) return // Prevent multiple flips during animation
    
    setIsFlipping(true)
    setResult(null)
    
    // Simulate coin flip after animation duration
    setTimeout(() => {
      const isHeads = Math.random() < 0.5
      const newResult = isHeads ? 'heads' : 'tails'
      
      setResult(newResult)
      setTotalFlips(prev => prev + 1)
      
      if (isHeads) {
        setHeads(prev => prev + 1)
      } else {
        setTails(prev => prev + 1)
      }
      
      // Add to history (keep last 10 flips)
      setFlipHistory(prev => [newResult, ...prev.slice(0, 9)])
      
      setIsFlipping(false)
    }, 2000) // 2 second animation
  }

  const resetStats = () => {
    setTails(0)
    setHeads(0)
    setTotalFlips(0)
    setResult(null)
    setFlipHistory([])
    setShowStats(false)
  }

  const getWinPercentage = (wins) => {
    return totalFlips > 0 ? ((wins / totalFlips) * 100).toFixed(1) : 0
  }

  return (
    <div className="app-container">
      <div className="background-animation"></div>
      
      <header className="header">
        <h1 className="title">🪙 Coin Flipper Pro</h1>
        <p className="subtitle">Test your luck with our interactive coin flipper!</p>
      </header>

      <main className="main-content">
        <div className="coin-container">
          <div className={`coin ${isFlipping ? 'flipping' : ''} ${result ? result : ''}`}>
            <div className="coin-side heads">
              <div className="coin-inner">
                <div className="coin-text">H</div>
                <div className="coin-pattern"></div>
              </div>
            </div>
            <div className="coin-side tails">
              <div className="coin-inner">
                <div className="coin-text">T</div>
                <div className="coin-pattern"></div>
              </div>
            </div>
          </div>
          
          {result && !isFlipping && (
            <div className={`result-display ${result}`}>
              <div className="result-text">
                {result === 'heads' ? '👑 HEADS!' : '🔥 TAILS!'}
              </div>
            </div>
          )}
        </div>

        <div className="controls">
          <button 
            className={`flip-button ${isFlipping ? 'flipping' : ''}`}
            onClick={handleFlip}
            disabled={isFlipping}
          >
            {isFlipping ? (
              <>
                <span className="spinner"></span>
                Flipping...
              </>
            ) : (
              <>
                <span className="flip-icon">🎯</span>
                Flip Coin
              </>
            )}
          </button>
          
          <button 
            className="stats-button"
            onClick={() => setShowStats(!showStats)}
          >
            📊 {showStats ? 'Hide' : 'Show'} Stats
          </button>
          
          {totalFlips > 0 && (
            <button className="reset-button" onClick={resetStats}>
              🔄 Reset
            </button>
          )}
        </div>

        {showStats && totalFlips > 0 && (
          <div className="stats-panel">
            <h3>📈 Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card heads-stat">
                <div className="stat-icon">👑</div>
                <div className="stat-info">
                  <div className="stat-label">Heads</div>
                  <div className="stat-value">{heads}</div>
                  <div className="stat-percentage">{getWinPercentage(heads)}%</div>
                </div>
              </div>
              
              <div className="stat-card tails-stat">
                <div className="stat-icon">🔥</div>
                <div className="stat-info">
                  <div className="stat-label">Tails</div>
                  <div className="stat-value">{tails}</div>
                  <div className="stat-percentage">{getWinPercentage(tails)}%</div>
                </div>
              </div>
              
              <div className="stat-card total-stat">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <div className="stat-label">Total Flips</div>
                  <div className="stat-value">{totalFlips}</div>
                  <div className="stat-percentage">100%</div>
                </div>
              </div>
            </div>
            
            {flipHistory.length > 0 && (
              <div className="flip-history">
                <h4>Recent Flips</h4>
                <div className="history-list">
                  {flipHistory.map((flip, index) => (
                    <span 
                      key={index} 
                      className={`history-item ${flip}`}
                      title={flip === 'heads' ? 'Heads' : 'Tails'}
                    >
                      {flip === 'heads' ? '👑' : '🔥'}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Made with ❤️ for coin flip enthusiasts</p>
      </footer>
    </div>
  )
}

export default Home

