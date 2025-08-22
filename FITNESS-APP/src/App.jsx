import { useState } from 'react'
import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Heart, Activity, Target, ChefHat, ArrowRight, ArrowLeft } from 'lucide-react'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    medicalReports: null
  })
  const [dietPlan, setDietPlan] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { title: 'Welcome', icon: Heart },
    { title: 'Health Parameters', icon: Activity },
    { title: 'Medical Reports', icon: Target },
    { title: 'Diet Plan', icon: ChefHat }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      medicalReports: file
    }))
  }

  const generateDietPlan = async () => {
    setIsLoading(true)
    
    // Simulate API call with mock data since we don't have the backend
    const mockDietPlan = `
**Personalized Diet Plan for ${formData.age} year old**

**Daily Nutritional Goals:**
- Calories: ${Math.round(1800 + (parseInt(formData.weight) * 10))} kcal
- Protein: ${Math.round(parseInt(formData.weight) * 1.2)}g
- Carbohydrates: 45-65% of total calories
- Healthy fats: 20-35% of total calories

**Meal Plan:**

**Breakfast (7:00 AM):**
- 1 cup oatmeal with berries and almonds
- 1 glass low-fat milk
- 1 medium banana

**Mid-Morning Snack (10:00 AM):**
- 1 apple with 1 tbsp almond butter

**Lunch (1:00 PM):**
- Quinoa salad with roasted vegetables
- Grilled chicken breast (100g)
- Mixed green salad with olive oil dressing

**Afternoon Snack (4:00 PM):**
- Greek yogurt with honey and walnuts

**Dinner (7:00 PM):**
- Baked salmon with herbs
- Steamed broccoli and carrots
- 1/2 cup brown rice

**Evening Snack (9:00 PM):**
- Herbal tea with 5-6 almonds

**Hydration:**
- 8-10 glasses of water throughout the day
- Green tea (2 cups)

**Special Recommendations:**
- Eat meals at regular intervals
- Include variety in your diet
- Monitor portion sizes
- Stay physically active
${formData.medicalReports ? '- Follow up with your healthcare provider regarding your medical reports' : ''}

**Note:** This is a general diet plan. Please consult with a healthcare professional before making significant dietary changes.
    `
    
    // Simulate loading time
    setTimeout(() => {
      setDietPlan(mockDietPlan)
      setIsLoading(false)
      setCurrentStep(3)
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.age && formData.height && formData.weight
      case 2:
        return true // Medical reports are optional
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Personal Dietitian
          </h1>
          <p className="text-lg text-gray-600">
            Your health is our priority. Let's create a personalized diet plan.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              
              return (
                <div key={index} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all
                    ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 
                      isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                      'bg-white border-gray-300 text-gray-400'}
                  `}>
                    <Icon size={20} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep].icon, { size: 24 })}
              {steps[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Welcome Step */}
            {currentStep === 0 && (
              <div className="text-center space-y-6">
                <div className="text-6xl">🏥</div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Welcome to Your Personal Dietitian</h2>
                  <p className="text-gray-600 mb-6">
                    We'll help you create a personalized diet plan based on your health parameters 
                    and medical information. This process will take just a few minutes.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Activity className="mx-auto mb-2 text-blue-600" size={24} />
                      <h3 className="font-medium">Health Assessment</h3>
                      <p className="text-sm text-gray-600">Enter your basic health parameters</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Target className="mx-auto mb-2 text-green-600" size={24} />
                      <h3 className="font-medium">Medical History</h3>
                      <p className="text-sm text-gray-600">Optional medical reports upload</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <ChefHat className="mx-auto mb-2 text-purple-600" size={24} />
                      <h3 className="font-medium">Custom Diet Plan</h3>
                      <p className="text-sm text-gray-600">Get your personalized meal plan</p>
                    </div>
                  </div>
                </div>
                <Button onClick={nextStep} className="w-full">
                  Get Started <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            )}

            {/* Health Parameters Step */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <CardDescription>
                  Please provide your basic health information to create an accurate diet plan.
                </CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Age (years)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 45"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Height (cm)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 165"
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 70"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                    />
                  </div>
                </div>
                
                {formData.age && formData.height && formData.weight && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium mb-2">Quick Health Summary:</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Age: {formData.age} years</Badge>
                      <Badge variant="secondary">Height: {formData.height} cm</Badge>
                      <Badge variant="secondary">Weight: {formData.weight} kg</Badge>
                      <Badge variant="secondary">
                        BMI: {(formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1)}
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2" size={16} /> Back
                  </Button>
                  <Button onClick={nextStep} disabled={!isStepValid()}>
                    Next <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Medical Reports Step */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <CardDescription>
                  Upload any recent medical reports or lab results (optional). This helps us create a more accurate diet plan.
                </CardDescription>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="medical-reports"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="medical-reports" className="cursor-pointer">
                    <div className="text-4xl mb-4">📄</div>
                    <h3 className="text-lg font-medium mb-2">Upload Medical Reports</h3>
                    <p className="text-gray-600 mb-4">
                      Click to select files or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      Supported formats: PDF, JPG, PNG, DOC, DOCX
                    </p>
                  </label>
                </div>

                {formData.medicalReports && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium mb-2">Uploaded File:</h3>
                    <Badge variant="secondary">{formData.medicalReports.name}</Badge>
                  </div>
                )}

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Medical reports are optional but help create a more personalized diet plan. 
                    Your privacy is protected and files are processed securely.
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2" size={16} /> Back
                  </Button>
                  <Button onClick={generateDietPlan} disabled={isLoading}>
                    {isLoading ? 'Generating Plan...' : 'Generate Diet Plan'}
                    {!isLoading && <ArrowRight className="ml-2" size={16} />}
                  </Button>
                </div>
              </div>
            )}

            {/* Diet Plan Step */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <CardDescription>
                  Your personalized diet plan is ready! Follow this plan for optimal health.
                </CardDescription>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-green-800">
                    🎉 Your Diet Plan is Ready!
                  </h3>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                      {dietPlan}
                    </pre>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(0)}>
                    Start Over
                  </Button>
                  <Button onClick={() => {
                    const element = document.createElement('a')
                    const file = new Blob([dietPlan], { type: 'text/plain' })
                    element.href = URL.createObjectURL(file)
                    element.download = 'my-diet-plan.txt'
                    document.body.appendChild(element)
                    element.click()
                    document.body.removeChild(element)
                  }}>
                    Download Plan
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Always consult with healthcare professionals before making significant dietary changes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

