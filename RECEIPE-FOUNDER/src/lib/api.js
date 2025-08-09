import axios from 'axios'

const API_KEY = '8484619605c642908170e6fe17acefd2'
const BASE_URL = 'https://api.spoonacular.com/recipes'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY
  }
})

export const recipeAPI = {
  // Search recipes by ingredients
  searchByIngredients: async (ingredients, diet = '', number = 12) => {
    try {
      const params = {
        ingredients: ingredients.join(','),
        number,
        ranking: 1,
        ignorePantry: true
      }
      
      if (diet) {
        params.diet = diet
      }

      const response = await api.get('/findByIngredients', { params })
      return response.data
    } catch (error) {
      console.error('Error searching recipes by ingredients:', error)
      throw error
    }
  },

  // Get recipe details by ID
  getRecipeDetails: async (id) => {
    try {
      const response = await api.get(`/${id}/information`, {
        params: {
          includeNutrition: true
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching recipe details:', error)
      throw error
    }
  },

  // Get recipe instructions
  getRecipeInstructions: async (id) => {
    try {
      const response = await api.get(`/${id}/analyzedInstructions`)
      return response.data
    } catch (error) {
      console.error('Error fetching recipe instructions:', error)
      throw error
    }
  },

  // Search recipes with complex query
  searchRecipes: async (query, diet = '', number = 12) => {
    try {
      const params = {
        query,
        number,
        addRecipeInformation: true,
        fillIngredients: true
      }
      
      if (diet) {
        params.diet = diet
      }

      const response = await api.get('/complexSearch', { params })
      return response.data
    } catch (error) {
      console.error('Error searching recipes:', error)
      throw error
    }
  },

  // Get random recipes
  getRandomRecipes: async (number = 6, diet = '') => {
    try {
      const params = {
        number,
        include: 'nutrition'
      }
      
      if (diet) {
        params.tags = diet
      }

      const response = await api.get('/random', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching random recipes:', error)
      throw error
    }
  }
}

export default recipeAPI

