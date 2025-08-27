import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Date utilities
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function getDateString(date) {
  return date.toISOString().split('T')[0];
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getWeekDates(startDate = new Date()) {
  const dates = [];
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay()); // Start from Sunday
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date);
  }
  
  return dates;
}

// Habit utilities
export function calculateStreak(completions, habitId) {
  const today = new Date();
  let streak = 0;
  let currentDate = new Date(today);
  
  while (true) {
    const dateString = getDateString(currentDate);
    if (completions[habitId] && completions[habitId][dateString]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
}

export function getCompletionRate(completions, habitId, days = 30) {
  const today = new Date();
  let completed = 0;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = getDateString(date);
    
    if (completions[habitId] && completions[habitId][dateString]) {
      completed++;
    }
  }
  
  return Math.round((completed / days) * 100);
}

// Generate unique ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
