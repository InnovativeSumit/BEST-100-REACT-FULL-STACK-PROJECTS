import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Search, Plus, Loader2 } from 'lucide-react'

const PokemonSearch = ({ onAddToTeam, team }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [popularPokemon, setPopularPokemon] = useState([])

  useEffect(() => {
    // Load some popular Pokemon on component mount
    loadPopularPokemon()
  }, [])

  const loadPopularPokemon = async () => {
    setIsLoading(true)
    try {
      const popularIds = [892, 898, 889, 812, 778, 591, 248, 381, 663, 6, 3, 9]
      const promises = popularIds.map(id => fetchPokemonById(id))
      const results = await Promise.all(promises)
      setPopularPokemon(results.filter(p => p !== null))
    } catch (error) {
      console.error('Error loading popular Pokemon:', error)
    }
    setIsLoading(false)
  }

  const fetchPokemonById = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      if (!response.ok) return null
      
      const pokemon = await response.json()
      const speciesResponse = await fetch(pokemon.species.url)
      const species = await speciesResponse.json()
      
      return {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
        types: pokemon.types.map(t => t.type.name),
        stats: pokemon.stats.reduce((acc, stat) => {
          acc[stat.stat.name] = stat.base_stat
          return acc
        }, {}),
        abilities: pokemon.abilities.map(a => a.ability.name),
        height: pokemon.height,
        weight: pokemon.weight,
        genus: species.genera.find(g => g.language.name === 'en')?.genus || 'Unknown'
      }
    } catch (error) {
      console.error('Error fetching Pokemon:', error)
      return null
    }
  }

  const searchPokemon = async () => {
    if (!searchTerm.trim()) return
    
    setIsLoading(true)
    setSearchResults([])
    
    try {
      const searchLower = searchTerm.toLowerCase().trim()
      
      // Try exact name match first
      let pokemon = await fetchPokemonById(searchLower)
      
      if (pokemon) {
        setSearchResults([pokemon])
      } else {
        // If no exact match, try ID search
        if (!isNaN(searchLower)) {
          pokemon = await fetchPokemonById(parseInt(searchLower))
          if (pokemon) {
            setSearchResults([pokemon])
          }
        }
        
        if (!pokemon) {
          setSearchResults([])
        }
      }
    } catch (error) {
      console.error('Error searching Pokemon:', error)
      setSearchResults([])
    }
    
    setIsLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPokemon()
    }
  }

  const canAddToTeam = (pokemon) => {
    return team.some(slot => slot === null) && !team.some(member => member?.id === pokemon.id)
  }

  const getTypeColor = (type) => {
    const colors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300'
    }
    return colors[type] || 'bg-gray-400'
  }

  const PokemonCard = ({ pokemon }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg capitalize">{pokemon.name}</CardTitle>
            <p className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
            <p className="text-xs text-gray-400">{pokemon.genus}</p>
          </div>
          <Button
            size="sm"
            onClick={() => onAddToTeam(pokemon)}
            disabled={!canAddToTeam(pokemon)}
            className="shrink-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-3">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="w-24 h-24 object-contain"
            loading="lazy"
          />
          <div className="flex flex-wrap gap-1 justify-center">
            {pokemon.types.map(type => (
              <Badge
                key={type}
                className={`${getTypeColor(type)} text-white text-xs`}
              >
                {type}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-center w-full">
            <div>
              <p className="font-semibold">HP</p>
              <p>{pokemon.stats.hp}</p>
            </div>
            <div>
              <p className="font-semibold">ATK</p>
              <p>{pokemon.stats.attack}</p>
            </div>
            <div>
              <p className="font-semibold">DEF</p>
              <p>{pokemon.stats.defense}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Pokémon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter Pokémon name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={searchPokemon} disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Search Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {searchResults.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-4">Popular Pokémon</h3>
        {isLoading && popularPokemon.length === 0 ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {popularPokemon.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonSearch

