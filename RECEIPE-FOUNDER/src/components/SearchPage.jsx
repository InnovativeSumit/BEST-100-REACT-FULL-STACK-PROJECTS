import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Heart, Clock, Users, Plus, X, Search, Loader2 } from 'lucide-react'
import { recipeAPI } from '../lib/api'

const SearchPage = ({ addToFavorites, removeFromFavorites, isFavorite }) => {
  const [ingredients, setIngredients] = useState([])
  const [currentIngredient, setCurrentIngredient] = useState('')
  const [diet, setDiet] = useState('')
  const [recipes, setRecipes] = useState([])
  const [randomRecipes, setRandomRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)

  // Load random recipes on component mount
  useEffect(() => {
    loadRandomRecipes()
  }, [])

  const loadRandomRecipes = async () => {
    try {
      const data = await recipeAPI.getRandomRecipes(6)
      setRandomRecipes(data.recipes || [])
    } catch (error) {
      console.error('Error loading random recipes:', error)
    }
  }

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()])
      setCurrentIngredient('')
    }
  }

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(ing => ing !== ingredient))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addIngredient()
    }
  }

  const searchRecipes = async () => {
    if (ingredients.length === 0) return

    setLoading(true)
    setSearchPerformed(true)
    try {
      const data = await recipeAPI.searchByIngredients(ingredients, diet)
      setRecipes(data || [])
    } catch (error) {
      console.error('Error searching recipes:', error)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id)
    } else {
      addToFavorites(recipe)
    }
  }

  const RecipeCard = ({ recipe, showMissedIngredients = false }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
            onClick={() => toggleFavorite(recipe)}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite(recipe.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 line-clamp-2">{recipe.title}</CardTitle>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
          {recipe.readyInMinutes && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.readyInMinutes} min</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
          )}
        </div>

        {showMissedIngredients && recipe.missedIngredients && recipe.missedIngredients.length > 0 && (
          <div className="mb-3">
            <p className="text-sm text-muted-foreground mb-1">Missing ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.missedIngredients.slice(0, 3).map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {ingredient.name}
                </Badge>
              ))}
              {recipe.missedIngredients.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{recipe.missedIngredients.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <Link to={`/recipe/${recipe.id}`}>
          <Button className="w-full">View Recipe</Button>
        </Link>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="bg-card p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-6">Find Recipes by Ingredients</h2>
        
        {/* Ingredient Input */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter an ingredient (e.g., chicken, tomatoes)"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={addIngredient} disabled={!currentIngredient.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Ingredients List */}
          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{ingredient}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {/* Diet Filter */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Dietary Preference:</label>
            <Select value={diet} onValueChange={setDiet}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Any diet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any diet</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="gluten-free">Gluten Free</SelectItem>
                <SelectItem value="ketogenic">Ketogenic</SelectItem>
                <SelectItem value="paleo">Paleo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button 
            onClick={searchRecipes} 
            disabled={ingredients.length === 0 || loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search Recipes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchPerformed && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            {recipes.length > 0 ? `Found ${recipes.length} recipes` : 'No recipes found'}
          </h3>
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} showMissedIngredients={true} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Try adjusting your ingredients or dietary preferences.
            </p>
          )}
        </div>
      )}

      {/* Random Recipes */}
      {!searchPerformed && randomRecipes.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Popular Recipes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPage

