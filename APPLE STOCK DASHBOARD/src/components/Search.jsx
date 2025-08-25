import { useState, useContext, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search as SearchIcon, X, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import StockContext from '../contexts/StockContext'
import { searchSymbols } from '../utils/api/stock-api'

const Search = () => {
  const { stockSymbol, setStockSymbol } = useContext(StockContext)
  const [input, setInput] = useState('')
  const [bestMatches, setBestMatches] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const updateBestMatches = async () => {
    if (input.length < 2) {
      setBestMatches([])
      setShowResults(false)
      return
    }

    setLoading(true)
    try {
      const result = await searchSymbols(input)
      setBestMatches(result.result || [])
      setShowResults(true)
    } catch (error) {
      console.error('Search error:', error)
      setBestMatches([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateBestMatches()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [input])

  const handleStockSelect = (symbol) => {
    setStockSymbol(symbol)
    setInput('')
    setShowResults(false)
    setBestMatches([])
  }

  const clearSearch = () => {
    setInput('')
    setBestMatches([])
    setShowResults(false)
  }

  return (
    <div className="relative" ref={searchRef}>
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search stocks (e.g., AAPL, MSFT, TSLA)..."
            className="pl-12 pr-12 h-14 text-lg bg-card/50 backdrop-blur-sm border-2 border-border/50 rounded-2xl focus:border-primary/50 transition-all duration-300"
          />
          {input && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-destructive/10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto"
          >
            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-2">Searching...</p>
              </div>
            ) : bestMatches.length > 0 ? (
              <div className="p-2">
                {bestMatches.slice(0, 8).map((item, index) => (
                  <motion.button
                    key={item.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleStockSelect(item.symbol)}
                    className="w-full p-4 text-left hover:bg-muted/50 rounded-xl transition-all duration-200 flex items-center space-x-3 group"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-foreground">{item.symbol}</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded-md">{item.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                <SearchIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No results found for "{input}"</p>
                <p className="text-sm mt-1">Try searching for a stock symbol or company name</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Search

