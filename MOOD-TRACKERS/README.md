# Professional Mood Tracker

A modern, feature-rich mood tracking application built with React and Vite. Track your emotional well-being with precision and gain insights into your mood patterns over time.

## 🚀 Features

### Core Functionality
- **Daily Mood Logging**: Select from 10 different mood categories with intuitive emoji-based interface
- **Date-based Tracking**: Log moods for any date, not just the current day
- **Notes & Context**: Add detailed notes to provide context for your mood entries
- **Data Persistence**: All data is stored locally in your browser using localStorage
- **Edit & Delete**: Modify or remove previous mood entries with ease

### Analytics & Visualization
- **Mood Trends Chart**: Visualize your mood patterns over the last 30 days with interactive line/bar charts
- **Mood Distribution**: See the frequency of different moods in your history
- **Filtering & Sorting**: Filter entries by specific moods and sort by date
- **Statistics Dashboard**: View total entries, filtered results, and 30-day coverage metrics

### User Experience
- **Professional Design**: Clean, modern interface with professional styling
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG-compliant design with proper ARIA attributes and keyboard navigation
- **Error Handling**: Graceful error handling with user-friendly feedback messages

## 🛠 Technology Stack

- **Frontend**: React 18.3.1
- **Build Tool**: Vite 5.4.10
- **Styling**: Tailwind CSS 3.4.14
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for modern iconography
- **Date Handling**: date-fns for date manipulation
- **Development**: ESLint for code quality

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project directory**:
   ```bash
   cd MOOD-TRACKERS
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🎯 Usage Guide

### Logging Your Mood

1. **Select Date**: Choose the date for your mood entry (defaults to today)
2. **Choose Mood**: Click on one of the 10 mood categories:
   - 😄 Very Happy
   - 😊 Happy
   - 😐 Neutral
   - 😢 Sad
   - 😭 Very Sad
   - 😡 Angry
   - 😰 Anxious
   - 🤩 Excited
   - 😌 Calm
   - 😫 Stressed

3. **Add Notes** (Optional): Provide context or details about your mood
4. **Save**: Click the "Save Mood" button to store your entry

### Viewing History & Analytics

1. **Switch to History Tab**: Click "History & Analytics" in the navigation
2. **Choose View Mode**:
   - **List View**: See all entries in a chronological list
   - **Chart View**: Visualize trends with interactive charts

3. **Filter & Sort**:
   - Filter by specific mood types
   - Sort by newest or oldest first
   - View statistics and coverage metrics

### Editing Entries

1. In List View, click the edit icon (✏️) on any entry
2. Modify the mood selection or notes
3. Click the save icon (💾) to confirm changes
4. Click the cancel icon (✖️) to discard changes

### Deleting Entries

1. In List View, click the delete icon (🗑️) on any entry
2. Confirm deletion in the popup dialog

## 🎨 Customization

### Dark Mode
Toggle between light and dark themes using the moon/sun icon in the header.

### Responsive Design
The application automatically adapts to different screen sizes:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adjusted grid layouts and touch-friendly controls
- **Mobile**: Compact design with stacked elements

## 💾 Data Storage

- **Local Storage**: All mood entries are stored in your browser's localStorage
- **Privacy**: Your data never leaves your device - completely private
- **Persistence**: Data persists across browser sessions
- **No Account Required**: No registration or login needed

## 🔧 Technical Details

### Component Architecture
- `App.jsx` - Main application component with routing and state management
- `MoodLogger.jsx` - Mood entry form with date selection and validation
- `MoodHistory.jsx` - History display with filtering and sorting
- `MoodChart.jsx` - Data visualization with Recharts
- `MoodEntry.jsx` - Individual mood entry display with edit/delete
- `LocalStorageService.js` - Data persistence utility
- `constants.js` - Application constants and mood definitions

### State Management
- React Context API for global state
- Local component state with useState and useReducer hooks
- Persistent storage with localStorage

### Error Handling
- React Error Boundaries for graceful error recovery
- Form validation with user-friendly error messages
- Try-catch blocks for localStorage operations

## 🚀 Production Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

