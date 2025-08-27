# Habit Tracker Pro

A professional, feature-rich habit tracking application built with React and Vite. Track your daily habits, visualize your progress, and build better routines with an intuitive and modern interface.

## Features

### 🎯 Core Functionality
- **Add & Manage Habits**: Create custom habits with names, descriptions, categories, and colors
- **Daily Tracking**: Mark habits as complete/incomplete with a simple click
- **Progress Visualization**: View completion rates and streaks for each habit
- **Categories**: Organize habits by categories (Health & Fitness, Productivity, Learning, etc.)

### 📊 Analytics & Insights
- **Statistics Overview**: View today's progress, 30-day averages, longest streaks, and total days tracked
- **Achievement System**: Unlock badges for consistency and milestones
- **Weekly Calendar**: Visual calendar view showing habit completions across the week
- **Progress Bars**: Real-time completion rate indicators

### 🎨 User Experience
- **Modern UI**: Clean, professional design with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Color Coding**: Assign custom colors to habits for easy identification
- **Local Storage**: Data persists locally in your browser
- **Smooth Animations**: Polished interactions with hover effects and transitions

## Technology Stack

- **Frontend**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone or extract the project**
   ```bash
   cd habit-tracker-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage Guide

### Adding Your First Habit

1. Click the "Add Habit" button in the header
2. Fill in the habit details:
   - **Name**: What you want to track (e.g., "Drink 8 glasses of water")
   - **Description**: Why this habit matters to you (optional)
   - **Category**: Choose from predefined categories
   - **Color**: Select a color for visual identification
   - **Frequency**: Set how often you want to do this habit
3. Click "Add Habit" to save

### Tracking Progress

- **Mark Complete**: Click the circle button next to any habit to mark it complete for today
- **View Calendar**: Switch to the Calendar tab to see your weekly progress
- **Check Statistics**: View the Statistics tab for detailed analytics and achievements

### Managing Habits

- **Edit**: Click the three-dot menu on any habit card and select "Edit"
- **Delete**: Click the three-dot menu and select "Delete" (with confirmation)
- **Color Coding**: Each habit displays with its assigned color for easy identification

## Project Structure

```
habit-tracker-pro/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── HabitCard.jsx  # Individual habit display
│   │   ├── HabitForm.jsx  # Add/edit habit form
│   │   ├── WeeklyCalendar.jsx # Calendar view
│   │   └── StatsOverview.jsx  # Statistics dashboard
│   ├── hooks/             # Custom React hooks
│   │   └── useLocalStorage.js # Local storage management
│   ├── lib/               # Utility functions
│   │   └── utils.js       # Helper functions
│   ├── App.jsx            # Main application component
│   ├── App.css            # Global styles
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## Key Components

### HabitCard
Displays individual habits with:
- Completion status and toggle button
- Progress bar showing 30-day completion rate
- Streak counter and category badge
- Edit/delete options

### WeeklyCalendar
Interactive calendar showing:
- Current week's habit completions
- Navigation between weeks
- Visual indicators for completed habits
- Today highlighting

### StatsOverview
Comprehensive analytics including:
- Today's completion progress
- 30-day average completion rate
- Longest streak achieved
- Total days tracked
- Achievement badges

## Data Storage

The application uses browser localStorage to persist data:
- **habits**: Array of habit objects
- **completions**: Object mapping habit IDs to completion dates

Data structure:
```javascript
// Habit object
{
  id: "unique_id",
  name: "Habit name",
  description: "Optional description",
  category: "Health & Fitness",
  color: "#10B981",
  frequency: "daily",
  createdAt: "2025-01-01T00:00:00.000Z"
}

// Completions object
{
  "habit_id": {
    "2025-01-01": true,
    "2025-01-02": true
  }
}
```

## Customization

### Adding New Categories
Edit the `CATEGORIES` array in `src/components/HabitForm.jsx`:
```javascript
const CATEGORIES = [
  'Health & Fitness',
  'Productivity',
  'Your New Category',
  // ...
];
```

### Changing Color Palette
Modify the `COLORS` array in `src/components/HabitForm.jsx`:
```javascript
const COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#YourColor', // Your custom color
  // ...
];
```

### Styling Customization
The app uses Tailwind CSS. Modify styles in:
- `src/App.css` for global styles
- Individual component files for component-specific styles

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the browser console for any errors
2. Ensure you're using a supported browser
3. Try clearing localStorage if you encounter data issues

---

**Built with ❤️ using React, Vite, and modern web technologies.**

