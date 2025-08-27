import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getWeekDates, getDateString, formatDate } from '@/lib/utils';
import { useState } from 'react';

export function WeeklyCalendar({ habits, completions, onToggleCompletion }) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const weekDates = getWeekDates(currentWeek);
  const today = getDateString(new Date());

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newDate);
  };

  const isToday = (date) => {
    return getDateString(date) === today;
  };

  const isCompleted = (habitId, date) => {
    const dateString = getDateString(date);
    return completions[habitId] && completions[habitId][dateString];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Weekly View</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateWeek(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateWeek(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Day headers */}
          <div className="grid grid-cols-8 gap-2">
            <div className="text-sm font-medium text-muted-foreground">Habit</div>
            {weekDates.map((date) => (
              <div key={getDateString(date)} className="text-center">
                <div className="text-xs text-muted-foreground">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-sm font-medium ${isToday(date) ? 'text-blue-600' : ''}`}>
                  {date.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Habit rows */}
          {habits.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No habits yet. Add your first habit to get started!
            </div>
          ) : (
            <div className="space-y-2">
              {habits.map((habit) => (
                <div key={habit.id} className="grid grid-cols-8 gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: habit.color }}
                    />
                    <span className="text-sm font-medium truncate">{habit.name}</span>
                  </div>
                  
                  {weekDates.map((date) => {
                    const dateString = getDateString(date);
                    const completed = isCompleted(habit.id, date);
                    
                    return (
                      <button
                        key={dateString}
                        onClick={() => onToggleCompletion(habit.id, dateString)}
                        className={`
                          w-8 h-8 rounded-full border-2 transition-all duration-200
                          ${completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 hover:border-gray-400'
                          }
                          ${isToday(date) ? 'ring-2 ring-blue-200' : ''}
                        `}
                      >
                        {completed && (
                          <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

