import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { X, Users, ArrowUpDown } from 'lucide-react'

const TeamBuilder = ({ team, onRemoveFromTeam, onMoveTeamMember }) => {
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  const handleDragStart = (e, index) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onMoveTeamMember(draggedIndex, dropIndex)
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
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

  const getTeamStats = () => {
    const filledSlots = team.filter(pokemon => pokemon !== null)
    if (filledSlots.length === 0) return null

    const totalStats = filledSlots.reduce((acc, pokemon) => {
      acc.hp += pokemon.stats.hp
      acc.attack += pokemon.stats.attack
      acc.defense += pokemon.stats.defense
      acc.specialAttack += pokemon.stats['special-attack']
      acc.specialDefense += pokemon.stats['special-defense']
      acc.speed += pokemon.stats.speed
      return acc
    }, { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 })

    const avgStats = {
      hp: Math.round(totalStats.hp / filledSlots.length),
      attack: Math.round(totalStats.attack / filledSlots.length),
      defense: Math.round(totalStats.defense / filledSlots.length),
      specialAttack: Math.round(totalStats.specialAttack / filledSlots.length),
      specialDefense: Math.round(totalStats.specialDefense / filledSlots.length),
      speed: Math.round(totalStats.speed / filledSlots.length)
    }

    return { total: totalStats, average: avgStats, count: filledSlots.length }
  }

  const teamStats = getTeamStats()

  const TeamSlot = ({ pokemon, index }) => {
    const isEmpty = pokemon === null
    const isDraggedOver = dragOverIndex === index
    const isDragged = draggedIndex === index

    return (
      <Card 
        className={`
          relative transition-all duration-200 cursor-pointer
          ${isEmpty ? 'border-dashed border-2 border-gray-300 bg-gray-50' : 'hover:shadow-lg'}
          ${isDraggedOver ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
          ${isDragged ? 'opacity-50 scale-95' : ''}
        `}
        draggable={!isEmpty}
        onDragStart={(e) => handleDragStart(e, index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, index)}
      >
        {isEmpty ? (
          <CardContent className="flex items-center justify-center h-48 text-gray-400">
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Empty Slot {index + 1}</p>
              <p className="text-xs">Drag a Pokémon here</p>
            </div>
          </CardContent>
        ) : (
          <>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg capitalize">{pokemon.name}</CardTitle>
                  <p className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onRemoveFromTeam(index)}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="w-20 h-20 object-contain"
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
                <div className="grid grid-cols-2 gap-2 text-xs text-center w-full">
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
                  <div>
                    <p className="font-semibold">SPD</p>
                    <p>{pokemon.stats.speed}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {index + 1}
            </div>
          </>
        )}
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Your Team ({team.filter(p => p !== null).length}/6)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((pokemon, index) => (
              <TeamSlot key={index} pokemon={pokemon} index={index} />
            ))}
          </div>
        </CardContent>
      </Card>

      {teamStats && (
        <Card>
          <CardHeader>
            <CardTitle>Team Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">{teamStats.average.hp}</p>
                <p className="text-sm text-gray-600">Avg HP</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{teamStats.average.attack}</p>
                <p className="text-sm text-gray-600">Avg Attack</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">{teamStats.average.defense}</p>
                <p className="text-sm text-gray-600">Avg Defense</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-500">{teamStats.average.specialAttack}</p>
                <p className="text-sm text-gray-600">Avg Sp. Atk</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{teamStats.average.specialDefense}</p>
                <p className="text-sm text-gray-600">Avg Sp. Def</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-500">{teamStats.average.speed}</p>
                <p className="text-sm text-gray-600">Avg Speed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <ArrowUpDown className="w-5 h-5" />
            <p className="text-sm">
              <strong>Tip:</strong> Drag and drop Pokémon between slots to rearrange your team. 
              Search for Pokémon in the "Pokémon Search" tab to add them to your team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeamBuilder

