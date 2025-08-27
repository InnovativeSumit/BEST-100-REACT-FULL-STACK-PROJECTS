import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  Target, 
  MoreVertical, 
  Edit, 
  Trash2,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, getDateString, calculateStreak, getCompletionRate } from '@/lib/utils';

export function HabitCard({ habit, completions, onToggleCompletion, onEditHabit, onDeleteHabit }) {
  const today = getDateString(new Date());
  const isCompletedToday = completions[habit.id] && completions[habit.id][today];
  const streak = calculateStreak(completions, habit.id);
  const completionRate = getCompletionRate(completions, habit.id);

  const handleToggle = () => {
    onToggleCompletion(habit.id, today);
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Color indicator */}
      <div 
        className="absolute top-0 left-0 w-1 h-full"
        style={{ backgroundColor: habit.color }}
      />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {habit.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant={isCompletedToday ? "default" : "outline"}
              size="sm"
              onClick={handleToggle}
              className={cn(
                "transition-all duration-200",
                isCompletedToday && "bg-green-600 hover:bg-green-700"
              )}
            >
              {isCompletedToday ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEditHabit(habit)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDeleteHabit(habit.id)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Category badge */}
          {habit.category && (
            <Badge variant="secondary" className="text-xs">
              {habit.category}
            </Badge>
          )}
          
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">30-day completion</span>
              <span className="font-medium">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-orange-600">
              <Flame className="h-4 w-4" />
              <span className="font-medium">{streak}</span>
              <span className="text-muted-foreground">day streak</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{habit.frequency}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

