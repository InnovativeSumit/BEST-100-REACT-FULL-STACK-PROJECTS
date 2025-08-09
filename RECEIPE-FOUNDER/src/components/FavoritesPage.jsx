import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Clock, Users, Trash2 } from 'lucide-react'

const FavoritesPage = ({ favorites, removeFromFavorites }) => {
  const RecipeCard = ({ recipe }) => (
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
            onClick={() => removeFromFavorites(recipe.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
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

        <Link to={`/recipe/${recipe.id}`}>
          <Button className="w-full">View Recipe</Button>
        </Link>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">My Favorite Recipes</h2>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Heart className="h-5 w-5 fill-red-500 text-red-500" />
          <span>{favorites.length} saved</span>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-6">
            Start exploring recipes and save your favorites to see them here!
          </p>
          <Link to="/">
            <Button>Discover Recipes</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage

