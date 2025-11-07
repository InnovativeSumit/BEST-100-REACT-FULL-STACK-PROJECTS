# Professional Word Counter

A modern, feature-rich word counter application built with React and Vite. This application provides comprehensive text analysis with real-time statistics and a professional, responsive design.

## Features

### Core Statistics
- **Word Count**: Real-time word counting with smart filtering
- **Character Count**: Both with and without spaces
- **Paragraph Count**: Automatic paragraph detection
- **Sentence Count**: Smart sentence boundary detection
- **Line Count**: Total number of lines

### Advanced Analysis
- **Reading Time**: Estimated reading time (200 words/minute)
- **Speaking Time**: Estimated speaking time (150 words/minute)
- **Average Words per Sentence**: Writing complexity analysis
- **Most Frequent Words**: Top 5 most used words (excluding short words)

### User Experience
- **Real-time Updates**: All statistics update as you type
- **Copy to Clipboard**: One-click text copying
- **Download as File**: Save your text as a .txt file
- **Clear Text**: Quick text clearing functionality
- **Responsive Design**: Works perfectly on desktop and mobile
- **Dark Mode Support**: Automatic dark/light theme detection
- **Smooth Animations**: Professional hover effects and transitions

## Technology Stack

- **React 19**: Latest React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Lucide Icons**: Beautiful, consistent icons
- **TypeScript**: Type-safe development (JSX)

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or pnpm package manager

### Installation

1. **Clone or extract the project**
   ```bash
   cd word-counter-pro
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
   Navigate to `http://localhost:5173/` to see the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
word-counter-pro/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/          # Static assets
│   ├── components/
│   │   └── ui/          # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── App.css          # Main styles
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── components.json      # shadcn/ui configuration
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── pnpm-lock.yaml       # Lock file
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## Features in Detail

### Text Analysis Engine
The application uses sophisticated algorithms to analyze text:
- Smart word boundary detection
- Paragraph separation by double line breaks
- Sentence detection using multiple punctuation marks
- Frequency analysis with word filtering

### Performance Optimizations
- React.useMemo for expensive calculations
- Debounced updates for smooth typing experience
- Efficient re-rendering with proper dependency arrays
- Optimized component structure

### Accessibility
- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Touch-friendly interface
- Cross-platform compatibility

## Customization

### Styling
The application uses Tailwind CSS with custom CSS variables for theming. You can customize:
- Color schemes in `src/App.css`
- Component styles in `src/App.jsx`
- Animation timings and effects

### Features
To add new statistics or modify existing ones:
1. Update the `stats` calculation in `src/App.jsx`
2. Add new UI components for display
3. Update the responsive grid layout as needed

## Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

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
1. Check the existing documentation
2. Review the code comments
3. Test in different browsers
4. Check console for error messages

---

**Professional Word Counter** - Real-time text analysis and statistics

