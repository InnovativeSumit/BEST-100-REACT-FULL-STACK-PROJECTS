import { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { filtersStorage } from '@/lib/storage';

const FilterPanel = ({ onFiltersChange, isOpen, onToggle }) => {
  const [filters, setFilters] = useState({
    genres: [],
    status: '',
    rating: '',
    sortBy: 'score',
    sortOrder: 'desc'
  });

  const [expandedSections, setExpandedSections] = useState({
    genres: true,
    status: true,
    rating: true,
    sort: true
  });

  // Available filter options
  const genreOptions = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
    { id: 4, name: 'Comedy' },
    { id: 8, name: 'Drama' },
    { id: 10, name: 'Fantasy' },
    { id: 14, name: 'Horror' },
    { id: 7, name: 'Mystery' },
    { id: 22, name: 'Romance' },
    { id: 24, name: 'Sci-Fi' },
    { id: 36, name: 'Slice of Life' },
    { id: 30, name: 'Sports' },
    { id: 37, name: 'Supernatural' },
    { id: 41, name: 'Thriller' },
    { id: 9, name: 'Ecchi' },
    { id: 49, name: 'Isekai' },
    { id: 62, name: 'Iyashikei' },
    { id: 63, name: 'Love Polygon' },
    { id: 64, name: 'Magical Sex Shift' },
    { id: 65, name: 'Mahou Shoujo' },
    { id: 66, name: 'Military' },
    { id: 67, name: 'Organized Crime' },
    { id: 68, name: 'Otaku Culture' },
    { id: 69, name: 'School' },
    { id: 70, name: 'Space' },
    { id: 71, name: 'Strategy Game' },
    { id: 72, name: 'Time Travel' },
    { id: 73, name: 'Vampire' },
    { id: 74, name: 'Workplace' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'airing', label: 'Currently Airing' },
    { value: 'complete', label: 'Finished Airing' },
    { value: 'upcoming', label: 'Not Yet Aired' }
  ];

  const ratingOptions = [
    { value: '', label: 'All Ratings' },
    { value: 'g', label: 'G - All Ages' },
    { value: 'pg', label: 'PG - Children' },
    { value: 'pg13', label: 'PG-13 - Teens 13+' },
    { value: 'r17', label: 'R - 17+ Violence & Profanity' },
    { value: 'r', label: 'R+ - Mild Nudity' },
    { value: 'rx', label: 'Rx - Hentai' }
  ];

  const sortOptions = [
    { value: 'score', label: 'Score' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'rank', label: 'Rank' },
    { value: 'title', label: 'Title' },
    { value: 'start_date', label: 'Start Date' },
    { value: 'end_date', label: 'End Date' },
    { value: 'episodes', label: 'Episodes' },
    { value: 'members', label: 'Members' }
  ];

  // Load saved filters on mount
  useEffect(() => {
    const savedFilters = filtersStorage.getFilters();
    setFilters(savedFilters);
  }, []);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    filtersStorage.setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // Handle genre toggle
  const handleGenreToggle = (genreId) => {
    const newGenres = filters.genres.includes(genreId)
      ? filters.genres.filter(id => id !== genreId)
      : [...filters.genres, genreId];
    
    handleFilterChange('genres', newGenres);
  };

  // Clear all filters
  const clearFilters = () => {
    const defaultFilters = {
      genres: [],
      status: '',
      rating: '',
      sortBy: 'score',
      sortOrder: 'desc'
    };
    setFilters(defaultFilters);
    filtersStorage.setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.genres.length > 0) count++;
    if (filters.status) count++;
    if (filters.rating) count++;
    if (filters.sortBy !== 'score' || filters.sortOrder !== 'desc') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-40 shadow-lg"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
        {activeFilterCount > 0 && (
          <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
            {activeFilterCount}
          </span>
        )}
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile overlay */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onToggle}
      />
      
      {/* Filter panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-background border-l shadow-xl overflow-y-auto lg:relative lg:w-full lg:h-auto lg:shadow-none lg:border lg:rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <h3 className="font-semibold">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                {activeFilterCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              disabled={activeFilterCount === 0}
            >
              Clear
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filter content */}
        <div className="p-4 space-y-6">
          {/* Sort */}
          <div>
            <button
              onClick={() => toggleSection('sort')}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              Sort By
              {expandedSections.sort ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.sort && (
              <div className="space-y-3">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                <div className="flex space-x-2">
                  <Button
                    variant={filters.sortOrder === 'desc' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange('sortOrder', 'desc')}
                    className="flex-1"
                  >
                    Descending
                  </Button>
                  <Button
                    variant={filters.sortOrder === 'asc' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange('sortOrder', 'asc')}
                    className="flex-1"
                  >
                    Ascending
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <button
              onClick={() => toggleSection('status')}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              Status
              {expandedSections.status ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.status && (
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Rating */}
          <div>
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              Rating
              {expandedSections.rating ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.rating && (
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {ratingOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Genres */}
          <div>
            <button
              onClick={() => toggleSection('genres')}
              className="flex items-center justify-between w-full text-left font-medium mb-3"
            >
              Genres ({filters.genres.length} selected)
              {expandedSections.genres ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.genres && (
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {genreOptions.map(genre => (
                  <Button
                    key={genre.id}
                    variant={filters.genres.includes(genre.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleGenreToggle(genre.id)}
                    className="justify-start text-xs"
                  >
                    {genre.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

