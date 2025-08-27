import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  Award,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { calculateStreak, getCompletionRate, getDateString } from '@/lib/utils';

export function StatsOverview({ habits, completions }) {
  const today = getDateString(new Date());
  
  // Calculate overall stats
  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => 
    completions[habit.id] && completions[habit.id][today]
  ).length;
  
  const todayCompletionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  
  // Calculate average completion rate
  const avgCompletionRate = totalHabits > 0 
    ? Math.round(habits.reduce((sum, habit) => 
        sum + getCompletionRate(completions, habit.id), 0) / totalHabits)
    : 0;
  
  // Find longest streak
  const longestStreak = habits.reduce((max, habit) => {
    const streak = calculateStreak(completions, habit.id);
    return Math.max(max, streak);
  }, 0);
  
  // Calculate total days tracked
  const allCompletionDates = new Set();
  Object.values(completions).forEach(habitCompletions => {
    Object.keys(habitCompletions).forEach(date => {
      allCompletionDates.add(date);
    });
  });
  const totalDaysTracked = allCompletionDates.size;

  const stats = [
    {
      title: "Today's Progress",
      value: `${completedToday}/${totalHabits}`,
      percentage: todayCompletionRate,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "30-Day Average",
      value: `${avgCompletionRate}%`,
      percentage: avgCompletionRate,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Longest Streak",
      value: `${longestStreak} days`,
      percentage: Math.min(longestStreak * 3, 100), // Visual representation
      icon: Flame,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Days Tracked",
      value: `${totalDaysTracked}`,
      percentage: Math.min(totalDaysTracked, 100), // Visual representation
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  if (totalHabits === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Statistics Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Start Your Journey</h3>
            <p className="text-muted-foreground">
              Add your first habit to begin tracking your progress and see your statistics here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Statistics Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`p-4 rounded-lg ${stat.bgColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="text-sm font-medium text-gray-700">
                      {stat.title}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.value}
                  </Badge>
                </div>
                <Progress 
                  value={stat.percentage} 
                  className="h-2"
                />
              </div>
            );
          })}
        </div>
        
        {/* Achievement badges */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </h4>
          <div className="flex flex-wrap gap-2">
            {completedToday === totalHabits && totalHabits > 0 && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Perfect Day! 🎯
              </Badge>
            )}
            {longestStreak >= 7 && (
              <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                Week Warrior 🔥
              </Badge>
            )}
            {longestStreak >= 30 && (
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                Month Master 👑
              </Badge>
            )}
            {avgCompletionRate >= 80 && (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                Consistency Champion ⭐
              </Badge>
            )}
            {totalHabits >= 5 && (
              <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                Habit Collector 📚
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

