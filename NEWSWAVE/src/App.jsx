import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'next-themes';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ArticleCard } from './components/ArticleCard';
import { Button } from './components/ui/button';
import { Alert, AlertDescription } from './components/ui/alert';
import { useLocalStorage } from './hooks/useLocalStorage';
import { newsApi } from './lib/newsApi';
import './App.css';

function AppContent() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [bookmarks, setBookmarks] = useLocalStorage('newswave-bookmarks', []);

  const fetchNews = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await newsApi.fetchNews(params);
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch news');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query.trim()) {
      fetchNews({ q: query });
    } else {
      fetchNews({ 
        category: selectedCategory === 'all' ? undefined : selectedCategory, 
        country: selectedCountry 
      });
    }
  }, [selectedCategory, selectedCountry, fetchNews]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    if (!searchQuery.trim()) {
      fetchNews({ 
        category: category === 'all' ? undefined : category, 
        country: selectedCountry 
      });
    }
  }, [selectedCountry, searchQuery, fetchNews]);

  const handleCountryChange = useCallback((country) => {
    setSelectedCountry(country);
    if (!searchQuery.trim()) {
      fetchNews({ 
        category: selectedCategory === 'all' ? undefined : selectedCategory, 
        country: country 
      });
    }
  }, [selectedCategory, searchQuery, fetchNews]);

  const toggleBookmark = useCallback((article) => {
    setBookmarks(prev => {
      const isBookmarked = prev.some(bookmark => bookmark.url === article.url);
      if (isBookmarked) {
        return prev.filter(bookmark => bookmark.url !== article.url);
      } else {
        return [...prev, { ...article, bookmarkedAt: new Date().toISOString() }];
      }
    });
  }, [setBookmarks]);

  const isArticleBookmarked = useCallback((article) => {
    return bookmarks.some(bookmark => bookmark.url === article.url);
  }, [bookmarks]);

  const handleRefresh = () => {
    if (searchQuery.trim()) {
      fetchNews({ q: searchQuery });
    } else {
      fetchNews({ 
        category: selectedCategory === 'all' ? undefined : selectedCategory, 
        country: selectedCountry 
      });
    }
  };

  // Initial load
  useEffect(() => {
    fetchNews({ category: selectedCategory, country: selectedCountry });
  }, []);

  const displayedArticles = currentView === 'bookmarks' ? bookmarks : articles;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentView={currentView}
        onViewChange={setCurrentView}
        bookmarkCount={bookmarks.length}
      />

      <main className="container mx-auto px-4 py-6">
        {currentView === 'home' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Search news articles..."
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
              
              <CategoryFilter
                selectedCategory={selectedCategory}
                selectedCountry={selectedCountry}
                onCategoryChange={handleCategoryChange}
                onCountryChange={handleCountryChange}
                disabled={loading}
              />
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {loading ? 'Searching...' : `Search results for "${searchQuery}"`}
              </div>
            )}
          </div>
        )}

        {currentView === 'bookmarks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Bookmarks</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {bookmarks.length} article{bookmarks.length !== 1 ? 's' : ''} saved
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                className="ml-2"
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading news...</span>
            </div>
          </div>
        )}

        {/* Empty States */}
        {!loading && !error && displayedArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              {currentView === 'bookmarks' ? '📚' : '📰'}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {currentView === 'bookmarks' 
                ? 'No bookmarks yet' 
                : searchQuery 
                  ? 'No articles found' 
                  : 'No news available'
              }
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {currentView === 'bookmarks' 
                ? 'Start bookmarking articles to see them here.' 
                : searchQuery 
                  ? 'Try adjusting your search terms or filters.' 
                  : 'Try refreshing or changing your filters.'
              }
            </p>
            {currentView === 'bookmarks' && (
              <Button onClick={() => setCurrentView('home')}>
                Browse News
              </Button>
            )}
          </div>
        )}

        {/* Articles Grid */}
        {!loading && displayedArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {displayedArticles.map((article, index) => (
              <ArticleCard
                key={`${article.url}-${index}`}
                article={article}
                isBookmarked={isArticleBookmarked(article)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        )}

        {/* API Usage Notice */}
        <div className="mt-12 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> This app uses NewsAPI free tier with 100 requests per day. 
            Search queries are debounced to optimize API usage.
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

