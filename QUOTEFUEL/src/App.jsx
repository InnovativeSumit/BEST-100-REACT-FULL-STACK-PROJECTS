import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { RefreshCw, Volume2, Share2, Twitter, Flame } from 'lucide-react'
import { QUOTE_DATABASE, QUOTE_TAGS } from './data/quotes.js'
import quoteFuelLogo from './assets/quotefuel-logo.png'
import './App.css'

function App() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [selectedTags, setSelectedTags] = useState(['motivational'])
  const [useLocalQuotes, setUseLocalQuotes] = useState(true)
  const [stats, setStats] = useState({
    totalQuotes: 0,
    quotesViewed: 0,
    favoriteCategory: 'motivational'
  })

  // Initialize with a random quote
  useEffect(() => {
    fetchQuote()
    updateStats()
  }, [])

  const updateStats = () => {
    const totalLocal = Object.values(QUOTE_DATABASE).reduce((sum, quotes) => sum + quotes.length, 0)
    setStats(prev => ({
      ...prev,
      totalQuotes: totalLocal,
      quotesViewed: prev.quotesViewed + 1
    }))
  }

  const getRandomQuoteFromLocal = () => {
    const availableCategories = selectedTags.length > 0 ? selectedTags : QUOTE_TAGS
    const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)]
    const categoryQuotes = QUOTE_DATABASE[randomCategory]
    const randomQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]
    
    return {
      ...randomQuote,
      category: randomCategory
    }
  }

  const fetchQuoteFromAPI = async () => {
    try {
      const tags = selectedTags.length > 0 ? selectedTags.join('|') : ''
      const url = tags 
        ? `https://api.quotable.io/random?tags=${tags}`
        : 'https://api.quotable.io/random'
      
      const response = await fetch(url)
      if (!response.ok) throw new Error('API request failed')
      
      const data = await response.json()
      return {
        content: data.content,
        author: data.author,
        category: data.tags?.[0] || 'general'
      }
    } catch (error) {
      console.error('API Error:', error)
      // Fallback to local quotes
      return getRandomQuoteFromLocal()
    }
  }

  const fetchQuote = async () => {
    setLoading(true)
    try {
      const newQuote = useLocalQuotes 
        ? getRandomQuoteFromLocal()
        : await fetchQuoteFromAPI()
      
      setQuote(newQuote)
      updateStats()
    } catch (error) {
      console.error('Error fetching quote:', error)
      // Fallback to local quote
      setQuote(getRandomQuoteFromLocal())
    } finally {
      setLoading(false)
    }
  }

  const speakQuote = () => {
    if (!quote) return

    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${quote.content} by ${quote.author}`)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1
      
      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    } else {
      alert('Text-to-speech is not supported in your browser.')
    }
  }

  const shareQuote = async () => {
    if (!quote) return

    const shareText = `"${quote.content}" — ${quote.author}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QuoteFuel - Motivational Quote',
          text: shareText,
          url: window.location.href
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          fallbackShare(shareText)
        }
      }
    } else {
      fallbackShare(shareText)
    }
  }

  const fallbackShare = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Quote copied to clipboard!')
      }).catch(() => {
        alert('Unable to copy to clipboard. Please copy manually.')
      })
    } else {
      alert('Sharing not supported. Please copy the quote manually.')
    }
  }

  const tweetQuote = () => {
    if (!quote) return

    const tweetText = `"${quote.content}" — ${quote.author} #QuoteFuel #Motivation #Inspiration`
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(tweetUrl, '_blank', 'width=550,height=420')
  }

  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
  }

  const toggleQuoteSource = () => {
    setUseLocalQuotes(prev => !prev)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src={quoteFuelLogo} 
              alt="QuoteFuel Logo" 
              className="h-12 w-auto animate-float"
            />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 animate-slide-in-up">
            Fuel your motivation with inspiring quotes
          </p>
        </div>

        {/* Quote Source Toggle */}
        <Card className="mb-6 glass-card animate-slide-in-up">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm font-medium">Quote Source:</span>
              <Button
                variant={useLocalQuotes ? "default" : "outline"}
                size="sm"
                onClick={toggleQuoteSource}
                className="transition-all duration-200"
              >
                Local Database (50 per category)
              </Button>
              <Button
                variant={!useLocalQuotes ? "default" : "outline"}
                size="sm"
                onClick={toggleQuoteSource}
                className="transition-all duration-200"
              >
                Quotable API
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tag Selection */}
        <Card className="mb-8 glass-card animate-slide-in-up">
          <CardHeader>
            <CardTitle className="text-lg">Choose Your Inspiration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {QUOTE_TAGS.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors capitalize tag-badge"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {useLocalQuotes ? 
                `Local database contains 50 quotes for each category (${selectedTags.length} selected)` :
                'Using Quotable API for fresh quotes'
              }
            </div>
          </CardContent>
        </Card>

        {/* Quote Display */}
        <Card className="mb-8 quote-card glass-card animate-slide-in-up">
          <CardContent className="pt-8 pb-8">
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                <p className="text-gray-500 dark:text-gray-400">Loading inspiration...</p>
              </div>
            ) : quote ? (
              <div className="text-center animate-fade-in">
                <blockquote className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                  "{quote.content}"
                </blockquote>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <cite className="text-lg text-gray-600 dark:text-gray-400 not-italic">
                    — {quote.author}
                  </cite>
                </div>
                {quote.category && (
                  <Badge variant="secondary" className="capitalize">
                    {quote.category}
                  </Badge>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Flame className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                <p className="text-gray-500 dark:text-gray-400">Click "New Quote" to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            onClick={fetchQuote} 
            disabled={loading}
            className="flex items-center gap-2 button-glow"
            size="lg"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            New Quote
          </Button>
          
          <Button 
            onClick={speakQuote} 
            variant="outline"
            disabled={!quote || loading}
            className="flex items-center gap-2 button-glow"
            size="lg"
          >
            <Volume2 className={`h-4 w-4 ${speaking ? 'text-blue-600' : ''}`} />
            {speaking ? 'Stop' : 'Listen'}
          </Button>
          
          <Button 
            onClick={shareQuote} 
            variant="outline"
            disabled={!quote || loading}
            className="flex items-center gap-2 button-glow"
            size="lg"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          
          <Button 
            onClick={tweetQuote} 
            variant="outline"
            disabled={!quote || loading}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white border-blue-500 button-glow"
            size="lg"
          >
            <Twitter className="h-4 w-4" />
            Tweet
          </Button>
        </div>

        {/* Statistics */}
        <Card className="mt-8 stats-card animate-slide-in-up">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Quotes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">10</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">50</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Per Category</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">∞</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Inspiration</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Powered by Local Database & Quotable API • Built with React & Vite
        </div>
      </div>
    </div>
  )
}

export default App

