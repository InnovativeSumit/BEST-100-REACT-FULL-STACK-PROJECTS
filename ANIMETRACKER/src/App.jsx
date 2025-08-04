import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AnimeGrid from './components/AnimeGrid';
import AnimeDetail from './components/AnimeDetail';
import FilterPanel from './components/FilterPanel';
import { jikanAPI, formatAnimeData, getSeasonFromDate, getCurrentYear } from './lib/api';
import { favoritesStorage, filtersStorage } from './lib/storage';

function App() {
  const [currentView, setCurrentView] = useState('trending');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState(filtersStorage.getFilters());

  // Load data based on current view
  const loadData = async (view = currentView, page = 1, query = '', filters = currentFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      switch (view) {
        case 'trending':
          response = await jikanAPI.getCurrentSeason(page);
          break;
        case 'top':
          response = await jikanAPI.getTopAnime(page);
          break;
        case 'seasonal':
          const currentSeason = getSeasonFromDate();
          const currentYear = getCurrentYear();
          response = await jikanAPI.getSeasonalAnime(currentYear, currentSeason, page);
          break;
        case 'search':
          if (query.trim()) {
            // Convert filters to API format
            const apiFilters = {
              genres: filters.genres.length > 0 ? filters.genres : undefined,
              status: filters.status || undefined,
              rating: filters.rating || undefined,
              order_by: filters.sortBy || 'score',
              sort: filters.sortOrder || 'desc'
            };
            response = await jikanAPI.searchAnime(query, page, apiFilters);
          } else {
            response = await jikanAPI.getCurrentSeason(page);
          }
          break;
        case 'favorites':
          let favorites = favoritesStorage.getFavorites();
          
          // Apply local filtering to favorites
          if (filters.genres.length > 0) {
            favorites = favorites.filter(anime => 
              anime.genres && anime.genres.some(genre => 
                filters.genres.includes(genre.mal_id)
              )
            );
          }
          
          if (filters.status) {
            favorites = favorites.filter(anime => 
              anime.status && anime.status.toLowerCase().includes(filters.status)
            );
          }
          
          // Apply sorting
          favorites.sort((a, b) => {
            const sortBy = filters.sortBy || 'score';
            const sortOrder = filters.sortOrder || 'desc';
            
            let aValue = a[sortBy] || 0;
            let bValue = b[sortBy] || 0;
            
            if (sortBy === 'title') {
              aValue = a.title || '';
              bValue = b.title || '';
              return sortOrder === 'desc' 
                ? bValue.localeCompare(aValue)
                : aValue.localeCompare(bValue);
            }
            
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
          });
          
          setAnimeList(favorites);
          setPagination(null);
          setLoading(false);
          return;
        default:
          response = await jikanAPI.getCurrentSeason(page);
      }

      if (response && response.data) {
        const formattedData = response.data.map(formatAnimeData);
        setAnimeList(formattedData);
        setPagination(response.pagination || null);
      } else {
        setAnimeList([]);
        setPagination(null);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message || 'Failed to load anime data');
      setAnimeList([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation
  const handleNavigate = (view) => {
    setCurrentView(view);
    setCurrentPage(1);
    setSearchQuery('');
    loadData(view, 1, '', currentFilters);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentView('search');
    setCurrentPage(1);
    loadData('search', 1, query, currentFilters);
  };

  // Handle anime selection
  const handleAnimeSelect = (anime) => {
    setSelectedAnime(anime);
    setShowDetail(true);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadData(currentView, page, searchQuery, currentFilters);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setCurrentFilters(newFilters);
    setCurrentPage(1);
    loadData(currentView, 1, searchQuery, newFilters);
  };

  // Get view title
  const getViewTitle = () => {
    switch (currentView) {
      case 'trending':
        return 'Trending Anime';
      case 'top':
        return 'Top Rated Anime';
      case 'seasonal':
        return `${getSeasonFromDate().charAt(0).toUpperCase() + getSeasonFromDate().slice(1)} ${getCurrentYear()} Anime`;
      case 'search':
        return searchQuery ? `Search Results for "${searchQuery}"` : 'Search Results';
      case 'favorites':
        return 'My Favorites';
      default:
        return 'Anime List';
    }
  };

  // Load initial data
  useEffect(() => {
    loadData('trending', 1, '', currentFilters);
  }, []);

  // Listen for favorites changes to refresh favorites view
  useEffect(() => {
    if (currentView === 'favorites') {
      loadData('favorites', 1, '', currentFilters);
    }
  }, [currentView, showDetail]); // Refresh when detail modal closes

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        currentView={currentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="flex">
        {/* Main content */}
        <main className="flex-1 container mx-auto px-4 py-6">
          <AnimeGrid
            animeList={animeList}
            loading={loading}
            error={error}
            onAnimeSelect={handleAnimeSelect}
            pagination={pagination}
            onPageChange={handlePageChange}
            title={getViewTitle()}
          />
        </main>

        {/* Filter panel - desktop */}
        <aside className="hidden lg:block w-80 p-4">
          <FilterPanel
            onFiltersChange={handleFiltersChange}
            isOpen={true}
            onToggle={() => {}}
          />
        </aside>
      </div>

      {/* Filter panel - mobile */}
      <div className="lg:hidden">
        <FilterPanel
          onFiltersChange={handleFiltersChange}
          isOpen={showFilters}
          onToggle={() => setShowFilters(!showFilters)}
        />
      </div>

      <AnimeDetail
        anime={selectedAnime}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </div>
  );
}

export default App;
