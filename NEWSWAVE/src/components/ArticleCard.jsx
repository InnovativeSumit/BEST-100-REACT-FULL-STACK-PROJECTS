import { useState } from 'react';
import { Bookmark, BookmarkCheck, ExternalLink, Calendar, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

export function ArticleCard({ article, isBookmarked, onToggleBookmark }) {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        {article.urlToImage && !imageError ? (
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
              onError={handleImageError}
              loading="lazy"
            />
            <div className="absolute top-2 right-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onToggleBookmark(article)}
                className="bg-white/90 hover:bg-white"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 text-blue-600" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400 text-center">
              <div className="text-4xl mb-2">📰</div>
              <div className="text-sm">No image available</div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
          
          {article.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
              {article.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {article.author && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="truncate max-w-24">{article.author}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          {article.source?.name && (
            <Badge variant="secondary" className="text-xs">
              {article.source.name}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleBookmark(article)}
          className="flex items-center gap-2"
        >
          {isBookmarked ? (
            <>
              <BookmarkCheck className="h-4 w-4 text-blue-600" />
              <span className="text-blue-600">Bookmarked</span>
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4" />
              <span>Bookmark</span>
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
          className="flex items-center gap-2"
        >
          <span>Read More</span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

