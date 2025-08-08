import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { BarChart3, TrendingUp, Award } from 'lucide-react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { Radar, Bar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
)

const StatsVisualization = ({ team }) => {
  const teamMembers = team.filter(pokemon => pokemon !== null)

  const radarData = useMemo(() => {
    if (teamMembers.length === 0) return null

    const statNames = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed']
    const statKeys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']

    const datasets = teamMembers.map((pokemon, index) => {
      const colors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ]
      
      const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ]

      return {
        label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        data: statKeys.map(key => pokemon.stats[key]),
        backgroundColor: colors[index % colors.length],
        borderColor: borderColors[index % borderColors.length],
        borderWidth: 2,
        pointBackgroundColor: borderColors[index % borderColors.length],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: borderColors[index % borderColors.length]
      }
    })

    return {
      labels: statNames,
      datasets
    }
  }, [teamMembers])

  const barData = useMemo(() => {
    if (teamMembers.length === 0) return null

    const statKeys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']
    const statNames = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed']

    const averageStats = statKeys.map(key => {
      const total = teamMembers.reduce((sum, pokemon) => sum + pokemon.stats[key], 0)
      return Math.round(total / teamMembers.length)
    })

    return {
      labels: statNames,
      datasets: [{
        label: 'Team Average',
        data: averageStats,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 205, 86, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)'
        ],
        borderWidth: 2
      }]
    }
  }, [teamMembers])

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.r}`
          }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 200,
        ticks: {
          stepSize: 50
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Average: ${context.parsed.y}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 150,
        ticks: {
          stepSize: 25
        }
      }
    }
  }

  const getTeamAnalysis = () => {
    if (teamMembers.length === 0) return null

    const statKeys = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']
    const statNames = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed']
    
    const averages = statKeys.map(key => {
      const total = teamMembers.reduce((sum, pokemon) => sum + pokemon.stats[key], 0)
      return Math.round(total / teamMembers.length)
    })

    const maxStatIndex = averages.indexOf(Math.max(...averages))
    const minStatIndex = averages.indexOf(Math.min(...averages))

    const totalBST = teamMembers.reduce((sum, pokemon) => {
      return sum + Object.values(pokemon.stats).reduce((a, b) => a + b, 0)
    }, 0)

    const averageBST = Math.round(totalBST / teamMembers.length)

    return {
      strongest: statNames[maxStatIndex],
      weakest: statNames[minStatIndex],
      averageBST,
      totalBST
    }
  }

  const analysis = getTeamAnalysis()

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

  if (teamMembers.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64 text-gray-400">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg">No Pokémon in your team</p>
            <p className="text-sm">Add some Pokémon to see their stats visualization</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Individual Stats Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {radarData && <Radar data={radarData} options={radarOptions} />}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Team Average Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {barData && <Bar data={barData} options={barOptions} />}
            </div>
          </CardContent>
        </Card>
      </div>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Team Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{analysis.strongest}</p>
                <p className="text-sm text-gray-600">Strongest Stat</p>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{analysis.weakest}</p>
                <p className="text-sm text-gray-600">Weakest Stat</p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{analysis.averageBST}</p>
                <p className="text-sm text-gray-600">Average BST</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{teamMembers.length}</p>
                <p className="text-sm text-gray-600">Team Size</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Team Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((pokemon, index) => (
              <div key={pokemon.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="w-12 h-12 object-contain"
                />
                <div className="flex-1">
                  <p className="font-semibold capitalize">{pokemon.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pokemon.types.map(type => (
                      <Badge
                        key={type}
                        className={`${getTypeColor(type)} text-white text-xs`}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    BST: {Object.values(pokemon.stats).reduce((a, b) => a + b, 0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsVisualization

