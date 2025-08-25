import { motion } from 'framer-motion'
import { 
  Building2, 
  Globe, 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign,
  MapPin,
  ExternalLink,
  Info,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const Details = ({ details, loading, quote }) => {
  const formatMarketCap = (value) => {
    if (!value) return 'N/A'
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}B`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}M`
    }
    return `$${value.toFixed(2)}`
  }

  const formatShares = (value) => {
    if (!value) return 'N/A'
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`
    }
    return value.toString()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const LoadingSkeleton = ({ className }) => (
    <div className={`animate-pulse bg-muted rounded ${className}`}></div>
  )

  const InfoCard = ({ icon: Icon, label, value, loading: itemLoading, className = "" }) => (
    <motion.div 
      className={`p-4 bg-muted/20 rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          {itemLoading ? (
            <LoadingSkeleton className="h-5 w-20" />
          ) : (
            <p className="font-semibold text-foreground truncate">{value}</p>
          )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-300 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <span>Company Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Name and Industry */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-0">
              {loading ? (
                <LoadingSkeleton className="h-8 w-64 mb-2" />
              ) : (
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {details.name || 'Company Name'}
                </h3>
              )}
              {loading ? (
                <LoadingSkeleton className="h-5 w-32" />
              ) : (
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {details.finnhubIndustry || 'Industry'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Company Logo */}
            {details.logo && !loading && (
              <motion.div 
                className="flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src={details.logo} 
                  alt={`${details.name} logo`}
                  className="w-16 h-16 rounded-lg object-contain bg-white p-2 shadow-sm"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </motion.div>
            )}
          </div>

          {/* Website Link */}
          {details.weburl && !loading && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="h-10 px-4"
                onClick={() => window.open(details.weburl, '_blank')}
              >
                <Globe className="h-4 w-4 mr-2" />
                <span className="truncate max-w-[200px]">{details.weburl}</span>
                <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <InfoCard
            icon={MapPin}
            label="Country"
            value={details.country || 'N/A'}
            loading={loading}
          />
          
          <InfoCard
            icon={DollarSign}
            label="Currency"
            value={details.currency || 'USD'}
            loading={loading}
          />
          
          <InfoCard
            icon={Building2}
            label="Exchange"
            value={details.exchange || 'N/A'}
            loading={loading}
          />
          
          <InfoCard
            icon={Calendar}
            label="IPO Date"
            value={formatDate(details.ipo)}
            loading={loading}
          />
          
          <InfoCard
            icon={TrendingUp}
            label="Market Cap"
            value={formatMarketCap(details.marketCapitalization)}
            loading={loading}
          />
          
          <InfoCard
            icon={Users}
            label="Shares Outstanding"
            value={formatShares(details.shareOutstanding)}
            loading={loading}
          />
        </motion.div>

        {/* Trading Information */}
        {quote && Object.keys(quote).length > 0 && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h4 className="text-lg font-semibold">Trading Information</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quote.c && (
                <InfoCard
                  icon={DollarSign}
                  label="Current Price"
                  value={`$${quote.c.toFixed(2)}`}
                  loading={loading}
                />
              )}
              
              {quote.pc && (
                <InfoCard
                  icon={TrendingUp}
                  label="Previous Close"
                  value={`$${quote.pc.toFixed(2)}`}
                  loading={loading}
                />
              )}
              
              {quote.h && (
                <InfoCard
                  icon={TrendingUp}
                  label="Day High"
                  value={`$${quote.h.toFixed(2)}`}
                  loading={loading}
                  className="border-green-200 dark:border-green-800"
                />
              )}
              
              {quote.l && (
                <InfoCard
                  icon={TrendingUp}
                  label="Day Low"
                  value={`$${quote.l.toFixed(2)}`}
                  loading={loading}
                  className="border-red-200 dark:border-red-800"
                />
              )}
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading company details...</p>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && (!details || Object.keys(details).length === 0) && (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No company details available</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default Details

