import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

const TypeMatchupCalculator = ({ team }) => {
  const teamMembers = team.filter(pokemon => pokemon !== null)

  // Type effectiveness chart
  const typeChart = {
    normal: { weak: ['fighting'], resist: [], immune: ['ghost'] },
    fire: { weak: ['water', 'ground', 'rock'], resist: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'], immune: [] },
    water: { weak: ['electric', 'grass'], resist: ['fire', 'water', 'ice', 'steel'], immune: [] },
    electric: { weak: ['ground'], resist: ['electric', 'flying', 'steel'], immune: [] },
    grass: { weak: ['fire', 'ice', 'poison', 'flying', 'bug'], resist: ['water', 'electric', 'grass', 'ground'], immune: [] },
    ice: { weak: ['fire', 'fighting', 'rock', 'steel'], resist: ['ice'], immune: [] },
    fighting: { weak: ['flying', 'psychic', 'fairy'], resist: ['bug', 'rock', 'dark'], immune: [] },
    poison: { weak: ['ground', 'psychic'], resist: ['grass', 'fighting', 'poison', 'bug', 'fairy'], immune: [] },
    ground: { weak: ['water', 'grass', 'ice'], resist: ['poison', 'rock'], immune: ['electric'] },
    flying: { weak: ['electric', 'ice', 'rock'], resist: ['grass', 'fighting', 'bug'], immune: ['ground'] },
    psychic: { weak: ['bug', 'ghost', 'dark'], resist: ['fighting', 'psychic'], immune: [] },
    bug: { weak: ['fire', 'flying', 'rock'], resist: ['grass', 'fighting', 'ground'], immune: [] },
    rock: { weak: ['water', 'grass', 'fighting', 'ground', 'steel'], resist: ['normal', 'fire', 'poison', 'flying'], immune: [] },
    ghost: { weak: ['ghost', 'dark'], resist: ['poison', 'bug'], immune: ['normal', 'fighting'] },
    dragon: { weak: ['ice', 'dragon', 'fairy'], resist: ['fire', 'water', 'electric', 'grass'], immune: [] },
    dark: { weak: ['fighting', 'bug', 'fairy'], resist: ['ghost', 'dark'], immune: ['psychic'] },
    steel: { weak: ['fire', 'fighting', 'ground'], resist: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'], immune: ['poison'] },
    fairy: { weak: ['poison', 'steel'], resist: ['fighting', 'bug', 'dark'], immune: ['dragon'] }
  }

  const allTypes = Object.keys(typeChart)

  const teamTypeAnalysis = useMemo(() => {
    if (teamMembers.length === 0) return null

    const weaknesses = {}
    const resistances = {}
    const immunities = {}

    // Calculate team-wide type effectiveness
    allTypes.forEach(attackingType => {
      let totalEffectiveness = 0
      let pokemonAffected = 0

      teamMembers.forEach(pokemon => {
        let effectiveness = 1
        
        pokemon.types.forEach(defenderType => {
          const typeData = typeChart[defenderType]
          if (typeData.weak.includes(attackingType)) {
            effectiveness *= 2
          } else if (typeData.resist.includes(attackingType)) {
            effectiveness *= 0.5
          } else if (typeData.immune.includes(attackingType)) {
            effectiveness *= 0
          }
        })

        totalEffectiveness += effectiveness
        if (effectiveness !== 1) pokemonAffected++
      })

      const averageEffectiveness = totalEffectiveness / teamMembers.length

      if (averageEffectiveness > 1) {
        weaknesses[attackingType] = {
          effectiveness: averageEffectiveness,
          pokemonAffected,
          severity: averageEffectiveness >= 2 ? 'high' : 'medium'
        }
      } else if (averageEffectiveness < 1 && averageEffectiveness > 0) {
        resistances[attackingType] = {
          effectiveness: averageEffectiveness,
          pokemonAffected,
          strength: averageEffectiveness <= 0.5 ? 'high' : 'medium'
        }
      } else if (averageEffectiveness === 0) {
        immunities[attackingType] = {
          pokemonAffected
        }
      }
    })

    return { weaknesses, resistances, immunities }
  }, [teamMembers])

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

  const getIndividualMatchups = () => {
    return teamMembers.map(pokemon => {
      const weaknesses = []
      const resistances = []
      const immunities = []

      allTypes.forEach(attackingType => {
        let effectiveness = 1
        
        pokemon.types.forEach(defenderType => {
          const typeData = typeChart[defenderType]
          if (typeData.weak.includes(attackingType)) {
            effectiveness *= 2
          } else if (typeData.resist.includes(attackingType)) {
            effectiveness *= 0.5
          } else if (typeData.immune.includes(attackingType)) {
            effectiveness *= 0
          }
        })

        if (effectiveness > 1) {
          weaknesses.push({ type: attackingType, effectiveness })
        } else if (effectiveness < 1 && effectiveness > 0) {
          resistances.push({ type: attackingType, effectiveness })
        } else if (effectiveness === 0) {
          immunities.push({ type: attackingType })
        }
      })

      return {
        pokemon,
        weaknesses: weaknesses.sort((a, b) => b.effectiveness - a.effectiveness),
        resistances: resistances.sort((a, b) => a.effectiveness - b.effectiveness),
        immunities
      }
    })
  }

  const individualMatchups = getIndividualMatchups()

  if (teamMembers.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64 text-gray-400">
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg">No Pokémon in your team</p>
            <p className="text-sm">Add some Pokémon to analyze type matchups</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {teamTypeAnalysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Team Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(teamTypeAnalysis.weaknesses).length === 0 ? (
                <p className="text-gray-500 text-sm">No significant weaknesses</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(teamTypeAnalysis.weaknesses)
                    .sort(([,a], [,b]) => b.effectiveness - a.effectiveness)
                    .map(([type, data]) => (
                      <div key={type} className="flex items-center justify-between">
                        <Badge className={`${getTypeColor(type)} text-white`}>
                          {type}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm font-semibold">
                            {data.effectiveness.toFixed(1)}x
                          </p>
                          <p className="text-xs text-gray-500">
                            {data.pokemonAffected}/{teamMembers.length} affected
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                Team Resistances
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(teamTypeAnalysis.resistances).length === 0 ? (
                <p className="text-gray-500 text-sm">No significant resistances</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(teamTypeAnalysis.resistances)
                    .sort(([,a], [,b]) => a.effectiveness - b.effectiveness)
                    .map(([type, data]) => (
                      <div key={type} className="flex items-center justify-between">
                        <Badge className={`${getTypeColor(type)} text-white`}>
                          {type}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm font-semibold">
                            {data.effectiveness.toFixed(1)}x
                          </p>
                          <p className="text-xs text-gray-500">
                            {data.pokemonAffected}/{teamMembers.length} affected
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <XCircle className="w-5 h-5" />
                Team Immunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(teamTypeAnalysis.immunities).length === 0 ? (
                <p className="text-gray-500 text-sm">No immunities</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(teamTypeAnalysis.immunities).map(([type, data]) => (
                    <div key={type} className="flex items-center justify-between">
                      <Badge className={`${getTypeColor(type)} text-white`}>
                        {type}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-semibold">0x</p>
                        <p className="text-xs text-gray-500">
                          {data.pokemonAffected}/{teamMembers.length} immune
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Individual Pokémon Matchups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {individualMatchups.map((data, index) => (
              <div key={data.pokemon.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={data.pokemon.sprite}
                    alt={data.pokemon.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold capitalize">{data.pokemon.name}</h3>
                    <div className="flex gap-1">
                      {data.pokemon.types.map(type => (
                        <Badge
                          key={type}
                          className={`${getTypeColor(type)} text-white text-xs`}
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-red-600 mb-2">Weak to:</h4>
                    <div className="flex flex-wrap gap-1">
                      {data.weaknesses.length === 0 ? (
                        <span className="text-gray-500 text-sm">None</span>
                      ) : (
                        data.weaknesses.map(w => (
                          <Badge
                            key={w.type}
                            className={`${getTypeColor(w.type)} text-white text-xs`}
                          >
                            {w.type} ({w.effectiveness}x)
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Resists:</h4>
                    <div className="flex flex-wrap gap-1">
                      {data.resistances.length === 0 ? (
                        <span className="text-gray-500 text-sm">None</span>
                      ) : (
                        data.resistances.map(r => (
                          <Badge
                            key={r.type}
                            className={`${getTypeColor(r.type)} text-white text-xs`}
                          >
                            {r.type} ({r.effectiveness}x)
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-600 mb-2">Immune to:</h4>
                    <div className="flex flex-wrap gap-1">
                      {data.immunities.length === 0 ? (
                        <span className="text-gray-500 text-sm">None</span>
                      ) : (
                        data.immunities.map(i => (
                          <Badge
                            key={i.type}
                            className={`${getTypeColor(i.type)} text-white text-xs`}
                          >
                            {i.type}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TypeMatchupCalculator

