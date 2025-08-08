import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Search, Plus, X, BarChart3, Shield } from 'lucide-react'
import PokemonSearch from './components/PokemonSearch'
import TeamBuilder from './components/TeamBuilder'
import StatsVisualization from './components/StatsVisualization'
import TypeMatchupCalculator from './components/TypeMatchupCalculator'
import './App.css'

function App() {
  const [team, setTeam] = useState(Array(6).fill(null))
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const addToTeam = (pokemon) => {
    const emptySlot = team.findIndex(slot => slot === null)
    if (emptySlot !== -1) {
      const newTeam = [...team]
      newTeam[emptySlot] = pokemon
      setTeam(newTeam)
    }
  }

  const removeFromTeam = (index) => {
    const newTeam = [...team]
    newTeam[index] = null
    setTeam(newTeam)
  }

  const moveTeamMember = (fromIndex, toIndex) => {
    const newTeam = [...team]
    const temp = newTeam[fromIndex]
    newTeam[fromIndex] = newTeam[toIndex]
    newTeam[toIndex] = temp
    setTeam(newTeam)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            PokeTeam Builder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Build, analyze, and optimize your ultimate Pokémon team
          </p>
        </header>

        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Team Builder
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Pokémon Search
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Stats Analysis
            </TabsTrigger>
            <TabsTrigger value="matchups" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Type Matchups
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder">
            <TeamBuilder 
              team={team}
              onRemoveFromTeam={removeFromTeam}
              onMoveTeamMember={moveTeamMember}
            />
          </TabsContent>

          <TabsContent value="search">
            <PokemonSearch 
              onAddToTeam={addToTeam}
              team={team}
            />
          </TabsContent>

          <TabsContent value="stats">
            <StatsVisualization team={team} />
          </TabsContent>

          <TabsContent value="matchups">
            <TypeMatchupCalculator team={team} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

