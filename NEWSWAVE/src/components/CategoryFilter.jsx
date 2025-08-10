import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'general', label: 'General' },
  { value: 'business', label: 'Business' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'health', label: 'Health' },
  { value: 'science', label: 'Science' },
  { value: 'sports', label: 'Sports' },
  { value: 'technology', label: 'Technology' },
];

const countries = [
  { value: 'us', label: 'United States', flag: '🇺🇸' },
  { value: 'jp', label: 'Japan', flag: '🇯🇵' },
  { value: 'gb', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'ca', label: 'Canada', flag: '🇨🇦' },
  { value: 'au', label: 'Australia', flag: '🇦🇺' },
  { value: 'de', label: 'Germany', flag: '🇩🇪' },
  { value: 'fr', label: 'France', flag: '🇫🇷' },
  { value: 'in', label: 'India', flag: '🇮🇳' },
];

export function CategoryFilter({ 
  selectedCategory, 
  selectedCountry, 
  onCategoryChange, 
  onCountryChange,
  disabled = false 
}) {
  const currentCategory = categories.find(cat => cat.value === selectedCategory);
  const currentCountry = countries.find(country => country.value === selectedCountry);

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
        <Select 
          value={selectedCategory} 
          onValueChange={onCategoryChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Country:</span>
        <Select 
          value={selectedCountry} 
          onValueChange={onCountryChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                <div className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        {currentCategory && currentCategory.value !== 'all' && (
          <Badge variant="secondary">
            {currentCategory.label}
          </Badge>
        )}
        {currentCountry && (
          <Badge variant="outline">
            {currentCountry.flag} {currentCountry.label}
          </Badge>
        )}
      </div>
    </div>
  );
}

