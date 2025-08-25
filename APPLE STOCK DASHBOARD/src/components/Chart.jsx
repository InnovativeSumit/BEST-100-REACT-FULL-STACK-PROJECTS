import { useState, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ReferenceLine
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, Calendar, TrendingUp, TrendingDown, Activity } from 'lucide-react'
import StockContext from '../contexts/StockContext'
import ThemeContext from '../contexts/ThemeContext'
import { fetchHistoricalData, calculatePeriodChange } from '../utils/api/stock-api'

const Chart = ({ loading, currentPrice }) => {
  const { stockSymbol } = useContext(StockContext)
  const { darkMode } = useContext(ThemeContext)
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('1D')
  const [chartLoading, setChartLoading] = useState(false)
  const [periodChange, setPeriodChange] = useState({ change: 0, changePercent: 0 })

  const filterOptions = [
    { label: '1D', value: '1D', resolution: '5', days: 1 },
    { label: '1W', value: '1W', resolution: '30', days: 7 },
    { label: '1M', value: '1M', resolution: 'D', days: 30 },
    { label: '1Y', value: '1Y', resolution: 'W', days: 365 }
  ]

  useEffect(() => {
    const updateChartData = async () => {
      if (!stockSymbol) return
      
      setChartLoading(true)
      try {
        const selectedFilter = filterOptions.find(f => f.value === filter)
        const result = await fetchHistoricalData(stockSymbol, selectedFilter.resolution, selectedFilter.days)
        
        if (result && result.c && result.c.length > 0) {
          const formattedData = result.c.map((price, index) => ({
            value: price,
            date: formatDateForFilter(new Date(result.t[index] * 1000), filter),
            timestamp: result.t[index],
            volume: result.v ? result.v[index] : 0
          }))
          
          setData(formattedData)
          
          // Calculate period-specific change
          const change = calculatePeriodChange(result, currentPrice)
          setPeriodChange(change)
        } else {
          // Generate sample data if API fails
          const sampleData = generateSampleData(filter)
          setData(sampleData)
          
          // Calculate change for sample data
          const startPrice = sampleData[0]?.value || 0
          const endPrice = sampleData[sampleData.length - 1]?.value || 0
          const change = endPrice - startPrice
          const changePercent = startPrice > 0 ? (change / startPrice) * 100 : 0
          
          setPeriodChange({
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat(changePercent.toFixed(2))
          })
        }
      } catch (error) {
        console.error('Chart data error:', error)
        // Generate sample data on error
        const sampleData = generateSampleData(filter)
        setData(sampleData)
        
        // Calculate change for sample data
        const startPrice = sampleData[0]?.value || 0
        const endPrice = sampleData[sampleData.length - 1]?.value || 0
        const change = endPrice - startPrice
        const changePercent = startPrice > 0 ? (change / startPrice) * 100 : 0
        
        setPeriodChange({
          change: parseFloat(change.toFixed(2)),
          changePercent: parseFloat(changePercent.toFixed(2))
        })
      } finally {
        setChartLoading(false)
      }
    }

    updateChartData()
  }, [stockSymbol, filter, currentPrice])

  const formatDateForFilter = (date, filterType) => {
    switch (filterType) {
      case '1D':
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      case '1W':
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      case '1M':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      case '1Y':
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      default:
        return date.toLocaleDateString()
    }
  }

  const generateSampleData = (timeFilter) => {
    const basePrice = currentPrice || 150
    const dataPoints = timeFilter === '1D' ? 24 : timeFilter === '1W' ? 7 : timeFilter === '1M' ? 30 : 52
    
    return Array.from({ length: dataPoints }, (_, i) => {
      const variation = (Math.random() - 0.5) * (basePrice * 0.02) // 2% variation
      const trend = timeFilter === '1Y' ? (i - dataPoints/2) * 0.1 : 0
      const momentum = i > 0 ? (Math.random() - 0.5) * 2 : 0
      
      const price = Math.max(basePrice + variation + trend + momentum, basePrice * 0.8)
      const timeMultiplier = timeFilter === '1D' ? 3600000 : timeFilter === '1W' ? 86400000 : timeFilter === '1M' ? 86400000 : 604800000
      const date = new Date(Date.now() - (dataPoints - i) * timeMultiplier)
      
      return {
        value: parseFloat(price.toFixed(2)),
        date: formatDateForFilter(date, timeFilter),
        timestamp: Math.floor(date.getTime() / 1000),
        volume: Math.floor(Math.random() * 1000000)
      }
    })
  }

  const isPositive = periodChange.change >= 0
  const ChangeIcon = isPositive ? TrendingUp : periodChange.change < 0 ? TrendingDown : Activity

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-lg font-semibold text-foreground">
            ${payload[0].value.toFixed(2)}
          </p>
          {data.volume && (
            <p className="text-xs text-muted-foreground mt-1">
              Vol: {(data.volume / 1000000).toFixed(1)}M
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const formatPeriodLabel = (filterValue) => {
    const labels = {
      '1D': 'Today',
      '1W': '1 Week',
      '1M': '1 Month', 
      '1Y': '1 Year'
    }
    return labels[filterValue] || filterValue
  }

  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <span>Price Chart</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex space-x-1">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filter === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(option.value)}
                  className="h-8 px-3 text-xs font-medium"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[400px]">
        {chartLoading || loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading chart data...</p>
            </div>
          </div>
        ) : (
          <motion.div 
            className="h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop 
                      offset="5%" 
                      stopColor={isPositive ? "#10b981" : "#ef4444"} 
                      stopOpacity={0.3}
                    />
                    <stop 
                      offset="95%" 
                      stopColor={isPositive ? "#10b981" : "#ef4444"} 
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={darkMode ? "#374151" : "#e5e7eb"}
                  opacity={0.5}
                />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: darkMode ? "#9ca3af" : "#6b7280" }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: darkMode ? "#9ca3af" : "#6b7280" }}
                  domain={['dataMin - 5', 'dataMax + 5']}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Tooltip content={<CustomTooltip />} />
                {data.length > 0 && (
                  <ReferenceLine 
                    y={data[0].value} 
                    stroke={darkMode ? "#6b7280" : "#9ca3af"} 
                    strokeDasharray="2 2" 
                    opacity={0.5}
                  />
                )}
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "#10b981" : "#ef4444"}
                  strokeWidth={3}
                  fill="url(#colorPrice)"
                  dot={false}
                  activeDot={{ 
                    r: 6, 
                    stroke: isPositive ? "#10b981" : "#ef4444",
                    strokeWidth: 2,
                    fill: darkMode ? "#1f2937" : "#ffffff"
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Enhanced Chart Summary */}
            <div className="flex items-center justify-between mt-4 p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-500/10' : periodChange.change < 0 ? 'bg-red-500/10' : 'bg-muted/50'}`}>
                  <ChangeIcon className={`h-4 w-4 ${isPositive ? 'text-green-500' : periodChange.change < 0 ? 'text-red-500' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    {formatPeriodLabel(filter)} Change:
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold text-lg ${isPositive ? 'text-green-500' : periodChange.change < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {isPositive ? '+' : ''}${periodChange.change.toFixed(2)}
                    </span>
                    <span className={`text-sm ${isPositive ? 'text-green-500' : periodChange.change < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                      ({isPositive ? '+' : ''}{periodChange.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  {data.length} data points
                </div>
                <div className="text-xs text-muted-foreground">
                  Updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default Chart

