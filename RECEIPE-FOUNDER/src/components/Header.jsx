import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChefHat, Heart, Search } from 'lucide-react'

const Header = ({ favoritesCount }) => {
  const location = useLocation()

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Recipe Finder</h1>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'default' : 'ghost'}
                className="flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Button>
            </Link>
            
            <Link to="/favorites">
              <Button 
                variant={location.pathname === '/favorites' ? 'default' : 'ghost'}
                className="flex items-center space-x-2 relative"
              >
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

