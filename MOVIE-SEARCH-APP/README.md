# FilmFlix - Professional Movie Search Application

A modern, fully functional movie search application built with React and Vite, featuring a professional UI/UX design with dark mode toggle functionality. This application provides users with an intuitive interface to search and discover movies using the OMDB API.

## 🎬 Features

### Core Functionality
- **Real-time Movie Search**: Search through thousands of movies using the OMDB API
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode Toggle**: Seamless theme switching with smooth transitions
- **Professional UI/UX**: Modern design with hover effects and animations
- **Error Handling**: Comprehensive error handling for API failures and network issues
- **Loading States**: Visual feedback during search operations

### Technical Features
- **React 18**: Built with the latest React features and hooks
- **Vite**: Lightning-fast development server and build tool
- **CSS Variables**: Dynamic theming system for easy customization
- **Responsive Grid**: CSS Grid layout for optimal movie card display
- **Modern JavaScript**: ES6+ features and async/await patterns
- **Environment Variables**: Secure API key management

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or extract the project**:
   ```bash
   # If you have the zip file, extract it
   unzip movie-search-app.zip
   cd movie-search-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173/` to view the application

### Build for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🎯 Usage

### Basic Search
1. Open the application in your browser
2. Type a movie name in the search bar
3. Press Enter or click the search icon
4. Browse through the search results

### Theme Toggle
- Click the theme toggle button (☀️/🌙) in the top-right corner to switch between dark and light modes
- Your theme preference is automatically applied when you visit the page

### Movie Information
Each movie card displays:
- Movie poster image
- Movie title
- Release year
- Content type (Movie, Series, etc.)

## 🏗️ Project Structure

```
movie-search-app/
├── public/
│   ├── favicon.webp          # Application favicon
│   └── index.html           # HTML template
├── src/
│   ├── components/
│   │   └── MovieCard.jsx    # Movie card component
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   ├── main.jsx             # Application entry point
│   └── search.svg           # Search icon
├── .env                     # Environment variables
├── package.json             # Project dependencies
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🎨 Design System

### Color Palette

#### Dark Mode
- **Background**: `#0f0f0f` - Deep black for main background
- **Surface**: `#1a1a1a` - Dark gray for cards and components
- **Text Primary**: `#ffffff` - Pure white for main text
- **Text Secondary**: `#b3b3b3` - Light gray for secondary text
- **Accent**: `#ff6b35` - Orange accent for interactive elements
- **Border**: `#333333` - Dark gray for borders

#### Light Mode
- **Background**: `#ffffff` - Pure white for main background
- **Surface**: `#f8f9fa` - Light gray for cards and components
- **Text Primary**: `#212529` - Dark gray for main text
- **Text Secondary**: `#6c757d` - Medium gray for secondary text
- **Accent**: `#007bff` - Blue accent for interactive elements
- **Border**: `#dee2e6` - Light gray for borders

### Typography
- **Primary Font**: Roboto Slab (serif) - Used for headings and movie titles
- **Secondary Font**: Raleway (sans-serif) - Used for body text and UI elements

### Responsive Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 767px and below

## 🔧 Technical Implementation

### State Management
The application uses React's built-in state management with hooks:
- `useState` for component state
- `useEffect` for side effects and lifecycle management

### API Integration
- **OMDB API**: Used for fetching movie data
- **Error Handling**: Comprehensive error handling for API failures
- **Loading States**: Visual feedback during API calls

### Performance Optimizations
- **Lazy Loading**: Images are loaded on demand
- **Debounced Search**: Prevents excessive API calls
- **Optimized Re-renders**: Efficient state updates to minimize re-renders

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast**: Sufficient color contrast ratios in both themes
- **Focus Management**: Clear focus indicators for all interactive elements

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Mobile Phones**: 320px - 767px
- **Tablets**: 768px - 1023px
- **Desktop**: 1024px and above

### Mobile Features
- Touch-friendly interface
- Optimized grid layout for smaller screens
- Responsive typography scaling
- Mobile-optimized search interface

## 🔐 Environment Variables

The application uses environment variables for configuration:

```env
VITE_API_URL=https://www.omdbapi.com?apikey=YOUR_API_KEY
```

**Note**: The API key included is for demonstration purposes. For production use, obtain your own API key from [OMDB API](http://www.omdbapi.com/apikey.aspx).

## 🚀 Deployment

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Netlify Deployment
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the contents of the `dist` folder to your web server

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (if configured)

### Development Guidelines
- Follow React best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Write descriptive commit messages
- Test thoroughly before committing

## 🐛 Troubleshooting

### Common Issues

#### API Key Issues
- **Problem**: Movies not loading
- **Solution**: Check that the API key in `.env` is valid

#### Development Server Issues
- **Problem**: Server won't start
- **Solution**: Ensure Node.js version 16+ is installed

#### Build Issues
- **Problem**: Build fails
- **Solution**: Clear node_modules and reinstall dependencies

### Getting Help
If you encounter issues:
1. Check the browser console for error messages
2. Verify your Node.js version
3. Ensure all dependencies are installed
4. Check that the API key is properly configured

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the documentation

## 🎉 Acknowledgments

- **OMDB API** for providing movie data
- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Google Fonts** for the typography

---

**Built with ❤️ using React + Vite**

*Last updated: August 2025*
