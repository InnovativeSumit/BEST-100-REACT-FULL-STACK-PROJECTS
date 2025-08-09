import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Heart, Clock, Users, ChefHat, ArrowLeft, Loader2 } from 'lucide-react'
import { recipeAPI } from '../lib/api'

const RecipeDetail = ({ addToFavorites, removeFromFavorites, isFavorite }) => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadRecipeDetails()
  }, [id])

  const loadRecipeDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await recipeAPI.getRecipeDetails(id)
      setRecipe(data)
    } catch (error) {
      console.error('Error loading recipe details:', error)
      setError('Failed to load recipe details')
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = () => {
    if (!recipe) return
    
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id)
    } else {
      addToFavorites(recipe)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading recipe...</span>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">Recipe not found</h3>
        <p className="text-muted-foreground mb-6">{error || 'The recipe you\'re looking for doesn\'t exist.'}</p>
        <Link to="/">
          <Button>Back to Search</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>
      </Link>

      {/* Recipe Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-64 lg:h-80 object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFavorite}
            >
              <Heart 
                className={`h-5 w-5 ${isFavorite(recipe.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
              />
            </Button>
          </div>

          <div className="flex items-center space-x-6 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{recipe.readyInMinutes} minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          {/* Diet Tags */}
          {(recipe.vegetarian || recipe.vegan || recipe.glutenFree || recipe.dairyFree) && (
            <div className="flex flex-wrap gap-2">
              {recipe.vegetarian && <Badge variant="secondary">Vegetarian</Badge>}
              {recipe.vegan && <Badge variant="secondary">Vegan</Badge>}
              {recipe.glutenFree && <Badge variant="secondary">Gluten Free</Badge>}
              {recipe.dairyFree && <Badge variant="secondary">Dairy Free</Badge>}
            </div>
          )}

          {/* Summary */}
          {recipe.summary && (
            <div 
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          )}

          {/* Start Cooking Button */}
          <Link to={`/cooking/${recipe.id}`}>
            <Button size="lg" className="w-full">
              <ChefHat className="h-5 w-5 mr-2" />
              Start Cooking
            </Button>
          </Link>
        </div>
      </div>

      {/* Ingredients */}
      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipe.extendedIngredients?.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                {ingredient.image && (
                  <img 
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                    alt={ingredient.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-medium">{ingredient.original}</p>
                  <p className="text-sm text-muted-foreground">{ingredient.name}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nutrition */}
      {recipe.nutrition && recipe.nutrition.nutrients && (
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recipe.nutrition.nutrients.slice(0, 8).map((nutrient, index) => (
                <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{Math.round(nutrient.amount)}</p>
                  <p className="text-sm text-muted-foreground">{nutrient.unit}</p>
                  <p className="text-sm font-medium">{nutrient.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions Preview */}
      {recipe.instructions && (
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
            <Separator className="my-4" />
            <Link to={`/cooking/${recipe.id}`}>
              <Button>
                <ChefHat className="h-4 w-4 mr-2" />
                Follow Step-by-Step Guide
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default RecipeDetail

