// Jikan API service for MyAnimeList data
const BASE_URL = 'https://api.jikan.moe/v4';

// Rate limiting helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

const makeRequest = async (url) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await delay(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
  }
  
  lastRequestTime = Date.now();
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const jikanAPI = {
  // Get top anime
  getTopAnime: async (page = 1, limit = 25) => {
    const url = `${BASE_URL}/top/anime?page=${page}&limit=${limit}`;
    return makeRequest(url);
  },

  // Get seasonal anime
  getSeasonalAnime: async (year, season, page = 1) => {
    const url = `${BASE_URL}/seasons/${year}/${season}?page=${page}`;
    return makeRequest(url);
  },

  // Get current season anime
  getCurrentSeason: async (page = 1) => {
    const url = `${BASE_URL}/seasons/now?page=${page}`;
    return makeRequest(url);
  },

  // Search anime
  searchAnime: async (query, page = 1, filters = {}) => {
    let url = `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}`;
    
    if (filters.genres) {
      url += `&genres=${filters.genres.join(',')}`;
    }
    if (filters.status) {
      url += `&status=${filters.status}`;
    }
    if (filters.rating) {
      url += `&rating=${filters.rating}`;
    }
    if (filters.order_by) {
      url += `&order_by=${filters.order_by}`;
    }
    if (filters.sort) {
      url += `&sort=${filters.sort}`;
    }
    
    return makeRequest(url);
  },

  // Get anime by ID
  getAnimeById: async (id) => {
    const url = `${BASE_URL}/anime/${id}`;
    return makeRequest(url);
  },

  // Get anime genres
  getGenres: async () => {
    const url = `${BASE_URL}/genres/anime`;
    return makeRequest(url);
  },

  // Get random anime
  getRandomAnime: async () => {
    const url = `${BASE_URL}/random/anime`;
    return makeRequest(url);
  }
};

// Helper functions for data processing
export const formatAnimeData = (anime) => {
  return {
    id: anime.mal_id,
    title: anime.title,
    titleEnglish: anime.title_english,
    titleJapanese: anime.title_japanese,
    image: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url,
    score: anime.score,
    scoredBy: anime.scored_by,
    rank: anime.rank,
    popularity: anime.popularity,
    members: anime.members,
    synopsis: anime.synopsis,
    background: anime.background,
    season: anime.season,
    year: anime.year,
    broadcast: anime.broadcast,
    producers: anime.producers,
    licensors: anime.licensors,
    studios: anime.studios,
    source: anime.source,
    duration: anime.duration,
    rating: anime.rating,
    status: anime.status,
    airing: anime.airing,
    aired: anime.aired,
    episodes: anime.episodes,
    genres: anime.genres,
    themes: anime.themes,
    demographics: anime.demographics,
    trailer: anime.trailer,
    url: anime.url
  };
};

export const getSeasonFromDate = (date = new Date()) => {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
};

export const getCurrentYear = () => new Date().getFullYear();

