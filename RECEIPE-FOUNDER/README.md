# 🍽️ Recipe Finder App

A modern, responsive Recipe Finder App built with React + Vite, powered by the Spoonacular API. This application allows users to search recipes by ingredients, filter by dietary needs, save favorites, and follow step-by-step cooking guides with built-in timers.

## 🚀 Features

### 🔍 Search Recipes by Ingredients
- Input multiple ingredients and get instant recipe suggestions
- Smart ingredient management with add/remove functionality
- Real-time search results with recipe images and details

### 🌱 Filter by Dietary Restrictions
- Support for common dietary preferences:
  - Vegetarian
  - Vegan
  - Gluten-free
  - Ketogenic
  - Paleo
- Easy-to-use dropdown filter selection

### ❤️ Save Favorite Recipes
- One-click favorite functionality with heart icons
- Persistent storage using localStorage
- Dedicated favorites page with saved recipe management
- Visual favorite count indicator in navigation

### 🧑‍🍳 Step-by-Step Cooking Guide
- Detailed cooking instructions broken down by steps
- Built-in timer functionality with multiple timer options
- Progress tracking through cooking steps
- Ingredient and equipment lists for each step
- Smart time extraction from instruction text

### 📱 Responsive Design
- Mobile-first responsive design
- Touch-friendly interface
- Optimized for desktop, tablet, and mobile devices
- Modern UI with smooth animations and transitions

## 🛠️ Tech Stack

- **React 19** - Modern React with functional components and hooks
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **Spoonacular API** - Recipe data and nutrition information

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Quick Start

1. **Extract the project files**
   ```bash
   unzip recipe-finder-app.zip
   cd recipe-finder-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm run build
# or
npm run build
```

The built files will be in the `dist/` directory.

## 🔑 API Configuration

The app uses the Spoonacular API with the following configuration:

- **API Key**: `8484619605c642908170e6fe17acefd2`
- **Base URL**: `https://api.spoonacular.com/recipes`

The API key is currently hardcoded in `src/lib/api.js`. For production use, consider:
- Moving the API key to environment variables
- Implementing proper API key management
- Adding rate limiting and error handling

## 📁 Project Structure

```
recipe-finder-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── SearchPage.jsx   # Main search interface
│   │   ├── FavoritesPage.jsx # Favorites management
│   │   ├── RecipeDetail.jsx # Recipe details view
│   │   └── CookingGuide.jsx # Step-by-step cooking
│   ├── lib/
│   │   ├── api.js          # Spoonacular API integration
│   │   └── utils.js        # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── assets/             # Static assets
│   ├── App.jsx             # Main application component
│   ├── App.css             # Global styles and animations
│   ├── main.jsx            # Application entry point
│   └── index.css           # Base styles
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Key Components

### SearchPage
- Ingredient input and management
- Dietary filter selection
- Recipe search and results display
- Random recipe suggestions

### RecipeDetail
- Comprehensive recipe information
- Ingredient lists with images
- Nutrition information
- Cooking instructions

### CookingGuide
- Step-by-step cooking instructions
- Built-in timer functionality
- Progress tracking
- Equipment and ingredient lists per step

### FavoritesPage
- Saved recipe management
- Quick access to favorite recipes
- Remove from favorites functionality

## 🎨 Styling & Design

The app features a modern, clean design with:

- **Color Scheme**: Light/dark mode support with CSS custom properties
- **Typography**: Clean, readable fonts with proper hierarchy
- **Animations**: Smooth transitions and hover effects
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Custom Components**: Styled with Tailwind CSS and shadcn/ui

### Custom Animations
- Recipe card hover effects
- Loading states with shimmer effects
- Smooth page transitions
- Interactive button states

## 🔧 Development

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

### Code Style
- ESLint configuration for code quality
- Consistent component structure
- Modern React patterns (hooks, functional components)
- Clean, readable code with proper commenting

## 🌟 Features in Detail

### Search Functionality
- **Ingredient-based search**: Add multiple ingredients and find recipes
- **Smart filtering**: Dietary restrictions and preferences
- **Real-time results**: Instant search with loading states
- **Missing ingredients**: Shows what ingredients you're missing

### Timer System
- **Multiple timers**: Set custom timers or use suggested times
- **Smart time detection**: Automatically extracts cooking times from instructions
- **Visual feedback**: Clear timer display with play/pause controls
- **Notifications**: Browser notifications when timers complete

### Favorites Management
- **Persistent storage**: Favorites saved to localStorage
- **Visual indicators**: Heart icons show favorite status
- **Quick access**: Dedicated favorites page
- **Easy management**: Add/remove with single click

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Touch-friendly**: Large touch targets and gestures
- **Adaptive layout**: Grid adjusts to screen size
- **Performance**: Optimized images and lazy loading

## 🚀 Deployment

The app can be deployed to various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository
2. Vercel will automatically detect Vite configuration
3. Deploy with zero configuration

### Netlify
1. Build the project: `pnpm run build`
2. Upload the `dist/` folder to Netlify
3. Configure redirects for SPA routing

### Other Platforms
The app is a standard Vite React application and can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


- **Spoonacular API** for providing comprehensive recipe data
- **shadcn/ui** for beautiful, accessible UI components
- **Lucide** for the icon library
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

For questions or issues:
1. Check the documentation above
2. Review the code comments
3. Test the API endpoints
4. Verify your setup matches the requirements

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

