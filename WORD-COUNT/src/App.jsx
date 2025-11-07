import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Copy, Download, FileText, Clock, Hash, Type, AlignLeft, RotateCcw } from 'lucide-react'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  // Calculate statistics
  const stats = useMemo(() => {
    const trimmedText = text.trim()
    
    // Words count (split by whitespace and filter empty strings)
    const words = trimmedText ? trimmedText.split(/\s+/).filter(word => word.length > 0) : []
    const wordCount = words.length
    
    // Characters count
    const charactersWithSpaces = text.length
    const charactersWithoutSpaces = text.replace(/\s/g, '').length
    
    // Paragraphs count (split by double line breaks)
    const paragraphs = trimmedText ? trimmedText.split(/\n\s*\n/).filter(p => p.trim().length > 0) : []
    const paragraphCount = paragraphs.length
    
    // Sentences count (split by sentence endings)
    const sentences = trimmedText ? trimmedText.split(/[.!?]+/).filter(s => s.trim().length > 0) : []
    const sentenceCount = sentences.length
    
    // Lines count
    const lines = text ? text.split('\n') : []
    const lineCount = lines.length
    
    // Reading time (average 200 words per minute)
    const readingTimeMinutes = Math.ceil(wordCount / 200)
    
    // Speaking time (average 150 words per minute)
    const speakingTimeMinutes = Math.ceil(wordCount / 150)
    
    // Average words per sentence
    const avgWordsPerSentence = sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0
    
    // Most frequent words (top 5)
    const wordFrequency = {}
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '')
      if (cleanWord.length > 2) { // Only count words longer than 2 characters
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1
      }
    })
    
    const topWords = Object.entries(wordFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }))

    return {
      wordCount,
      charactersWithSpaces,
      charactersWithoutSpaces,
      paragraphCount,
      sentenceCount,
      lineCount,
      readingTimeMinutes,
      speakingTimeMinutes,
      avgWordsPerSentence,
      topWords
    }
  }, [text])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'text-document.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setText('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Professional Word Counter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Analyze your text with comprehensive statistics and insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
          {/* Text Input Section */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Text Input
                </CardTitle>
                <CardDescription>
                  Type or paste your text below to get instant analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Start typing or paste your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[400px] resize-none text-base leading-relaxed"
                />
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    disabled={!text}
                    className="flex items-center gap-2 button-hover"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? 'Copied!' : 'Copy Text'}
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    disabled={!text}
                    className="flex items-center gap-2 button-hover"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    size="sm"
                    disabled={!text}
                    className="flex items-center gap-2 button-hover"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Section */}
          <div className="space-y-6">
            {/* Basic Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Basic Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg stat-card">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.wordCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg stat-card">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {stats.charactersWithSpaces.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg stat-card">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {stats.charactersWithoutSpaces.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">No Spaces</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg stat-card">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {stats.paragraphCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Detailed Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sentences</span>
                  <Badge variant="secondary">{stats.sentenceCount}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Lines</span>
                  <Badge variant="secondary">{stats.lineCount}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg Words/Sentence</span>
                  <Badge variant="secondary">{stats.avgWordsPerSentence}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Reading Time
                  </span>
                  <Badge variant="outline">
                    {stats.readingTimeMinutes} min{stats.readingTimeMinutes !== 1 ? 's' : ''}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Speaking Time
                  </span>
                  <Badge variant="outline">
                    {stats.speakingTimeMinutes} min{stats.speakingTimeMinutes !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Top Words */}
            {stats.topWords.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlignLeft className="h-5 w-5" />
                    Most Frequent Words
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {stats.topWords.map(({ word, count }, index) => (
                    <div key={word} className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {index + 1}. {word}
                      </span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Professional Word Counter - Real-time text analysis and statistics
        </div>
      </div>
    </div>
  )
}

export default App

