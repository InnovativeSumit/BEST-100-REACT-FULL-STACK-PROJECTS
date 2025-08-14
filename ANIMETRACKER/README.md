# AniTrack – AI-Powered Anime Discovery Dashboard

Discover your next favorite anime with AniTrack, a sleek React app powered by the Jikan (MyAnimeList) API. No API key required! Seamlessly browse trending, top-rated, and seasonal anime with intuitive filtering by genre, status, or popularity.

![AniTrack Screenshot](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=AniTrack+Dashboard)

## ✨ Key Features

🔹 **Smart Browsing**: Explore Trending, Top-Rated, and Seasonal anime with real-time updates  
🔹 **AI-Curated Filters**: Refine searches by genre (Shonen, Isekai, Slice-of-Life), status (Airing/Upcoming), or user ratings  
🔹 **Personal Library**: Save favorites to localStorage for offline access—never lose your watchlist!  
🔹 **Responsive UI**: Clean, mobile-friendly design with dark/light modes for binge-watching comfort  
🔹 **Detailed Information**: View comprehensive anime details including synopsis, studios, genres, and ratings  
🔹 **Advanced Search**: Powerful search functionality with filtering and sorting options  

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **API**: Jikan (MyAnimeList) API v4
- **Storage**: localStorage for favorites and preferences
- **Animations**: Custom CSS animations and transitions

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Quick Start

1. **Extract the project files**
   ```bash
   unzip AniTrack.zip
   cd AniTrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
pnpm run build
```

The built files will be in the `dist/` directory.

## 🎯 Usage Guide

### Navigation
- **Trending**: Current season's popular anime
- **Top Rated**: Highest-rated anime of all time
- **Seasonal**: Anime from the current season
- **Favorites**: Your personal collection

### Search & Filtering
1. Use the search bar to find specific anime
2. Apply filters using the sidebar:
   - **Sort**: By score, popularity, rank, title, etc.
   - **Status**: Currently airing, finished, upcoming
   - **Rating**: Age ratings (G, PG, PG-13, R, etc.)
   - **Genres**: Action, Adventure, Comedy, Drama, and more

### Managing Favorites
- Click the heart icon on any anime card to add/remove favorites
- Access your favorites from the navigation menu
- Favorites are saved locally and persist between sessions

### Dark/Light Mode
- Toggle between themes using the moon/sun icon in the header
- Theme preference is automatically saved

## 📱 Mobile Support

AniTrack is fully responsive and optimized for:
- **Desktop**: Full sidebar with filters
- **Tablet**: Collapsible filter panel
- **Mobile**: Bottom navigation and overlay filters

## 🔧 Project Structure

```
AniTrack/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Header.jsx     # Navigation header
│   │   ├── AnimeCard.jsx  # Anime display card
│   │   ├── AnimeGrid.jsx  # Grid layout
│   │   ├── AnimeDetail.jsx # Detail modal
│   │   └── FilterPanel.jsx # Filtering sidebar
│   ├── lib/               # Utilities and services
│   │   ├── api.js         # Jikan API integration
│   │   └── storage.js     # localStorage utilities
│   ├── App.jsx            # Main application
│   ├── App.css            # Global styles
│   └── main.jsx           # Entry point
├── package.json           # Dependencies
└── README.md             # This file
```

## 🌟 Features in Detail

### API Integration
- **Rate Limited**: Respects Jikan API rate limits (1 request/second)
- **Error Handling**: Graceful fallbacks for API failures
- **Data Formatting**: Consistent data structure across components

### State Management
- **React Hooks**: useState and useEffect for component state
- **localStorage**: Persistent storage for favorites and preferences
- **Real-time Updates**: Immediate UI updates for user actions

### Performance Optimizations
- **Image Lazy Loading**: Smooth loading with shimmer effects
- **Pagination**: Efficient data loading with page navigation
- **Responsive Images**: Optimized for different screen sizes

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Semantic HTML and ARIA labels
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

No environment variables required! The app uses the public Jikan API.

## 🐛 Troubleshooting

### Common Issues

1. **API Rate Limiting**
   - The app automatically handles rate limiting
   - If you see errors, wait a moment and try again

2. **Images Not Loading**
   - Some anime may not have images available
   - The app shows a placeholder in these cases

3. **Favorites Not Saving**
   - Ensure localStorage is enabled in your browser
   - Check browser privacy settings

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🗺️ Roadmap

### Phase 1: Core Features ✅
- [x] Basic browsing and search
- [x] Favorites management
- [x] Responsive design
- [x] Dark/light mode

### Phase 2: Enhanced Features 🔜
- [ ] AI-powered recommendations based on viewing history
- [ ] User reviews and ratings
- [ ] Trailer previews
- [ ] Advanced filtering options

### Phase 3: Social Features 🔮
- [ ] User profiles and sharing
- [ ] Community reviews
- [ ] Watchlist sharing
- [ ] Social recommendations


## 🙏 Acknowledgments

- **Jikan API**: For providing free access to MyAnimeList data
- **MyAnimeList**: For the comprehensive anime database
- **shadcn/ui**: For the beautiful UI components
- **Tailwind CSS**: For the utility-first CSS framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the project documentation
3. Create an issue in the project repository

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





