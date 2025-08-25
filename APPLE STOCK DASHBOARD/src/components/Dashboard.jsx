import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ThemeContext from '../contexts/ThemeContext'
import StockContext from '../contexts/StockContext'
import Header from './Header'
import Overview from './Overview'
import Chart from './Chart'
import Details from './Details'
import Search from './Search'
import { fetchStockDetails, fetchQuote } from '../utils/api/stock-api'

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext)
  const { stockSymbol } = useContext(StockContext)
  
  const [stockDetails, setStockDetails] = useState({})
  const [quote, setQuote] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const updateStockData = async () => {
      if (!stockSymbol) return
      
      setLoading(true)
      setError(null)
      
      try {
        const [detailsResult, quoteResult] = await Promise.all([
          fetchStockDetails(stockSymbol),
          fetchQuote(stockSymbol)
        ])
        
        setStockDetails(detailsResult || {})
        setQuote(quoteResult || {})
      } catch (error) {
        console.error('Error fetching stock data:', error)
        setError('Failed to load stock data. Please try again.')
        setStockDetails({})
        setQuote({})
      } finally {
        setLoading(false)
      }
    }

    updateStockData()
  }, [stockSymbol])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // Get current price from quote data
  const currentPrice = quote.c || quote.pc || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-12"
          >
            <Header name={stockDetails.name} />
          </motion.div>

          {/* Search */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-12"
          >
            <Search />
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-12"
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-600 dark:text-red-400">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Overview */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4"
          >
            <Overview
              symbol={stockSymbol}
              price={currentPrice}
              change={quote.d}
              changePercent={quote.dp}
              currency={stockDetails.currency}
              loading={loading}
            />
          </motion.div>

          {/* Chart */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-8"
          >
            <Chart 
              loading={loading} 
              currentPrice={currentPrice}
            />
          </motion.div>

          {/* Details */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-12"
          >
            <Details 
              details={stockDetails} 
              loading={loading}
              quote={quote}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard

