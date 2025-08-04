import { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  Star, 
  Calendar, 
  Play, 
  Clock, 
  Users, 
  Award,
  ExternalLink,
  Tv,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { favoritesStorage } from '@/lib/storage';

const AnimeDetail = ({ anime, onClose, isOpen }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (anime) {
      setIsFavorite(favoritesStorage.isFavorite(anime.id || anime.mal_id));
    }
  }, [anime]);

  if (!isOpen || !anime) return null;

  const handleFavoriteToggle = () => {
    const animeId = anime.id || anime.mal_id;
    
    if (isFavorite) {
      favoritesStorage.removeFavorite(animeId);
      setIsFavorite(false);
    } else {
      favoritesStorage.addFavorite({
        id: animeId,
        title: anime.title,
        image: anime.image || anime.images?.jpg?.large_image_url,
        score: anime.score,
        year: anime.year,
        status: anime.status
      });
      setIsFavorite(true);
    }
  };

  const formatScore = (score) => {
    return score ? score.toFixed(1) : 'N/A';
  };

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    return num.toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'currently airing':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      case 'finished airing':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20';
      case 'not yet aired':
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const image = anime.image || anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold truncate pr-4">
            {anime.title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Image and Quick Actions */}
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  {/* Image */}
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    {image ? (
                      <img
                        src={image}
                        alt={anime.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Play className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleFavoriteToggle}
                      variant={isFavorite ? "default" : "outline"}
                      className="w-full"
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>

                    {anime.url && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(anime.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on MyAnimeList
                      </Button>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center justify-center mb-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div className="font-semibold">{formatScore(anime.score)}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center justify-center mb-1">
                        <Award className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="font-semibold">#{anime.rank || 'N/A'}</div>
                      <div className="text-xs text-muted-foreground">Rank</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="font-medium">Year:</span> {anime.year || 'TBA'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Tv className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="font-medium">Episodes:</span> {anime.episodes || 'Unknown'}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="font-medium">Duration:</span> {anime.duration || 'Unknown'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="font-medium">Members:</span> {formatNumber(anime.members)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
                          <span className="font-medium">Source:</span> {anime.source || 'Unknown'}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
                          <span className="font-medium">Rating:</span> {anime.rating || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(anime.status)}`}>
                      {anime.status || 'Unknown'}
                    </span>
                  </div>
                </div>

                {/* Synopsis */}
                {anime.synopsis && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Synopsis</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {anime.synopsis}
                    </p>
                  </div>
                )}

                {/* Genres */}
                {anime.genres && anime.genres.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {anime.genres.map((genre) => (
                        <span
                          key={genre.mal_id}
                          className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Studios */}
                {anime.studios && anime.studios.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Studios</h3>
                    <div className="flex flex-wrap gap-2">
                      {anime.studios.map((studio) => (
                        <span
                          key={studio.mal_id}
                          className="inline-flex items-center space-x-1 bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full"
                        >
                          <Building className="h-3 w-3" />
                          <span>{studio.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Alternative Titles */}
                {(anime.titleEnglish || anime.title_english || anime.titleJapanese || anime.title_japanese) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Alternative Titles</h3>
                    <div className="space-y-2 text-sm">
                      {(anime.titleEnglish || anime.title_english) && (
                        <div>
                          <span className="font-medium">English:</span> {anime.titleEnglish || anime.title_english}
                        </div>
                      )}
                      {(anime.titleJapanese || anime.title_japanese) && (
                        <div>
                          <span className="font-medium">Japanese:</span> {anime.titleJapanese || anime.title_japanese}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;

