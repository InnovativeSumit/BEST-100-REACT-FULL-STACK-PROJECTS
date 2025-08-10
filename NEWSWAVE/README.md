# NewsWave - Personalized News Reader

A sleek React+Vite application powered by NewsAPI that provides a personalized news reading experience with modern features.

## Features

- 🌊 **Personalized News Feed** - Fetch news by category (tech, sports, business, etc.) or country
- 🌙 **Dark Mode Support** - Toggle between light and dark themes
- 🔖 **Bookmark Articles** - Save articles to localStorage for later reading
- 🔍 **Smart Search** - Debounced search to optimize API calls
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI** - Built with TailwindCSS and shadcn/ui components

## Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Lucide React** - Modern icon library
- **NewsAPI** - Real-time news data
- **next-themes** - Theme management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NewsWave
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create a `.env` file in the root directory and add your NewsAPI key:
```env
VITE_NEWS_API_KEY=your_newsapi_key_here
```

**Note:** The provided API key (53a0210bce144adb8004080cfbedaedd) is included for demo purposes. For production use, get your own free API key from [NewsAPI](https://newsapi.org/).

4. Start the development server:
```bash
npm run dev
# or
pnpm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
pnpm run build
```

## API Usage

This app uses the NewsAPI free tier which provides:
- 100 requests per day
- Access to top headlines and everything endpoints
- Real-time news from 80+ sources

The app implements debounced search (500ms delay) to optimize API usage and prevent excessive requests.

## Project Structure

```
NewsWave/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── ArticleCard.jsx  # Individual article display
│   │   ├── CategoryFilter.jsx # Category and country filters
│   │   ├── Header.jsx       # App header with navigation
│   │   └── SearchBar.jsx    # Search input with debouncing
│   ├── hooks/
│   │   ├── useDebounce.js   # Debounce hook for search
│   │   └── useLocalStorage.js # localStorage management
│   ├── lib/
│   │   └── newsApi.js       # NewsAPI service
│   ├── App.jsx              # Main application component
│   ├── App.css              # Global styles
│   └── main.jsx             # Application entry point
├── .env                     # Environment variables
├── package.json
└── README.md
```

## Features in Detail

### Search Functionality
- Real-time search with 500ms debouncing
- Searches across article titles, descriptions, and content
- Clear search functionality

### Category Filtering
- Filter by news categories: General, Business, Entertainment, Health, Science, Sports, Technology
- Filter by country: US, Japan, UK, Canada, Australia, Germany, France, India
- Visual indicators for active filters

### Bookmarking
- Save articles to localStorage
- Persistent across browser sessions
- Bookmark counter in header
- Dedicated bookmarks view

### Dark Mode
- System preference detection
- Manual toggle
- Persistent theme selection
- Smooth transitions

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- The `.env` file is already included in `.gitignore`
- For production deployment, use environment variables provided by your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


<div align="center">
<p>Made with ❤️ by <strong>SUMIT PAL</strong></p>

🌟 Let's Connect

I'm passionate about collaborating on innovative projects and sharing knowledge about *coding, design, robotics, and AI*. Let's build something amazing together!  

[![Instagram](https://img.icons8.com/fluency/48/instagram-new.png)](https://www.instagram.com/sumittech_360)  [![YouTube](https://img.icons8.com/fluency/48/youtube-play.png)](https://youtube.com/channel/UCiPxbNaC7dloVut6Jc5xHIQ)  [![GitHub](https://img.icons8.com/fluency/48/github.png)](https://github.com/InnovativeSumit)  [![LinkedIn](https://img.icons8.com/fluency/48/linkedin.png)](https://www.linkedin.com/in/sumit-pal-40511a339) 

⭐ Star this repo on GitHub — it helps!

<p>For questions or support, please open an issue on the repository.</p>
</div>


