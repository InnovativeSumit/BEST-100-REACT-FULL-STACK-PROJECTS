# Professional Stock Dashboard

A modern, responsive stock dashboard built with React, Vite, and Tailwind CSS. Features real-time stock data, interactive charts, dark/light mode toggle, and a professional UI/UX design.

## 🚀 Features

- **Real-time Stock Data**: Live stock prices, changes, and market information
- **Interactive Charts**: Dynamic price charts with multiple time periods (1D, 1W, 1M, 1Y)
- **Smart Search**: Intelligent stock symbol search with autocomplete suggestions
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Optimized for desktop and mobile devices
- **Professional UI**: Modern design using shadcn/ui components and Tailwind CSS
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Company Details**: Comprehensive company information and logos

## 🛠️ Tech Stack

- **Frontend**: React 18 with JSX
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API**: Finnhub Stock API (with fallback mock data)

## 📦 Installation

1. **Clone or extract the project**:
   ```bash
   cd stock-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🎯 Usage

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Features Usage

1. **Search Stocks**: Type in the search bar to find stocks (e.g., AAPL, MSFT, TSLA)
2. **View Charts**: Click time period buttons (1D, 1W, 1M, 1Y) to change chart timeframe
3. **Toggle Theme**: Click the Dark/Light Mode button in the header
4. **Company Details**: Scroll down to view comprehensive company information

## 🏗️ Project Structure

```
stock-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Chart.jsx        # Interactive price chart
│   │   ├── Dashboard.jsx    # Main dashboard layout
│   │   ├── Details.jsx      # Company details section
│   │   ├── Header.jsx       # Header with theme toggle
│   │   ├── Overview.jsx     # Stock price overview
│   │   └── Search.jsx       # Stock search component
│   ├── contexts/
│   │   ├── StockContext.jsx # Stock data context
│   │   └── ThemeContext.jsx # Theme context
│   ├── utils/
│   │   └── api/
│   │       └── stock-api.js # Stock API utilities
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   └── main.jsx             # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design Features

- **Modern Gradient Backgrounds**: Subtle gradients for visual depth
- **Glass Morphism**: Backdrop blur effects on cards
- **Smooth Transitions**: 300ms transitions for all interactive elements
- **Hover Effects**: Subtle scale and color changes on interactive elements
- **Loading States**: Skeleton loaders and spinners for better UX
- **Responsive Grid**: CSS Grid layout that adapts to screen sizes
- **Professional Typography**: Carefully chosen font weights and sizes

## 🌙 Dark Mode

The application features a sophisticated dark mode implementation:

- **System Preference Detection**: Automatically detects user's system theme
- **Local Storage Persistence**: Remembers user's theme preference
- **Smooth Transitions**: Animated theme switching
- **Proper Contrast**: Optimized colors for accessibility in both themes

## 📊 Stock Data

The dashboard uses the Finnhub Stock API with intelligent fallback:

- **Real API Integration**: Connects to Finnhub for live data
- **Mock Data Fallback**: Provides realistic sample data when API is unavailable
- **Error Handling**: Graceful error handling with user-friendly messages
- **Multiple Endpoints**: Stock search, quotes, historical data, and company profiles

## 🚀 Performance Optimizations

- **Vite Build Tool**: Fast development and optimized production builds
- **Code Splitting**: Automatic code splitting for optimal loading
- **Lazy Loading**: Components loaded on demand
- **Debounced Search**: Search requests debounced to reduce API calls
- **Memoized Components**: React optimization techniques

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Responsive

The dashboard is fully responsive with:

- **Mobile-first Design**: Optimized for mobile devices
- **Touch-friendly Interface**: Large touch targets
- **Responsive Charts**: Charts adapt to screen size
- **Collapsible Sections**: Optimized layout for small screens

## 🔧 Customization

### Adding New Stock Symbols

Edit `src/utils/api/stock-api.js` to modify the mock data or API endpoints.

### Styling Customization

The app uses Tailwind CSS. Customize colors and styles in:
- `src/App.css` - Global styles and CSS variables
- Component files - Individual component styling

### Adding New Features

1. Create new components in `src/components/`
2. Add context providers in `src/contexts/` if needed
3. Update the main `Dashboard.jsx` to include new features

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty


<div align="center">
<p>Made with ❤️ by <strong>SUMIT PAL</strong></p>

🌟 Let's Connect

I'm passionate about collaborating on innovative projects and sharing knowledge about *coding, design, robotics, and AI*. Let's build something amazing together!  

[![Instagram](https://img.icons8.com/fluency/48/instagram-new.png)](https://www.instagram.com/sumittech_360)  [![YouTube](https://img.icons8.com/fluency/48/youtube-play.png)](https://youtube.com/channel/UCiPxbNaC7dloVut6Jc5xHIQ)  [![GitHub](https://img.icons8.com/fluency/48/github.png)](https://github.com/InnovativeSumit)  [![LinkedIn](https://img.icons8.com/fluency/48/linkedin.png)](https://www.linkedin.com/in/sumit-pal-40511a339) 

⭐ Star this repo on GitHub — it helps!

<p>For questions or support, please open an issue on the repository.</p>
</div>


