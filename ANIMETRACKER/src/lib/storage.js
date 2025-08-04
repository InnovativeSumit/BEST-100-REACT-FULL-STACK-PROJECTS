// localStorage utilities for managing favorites and user preferences

const STORAGE_KEYS = {
  FAVORITES: 'anitrack_favorites',
  THEME: 'anitrack_theme',
  FILTERS: 'anitrack_filters',
  WATCHLIST: 'anitrack_watchlist'
};

// Favorites management
export const favoritesStorage = {
  // Get all favorites
  getFavorites: () => {
    try {
      const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  },

  // Add anime to favorites
  addFavorite: (anime) => {
    try {
      const favorites = favoritesStorage.getFavorites();
      const isAlreadyFavorite = favorites.some(fav => fav.id === anime.id);
      
      if (!isAlreadyFavorite) {
        const newFavorites = [...favorites, {
          id: anime.id,
          title: anime.title,
          image: anime.image,
          score: anime.score,
          year: anime.year,
          status: anime.status,
          addedAt: new Date().toISOString()
        }];
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding favorite to localStorage:', error);
      return false;
    }
  },

  // Remove anime from favorites
  removeFavorite: (animeId) => {
    try {
      const favorites = favoritesStorage.getFavorites();
      const newFavorites = favorites.filter(fav => fav.id !== animeId);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
      return true;
    } catch (error) {
      console.error('Error removing favorite from localStorage:', error);
      return false;
    }
  },

  // Check if anime is in favorites
  isFavorite: (animeId) => {
    const favorites = favoritesStorage.getFavorites();
    return favorites.some(fav => fav.id === animeId);
  },

  // Clear all favorites
  clearFavorites: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.FAVORITES);
      return true;
    } catch (error) {
      console.error('Error clearing favorites from localStorage:', error);
      return false;
    }
  }
};

// Theme management
export const themeStorage = {
  getTheme: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
      return 'light';
    }
  },

  setTheme: (theme) => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      return true;
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
      return false;
    }
  }
};

// Filter preferences management
export const filtersStorage = {
  getFilters: () => {
    try {
      const filters = localStorage.getItem(STORAGE_KEYS.FILTERS);
      return filters ? JSON.parse(filters) : {
        genres: [],
        status: '',
        rating: '',
        sortBy: 'score',
        sortOrder: 'desc'
      };
    } catch (error) {
      console.error('Error reading filters from localStorage:', error);
      return {
        genres: [],
        status: '',
        rating: '',
        sortBy: 'score',
        sortOrder: 'desc'
      };
    }
  },

  setFilters: (filters) => {
    try {
      localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
      return true;
    } catch (error) {
      console.error('Error saving filters to localStorage:', error);
      return false;
    }
  }
};

// Watchlist management (for future features)
export const watchlistStorage = {
  getWatchlist: () => {
    try {
      const watchlist = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
      return watchlist ? JSON.parse(watchlist) : [];
    } catch (error) {
      console.error('Error reading watchlist from localStorage:', error);
      return [];
    }
  },

  addToWatchlist: (anime, status = 'plan_to_watch') => {
    try {
      const watchlist = watchlistStorage.getWatchlist();
      const existingIndex = watchlist.findIndex(item => item.id === anime.id);
      
      if (existingIndex >= 0) {
        watchlist[existingIndex] = {
          ...watchlist[existingIndex],
          status,
          updatedAt: new Date().toISOString()
        };
      } else {
        watchlist.push({
          id: anime.id,
          title: anime.title,
          image: anime.image,
          score: anime.score,
          episodes: anime.episodes,
          status,
          progress: 0,
          addedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));
      return true;
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      return false;
    }
  },

  removeFromWatchlist: (animeId) => {
    try {
      const watchlist = watchlistStorage.getWatchlist();
      const newWatchlist = watchlist.filter(item => item.id !== animeId);
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(newWatchlist));
      return true;
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      return false;
    }
  },

  updateProgress: (animeId, progress) => {
    try {
      const watchlist = watchlistStorage.getWatchlist();
      const itemIndex = watchlist.findIndex(item => item.id === animeId);
      
      if (itemIndex >= 0) {
        watchlist[itemIndex].progress = progress;
        watchlist[itemIndex].updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating progress:', error);
      return false;
    }
  }
};

