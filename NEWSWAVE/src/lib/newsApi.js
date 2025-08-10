const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

class NewsAPI {
  async fetchNews(params = {}) {
    const {
      category = 'general',
      country = 'us',
      q = '',
      pageSize = 20,
      page = 1
    } = params;

    let url = `${BASE_URL}/top-headlines?apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}`;
    
    if (q) {
      url = `${BASE_URL}/everything?apiKey=${API_KEY}&q=${encodeURIComponent(q)}&pageSize=${pageSize}&page=${page}&sortBy=publishedAt`;
    } else {
      if (category && category !== 'all') {
        url += `&category=${category}`;
      }
      if (country) {
        url += `&country=${country}`;
      }
    }

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(data.message || 'Failed to fetch news');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  async searchNews(query, pageSize = 20, page = 1) {
    return this.fetchNews({ q: query, pageSize, page });
  }

  async getNewsByCategory(category, country = 'us', pageSize = 20, page = 1) {
    return this.fetchNews({ category, country, pageSize, page });
  }
}

export const newsApi = new NewsAPI();

