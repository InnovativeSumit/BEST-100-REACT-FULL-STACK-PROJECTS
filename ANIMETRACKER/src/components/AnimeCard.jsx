import { useState } from 'react';
import { Heart, Star, Calendar, Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { favoritesStorage } from '@/lib/storage';

const AnimeCard = ({ anime, onSelect, isFavorite: initialFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite || favoritesStorage.isFavorite(anime.id));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    
    if (isFavorite) {
      favoritesStorage.removeFavorite(anime.id);
      setIsFavorite(false);
    } else {
      favoritesStorage.addFavorite(anime);
      setIsFavorite(true);
    }
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(anime);
    }
  };

  const formatScore = (score) => {
    return score ? score.toFixed(1) : 'N/A';
  };

  const formatYear = (year) => {
    return year || 'TBA';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'currently airing':
        return 'text-green-600 dark:text-green-400';
      case 'finished airing':
        return 'text-blue-600 dark:text-blue-400';
      case 'not yet aired':
        return 'text-orange-600 dark:text-orange-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div 
      className="group relative bg-card rounded-lg border shadow-sm card-hover cursor-pointer overflow-hidden animate-fade-in"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {!imageError ? (
          <img
            src={anime.image}
            alt={anime.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Play className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-muted shimmer" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 bg-black/20 hover:bg-black/40 backdrop-blur-sm btn-hover-lift opacity-0 group-hover:opacity-100 transition-all duration-300"
          onClick={handleFavoriteToggle}
        >
          <Heart 
            className={`h-4 w-4 transition-all duration-200 ${
              isFavorite 
                ? 'fill-red-500 text-red-500 scale-110' 
                : 'text-white hover:text-red-500 hover:scale-110'
            }`} 
          />
        </Button>

        {/* Score Badge */}
        {anime.score && (
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-md px-2 py-1 flex items-center space-x-1 animate-scale-in">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-medium">
              {formatScore(anime.score)}
            </span>
          </div>
        )}

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button
            variant="secondary"
            size="sm"
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/20 btn-hover-lift"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            <Info className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors duration-200">
          {anime.title}
        </h3>
        
        <div className="space-y-1 text-xs text-muted-foreground">
          {/* Year and Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatYear(anime.year)}</span>
            </div>
            {anime.status && (
              <span className={`font-medium text-xs px-2 py-1 rounded-full transition-all duration-200 ${getStatusColor(anime.status)}`}>
                {anime.status === 'Currently Airing' ? 'Airing' : 
                 anime.status === 'Finished Airing' ? 'Finished' :
                 anime.status === 'Not yet aired' ? 'Upcoming' : anime.status}
              </span>
            )}
          </div>

          {/* Episodes */}
          {anime.episodes && (
            <div className="flex items-center space-x-1">
              <Play className="h-3 w-3" />
              <span>{anime.episodes} episodes</span>
            </div>
          )}

          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {anime.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre.mal_id}
                  className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full hover:bg-primary/20 transition-colors duration-200"
                >
                  {genre.name}
                </span>
              ))}
              {anime.genres.length > 3 && (
                <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                  +{anime.genres.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;

