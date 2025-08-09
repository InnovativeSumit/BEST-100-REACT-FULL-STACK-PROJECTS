import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SearchPage from './components/SearchPage'
import FavoritesPage from './components/FavoritesPage'
import RecipeDetail from './components/RecipeDetail'
import CookingGuide from './components/CookingGuide'
import './App.css'

function App() {
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on app start
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (recipe) => {
    if (!favorites.find(fav => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe])
    }
  }

  const removeFromFavorites = (recipeId) => {
    setFavorites(favorites.filter(fav => fav.id !== recipeId))
  }

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.id === recipeId)
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header favoritesCount={favorites.length} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <SearchPage 
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  isFavorite={isFavorite}
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <FavoritesPage 
                  favorites={favorites}
                  removeFromFavorites={removeFromFavorites}
                />
              } 
            />
            <Route 
              path="/recipe/:id" 
              element={
                <RecipeDetail 
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  isFavorite={isFavorite}
                />
              } 
            />
            <Route 
              path="/cooking/:id" 
              element={<CookingGuide />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

