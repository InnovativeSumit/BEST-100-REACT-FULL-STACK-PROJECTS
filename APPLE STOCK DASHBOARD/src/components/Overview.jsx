import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Activity, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Overview = ({ symbol, price, change, changePercent, currency, loading }) => {
  const changeColor = change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-muted-foreground'
  const changeBgColor = change > 0 ? 'bg-green-500/10' : change < 0 ? 'bg-red-500/10' : 'bg-muted/50'
  const changeIcon = change > 0 ? TrendingUp : change < 0 ? TrendingDown : Activity
  const ChangeIcon = changeIcon

  const formatPrice = (value) => {
    if (!value || loading) return '---'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatChange = (value) => {
    if (value === undefined || value === null || loading) return '---'
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}`
  }

  const formatChangePercent = (value) => {
    if (value === undefined || value === null || loading) return '---'
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}%`
  }

  const LoadingSkeleton = ({ className }) => (
    <div className={`animate-pulse bg-muted rounded ${className}`}></div>
  )

  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-300 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <div className="p-2 bg-primary/10 rounded-lg">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <span>Market Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Symbol */}
        <div className="text-center">
          <motion.h2 
            className="text-4xl font-bold text-primary mb-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {loading ? (
              <LoadingSkeleton className="h-10 w-20 mx-auto" />
            ) : (
              symbol || 'N/A'
            )}
          </motion.h2>
        </div>

        {/* Price */}
        <div className="text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {loading ? (
              <LoadingSkeleton className="h-12 w-32 mx-auto" />
            ) : (
              <h3 className="text-5xl font-bold text-foreground mb-2">
                {formatPrice(price)}
              </h3>
            )}
          </motion.div>
        </div>

        {/* Change */}
        <motion.div 
          className={`flex items-center justify-center space-x-3 p-4 ${changeBgColor} rounded-xl border border-border/20`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {loading ? (
            <LoadingSkeleton className="h-8 w-24" />
          ) : (
            <>
              <div className={`p-2 rounded-lg ${changeBgColor}`}>
                <ChangeIcon className={`h-5 w-5 ${changeColor}`} />
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${changeColor}`}>
                  {formatChange(change)}
                </div>
                <div className={`text-lg ${changeColor}`}>
                  {formatChangePercent(changePercent)}
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Additional Info Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <motion.div 
            className="text-center p-3 bg-muted/20 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground mb-1">Currency</p>
            <p className="font-semibold text-lg">
              {loading ? (
                <LoadingSkeleton className="h-6 w-12 mx-auto" />
              ) : (
                <span className="flex items-center justify-center space-x-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{currency || 'USD'}</span>
                </span>
              )}
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center p-3 bg-muted/20 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <div className="flex items-center justify-center space-x-2">
              {loading ? (
                <LoadingSkeleton className="h-6 w-16" />
              ) : (
                <>
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75"></div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3 text-green-500" />
                    <p className="font-semibold text-sm text-green-500">Live</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Market Session Indicator */}
        <motion.div 
          className="text-center p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-xs text-muted-foreground mb-1">Market Session</p>
          <p className="text-sm font-medium text-primary">
            {loading ? (
              <LoadingSkeleton className="h-4 w-24 mx-auto" />
            ) : (
              'Regular Trading Hours'
            )}
          </p>
        </motion.div>

        {/* Last Updated */}
        {!loading && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default Overview

