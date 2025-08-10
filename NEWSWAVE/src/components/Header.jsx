import { Moon, Sun, Bookmark, Home, Waves } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { Badge } from './ui/badge';

export function Header({ currentView, onViewChange, bookmarkCount = 0 }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Waves className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NewsWave
              </h1>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Personalized News Reader
            </Badge>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant={currentView === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('home')}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>

            <Button
              variant={currentView === 'bookmarks' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('bookmarks')}
              className="flex items-center gap-2 relative"
            >
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Bookmarks</span>
              {bookmarkCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {bookmarkCount > 99 ? '99+' : bookmarkCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center gap-2"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

