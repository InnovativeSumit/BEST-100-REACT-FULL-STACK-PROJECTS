import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimeCard from './AnimeCard';

const AnimeGrid = ({ 
  animeList = [], 
  loading = false, 
  error = null, 
  onAnimeSelect,
  pagination = null,
  onPageChange,
  title = "Anime List"
}) => {
  const [selectedAnime, setSelectedAnime] = useState(null);

  const handleAnimeSelect = (anime) => {
    setSelectedAnime(anime);
    if (onAnimeSelect) {
      onAnimeSelect(anime);
    }
  };

  const handlePageChange = (newPage) => {
    if (onPageChange && newPage >= 1 && newPage <= (pagination?.last_visible_page || 1)) {
      onPageChange(newPage);
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: 24 }).map((_, index) => (
        <div key={index} className="bg-card rounded-lg border overflow-hidden">
          <div className="aspect-[3/4] bg-muted animate-pulse" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );

  // Error component
  const ErrorDisplay = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        {error || "Failed to load anime data. Please try again later."}
      </p>
      <Button 
        onClick={() => window.location.reload()} 
        variant="outline"
      >
        Try Again
      </Button>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <AlertCircle className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No anime found</h3>
      <p className="text-muted-foreground max-w-md">
        Try adjusting your search terms or filters to find what you're looking for.
      </p>
    </div>
  );

  // Pagination component
  const Pagination = () => {
    if (!pagination || pagination.last_visible_page <= 1) return null;

    const currentPage = pagination.current_page || 1;
    const totalPages = pagination.last_visible_page || 1;
    const hasNextPage = pagination.has_next_page;
    const hasPrevPage = currentPage > 1;

    // Generate page numbers to show
    const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrevPage}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            <Button
              key={index}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...'}
              className="min-w-[2.5rem]"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {pagination && !loading && !error && (
          <div className="text-sm text-muted-foreground">
            Showing {((pagination.current_page - 1) * 25) + 1}-{Math.min(pagination.current_page * 25, pagination.items?.total || 0)} 
            {pagination.items?.total && ` of ${pagination.items.total.toLocaleString()}`}
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorDisplay />
      ) : animeList.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animeList.map((anime) => (
              <AnimeCard
                key={anime.id || anime.mal_id}
                anime={anime}
                onSelect={handleAnimeSelect}
              />
            ))}
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
};

export default AnimeGrid;

