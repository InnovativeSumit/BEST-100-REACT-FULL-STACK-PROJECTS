import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, TrendingUp, Heart, AlertCircle, CheckCircle } from 'lucide-react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showTips, setShowTips] = useState(false);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('bmiHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bmiHistory', JSON.stringify(history));
  }, [history]);

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return 'underweight';
    if (bmiValue < 25) return 'normal';
    if (bmiValue < 30) return 'overweight';
    return 'obese';
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'underweight': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'overweight': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'obese': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryMessage = (category) => {
    switch (category) {
      case 'underweight': return 'You are underweight. Consider consulting a healthcare provider.';
      case 'normal': return 'You have a healthy weight. Keep up the good work!';
      case 'overweight': return 'You are overweight. Consider a balanced diet and regular exercise.';
      case 'obese': return 'You are obese. Please consult a healthcare provider for guidance.';
      default: return '';
    }
  };

  const getHealthTips = (category) => {
    switch (category) {
      case 'underweight':
        return [
          'Eat nutrient-rich, high-calorie foods',
          'Include healthy fats like nuts and avocados',
          'Consider strength training exercises',
          'Consult a nutritionist for a personalized plan'
        ];
      case 'normal':
        return [
          'Maintain your current healthy lifestyle',
          'Continue regular physical activity',
          'Eat a balanced diet with variety',
          'Stay hydrated and get adequate sleep'
        ];
      case 'overweight':
        return [
          'Focus on portion control',
          'Increase physical activity gradually',
          'Choose whole foods over processed ones',
          'Consider consulting a healthcare provider'
        ];
      case 'obese':
        return [
          'Consult a healthcare provider immediately',
          'Consider a structured weight loss program',
          'Focus on sustainable lifestyle changes',
          'Monitor your progress regularly'
        ];
      default:
        return [];
    }
  };

  const calculateBMI = async (e) => {
    e.preventDefault();
    if (!height || !weight) return;

    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    let heightInMeters, weightInKg;

    if (unit === 'metric') {
      heightInMeters = parseFloat(height);
      weightInKg = parseFloat(weight);
    } else {
      // Convert imperial to metric
      heightInMeters = parseFloat(height) * 0.3048; // feet to meters
      weightInKg = parseFloat(weight) * 0.453592; // pounds to kg
    }

    const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    const bmiCategory = getBMICategory(parseFloat(bmiValue));
    
    setBMI(bmiValue);
    setCategory(bmiCategory);
    setMessage(getCategoryMessage(bmiCategory));
    
    // Add to history
    const newEntry = {
      id: Date.now(),
      bmi: bmiValue,
      category: bmiCategory,
      date: new Date().toLocaleDateString(),
      height: height,
      weight: weight,
      unit: unit
    };
    
    setHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
    setIsCalculating(false);
  };

  const resetForm = () => {
    setHeight('');
    setWeight('');
    setBMI(null);
    setCategory('');
    setMessage('');
    setShowTips(false);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('bmiHistory');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Main Calculator Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">BMI Calculator</h1>
          </div>
          <p className="text-gray-600">Calculate your Body Mass Index and get personalized health insights</p>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setUnit('metric')}
              className={`px-4 py-2 rounded-md transition-all ${
                unit === 'metric' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Metric (m, kg)
            </button>
            <button
              type="button"
              onClick={() => setUnit('imperial')}
              className={`px-4 py-2 rounded-md transition-all ${
                unit === 'imperial' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Imperial (ft, lbs)
            </button>
          </div>
        </div>

        <form onSubmit={calculateBMI} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height {unit === 'metric' ? '(meters)' : '(feet)'}
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                step={unit === 'metric' ? '0.01' : '0.1'}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={unit === 'metric' ? 'e.g., 1.75' : 'e.g., 5.9'}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                step={unit === 'metric' ? '0.1' : '1'}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
                required
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isCalculating}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            >
              {isCalculating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate BMI
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </button>
          </div>
        </form>

        {/* Results */}
        {bmi && (
          <div className="mt-8 space-y-4">
            <div className={`p-6 rounded-xl border-2 ${getCategoryColor(category)} transition-all`}>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{bmi}</div>
                <div className="text-lg font-semibold capitalize mb-2">{category}</div>
                <p className="text-sm">{message}</p>
              </div>
            </div>

            {/* Health Tips Toggle */}
            <button
              onClick={() => setShowTips(!showTips)}
              className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center"
            >
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              {showTips ? 'Hide' : 'Show'} Health Tips
            </button>

            {/* Health Tips */}
            {showTips && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Personalized Health Tips
                </h3>
                <ul className="space-y-2">
                  {getHealthTips(category).map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* BMI Categories Reference */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
          BMI Categories
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="font-semibold text-blue-800">Underweight</div>
            <div className="text-sm text-blue-600">Below 18.5</div>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="font-semibold text-green-800">Normal</div>
            <div className="text-sm text-green-600">18.5 - 24.9</div>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="font-semibold text-yellow-800">Overweight</div>
            <div className="text-sm text-yellow-600">25.0 - 29.9</div>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="font-semibold text-red-800">Obese</div>
            <div className="text-sm text-red-600">30.0 and above</div>
          </div>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              BMI History
            </h2>
            <button
              onClick={clearHistory}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Clear History
            </button>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {history.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    entry.category === 'underweight' ? 'bg-blue-500' :
                    entry.category === 'normal' ? 'bg-green-500' :
                    entry.category === 'overweight' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="font-semibold">BMI: {entry.bmi}</div>
                    <div className="text-sm text-gray-600 capitalize">{entry.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{entry.date}</div>
                  <div className="text-xs text-gray-500">
                    {entry.height}{entry.unit === 'metric' ? 'm' : 'ft'}, {entry.weight}{entry.unit === 'metric' ? 'kg' : 'lbs'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;

