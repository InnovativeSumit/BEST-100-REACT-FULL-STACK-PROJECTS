import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { recipeAPI } from '../lib/api'

const CookingGuide = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [instructions, setInstructions] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [customTimer, setCustomTimer] = useState('')

  useEffect(() => {
    loadRecipeData()
  }, [id])

  // Timer effect
  useEffect(() => {
    let interval = null
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => {
          if (seconds <= 1) {
            setTimerActive(false)
            // Play notification sound (if supported)
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Timer finished!', {
                body: 'Your cooking timer has finished.',
                icon: '/favicon.ico'
              })
            }
            return 0
          }
          return seconds - 1
        })
      }, 1000)
    } else if (!timerActive) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timerActive, timerSeconds])

  const loadRecipeData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Load recipe details and instructions
      const [recipeData, instructionsData] = await Promise.all([
        recipeAPI.getRecipeDetails(id),
        recipeAPI.getRecipeInstructions(id)
      ])
      
      setRecipe(recipeData)
      
      // Process instructions
      if (instructionsData && instructionsData.length > 0) {
        const steps = instructionsData[0].steps || []
        setInstructions(steps)
      } else {
        setInstructions([])
      }
    } catch (error) {
      console.error('Error loading recipe data:', error)
      setError('Failed to load cooking instructions')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < instructions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const startTimer = (minutes) => {
    setTimerSeconds(minutes * 60)
    setTimerActive(true)
  }

  const startCustomTimer = () => {
    const minutes = parseInt(customTimer)
    if (minutes > 0) {
      startTimer(minutes)
      setCustomTimer('')
    }
  }

  const toggleTimer = () => {
    setTimerActive(!timerActive)
  }

  const resetTimer = () => {
    setTimerActive(false)
    setTimerSeconds(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const extractTimeFromStep = (stepText) => {
    const timeRegex = /(\d+)\s*(minute|min|hour|hr)s?/gi
    const matches = stepText.match(timeRegex)
    if (matches) {
      const match = matches[0]
      const number = parseInt(match)
      const unit = match.toLowerCase().includes('hour') || match.toLowerCase().includes('hr') ? 'hour' : 'minute'
      return unit === 'hour' ? number * 60 : number
    }
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading cooking guide...</span>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">Cooking guide not available</h3>
        <p className="text-muted-foreground mb-6">{error || 'Instructions not found for this recipe.'}</p>
        <Link to={`/recipe/${id}`}>
          <Button>Back to Recipe</Button>
        </Link>
      </div>
    )
  }

  const progress = instructions.length > 0 ? ((currentStep + 1) / instructions.length) * 100 : 0
  const currentInstruction = instructions[currentStep]
  const suggestedTime = currentInstruction ? extractTimeFromStep(currentInstruction.step) : null

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to={`/recipe/${id}`}>
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipe
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-center flex-1">{recipe.title}</h1>
        <div className="w-24"></div> {/* Spacer for centering */}
      </div>

      {/* Progress */}
      {instructions.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {instructions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Instructions */}
        <div className="lg:col-span-2 space-y-6">
          {instructions.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Step {currentStep + 1}</span>
                  {currentStep === instructions.length - 1 && (
                    <Badge variant="default" className="bg-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Final Step
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">{currentInstruction.step}</p>
                
                {/* Ingredients for this step */}
                {currentInstruction.ingredients && currentInstruction.ingredients.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Ingredients needed:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentInstruction.ingredients.map((ingredient, index) => (
                        <Badge key={index} variant="secondary">
                          {ingredient.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Equipment for this step */}
                {currentInstruction.equipment && currentInstruction.equipment.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Equipment needed:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentInstruction.equipment.map((equipment, index) => (
                        <Badge key={index} variant="outline">
                          {equipment.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested timer */}
                {suggestedTime && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Suggested timing:</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => startTimer(suggestedTime)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Set {suggestedTime} minute timer
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No step-by-step instructions available for this recipe.</p>
                <p className="text-sm text-muted-foreground mt-2">Check the recipe details for general instructions.</p>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          {instructions.length > 0 && (
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentStep === instructions.length - 1 ? (
                <Link to={`/recipe/${id}`}>
                  <Button>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Finish Cooking
                  </Button>
                </Link>
              ) : (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Timer Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Cooking Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Timer Display */}
              <div className="text-center">
                <div className={`text-4xl font-mono font-bold ${timerSeconds > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {formatTime(timerSeconds)}
                </div>
                {timerSeconds > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {timerActive ? 'Running' : 'Paused'}
                  </p>
                )}
              </div>

              {/* Timer Controls */}
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleTimer}
                  disabled={timerSeconds === 0}
                  className="flex-1"
                >
                  {timerActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetTimer}
                  disabled={timerSeconds === 0}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Timer Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 5, 10, 15, 20, 30].map((minutes) => (
                  <Button 
                    key={minutes}
                    variant="outline" 
                    size="sm"
                    onClick={() => startTimer(minutes)}
                  >
                    {minutes}m
                  </Button>
                ))}
              </div>

              {/* Custom Timer */}
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Minutes"
                  value={customTimer}
                  onChange={(e) => setCustomTimer(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background"
                  min="1"
                  max="999"
                />
                <Button 
                  size="sm" 
                  onClick={startCustomTimer}
                  disabled={!customTimer || parseInt(customTimer) <= 0}
                >
                  Set
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recipe Info */}
          <Card>
            <CardHeader>
              <CardTitle>Recipe Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Time:</span>
                <span>{recipe.readyInMinutes} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Servings:</span>
                <span>{recipe.servings}</span>
              </div>
              {recipe.cookingMinutes && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cooking:</span>
                  <span>{recipe.cookingMinutes} min</span>
                </div>
              )}
              {recipe.preparationMinutes && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prep:</span>
                  <span>{recipe.preparationMinutes} min</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CookingGuide

