import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, BarChart3, Calendar, Home } from 'lucide-react';
import { HabitForm } from '@/components/HabitForm';
import { HabitCard } from '@/components/HabitCard';
import { WeeklyCalendar } from '@/components/WeeklyCalendar';
import { StatsOverview } from '@/components/StatsOverview';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import './App.css';

function App() {
  const [habits, setHabits] = useLocalStorage('habits', []);
  const [completions, setCompletions] = useLocalStorage('completions', {});
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleAddHabit = (newHabit) => {
    if (editingHabit) {
      setHabits(prev => prev.map(habit => 
        habit.id === editingHabit.id ? { ...newHabit, id: editingHabit.id } : habit
      ));
      setEditingHabit(null);
    } else {
      setHabits(prev => [...prev, newHabit]);
    }
    setShowForm(false);
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleDeleteHabit = (habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      setHabits(prev => prev.filter(habit => habit.id !== habitId));
      setCompletions(prev => {
        const newCompletions = { ...prev };
        delete newCompletions[habitId];
        return newCompletions;
      });
    }
  };

  const handleToggleCompletion = (habitId, date) => {
    setCompletions(prev => {
      const newCompletions = { ...prev };
      if (!newCompletions[habitId]) {
        newCompletions[habitId] = {};
      }
      
      if (newCompletions[habitId][date]) {
        delete newCompletions[habitId][date];
      } else {
        newCompletions[habitId][date] = true;
      }
      
      return newCompletions;
    });
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingHabit(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Habit Tracker Pro</h1>
            </div>
            
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Habit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <div className="mb-8">
            <HabitForm 
              onAddHabit={handleAddHabit}
              onCancel={handleCancelForm}
              initialData={editingHabit}
            />
          </div>
        ) : null}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Habits</h2>
              
              {habits.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No habits yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start building better habits by adding your first one.
                  </p>
                  <Button 
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Habit
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {habits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      completions={completions}
                      onToggleCompletion={handleToggleCompletion}
                      onEditHabit={handleEditHabit}
                      onDeleteHabit={handleDeleteHabit}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <WeeklyCalendar
              habits={habits}
              completions={completions}
              onToggleCompletion={handleToggleCompletion}
            />
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <StatsOverview
              habits={habits}
              completions={completions}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;

