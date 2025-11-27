# RGB Color Challenge Game

A professional, interactive web application that tests your color perception skills by challenging you to match RGB color values with their visual representations. Built with React, Vite, and Tailwind CSS for a modern, responsive user experience.

![RGB Color Challenge Game](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🎯 Overview

The RGB Color Challenge Game is an educational and entertaining web application designed to improve your understanding of RGB color values and enhance your color perception abilities. The game presents players with RGB numerical values and challenges them to identify the corresponding color from a selection of visually similar options.

### Key Features

- **🎨 Professional UI/UX Design**: Modern, clean interface with smooth animations and transitions
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **🎚️ Multiple Difficulty Levels**: Easy, Medium, and Hard modes with varying color similarity
- **📊 Real-time Statistics**: Track your score, attempts, and accuracy percentage
- **🎯 Interactive Gameplay**: Hover effects, visual feedback, and engaging animations
- **♿ Accessibility Focused**: Keyboard navigation support and screen reader friendly
- **🚀 Performance Optimized**: Built with Vite for fast development and production builds

## 🚀 Quick Start

### Prerequisites

Before running this project, ensure you have the following installed on your system:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone or extract the project**:
   ```bash
   # If you have the ZIP file, extract it to your desired location
   # Or clone from repository if available
   cd RGB-COLOR-GUISSER
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
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Alternative Package Managers

If you prefer using other package managers:

```bash
# Using Yarn
yarn install
yarn dev

# Using pnpm
pnpm install
pnpm dev
```

## 🎮 How to Play

### Game Mechanics

1. **View the RGB Values**: The game displays RGB color values in the format `rgb(r, g, b)` where each value ranges from 0 to 255
2. **Select Difficulty**: Choose from three difficulty levels:
   - **Easy**: Colors have significant differences (variance: ±100)
   - **Medium**: Moderate color differences (variance: ±50)
   - **Hard**: Very similar colors (variance: ±25)
3. **Make Your Choice**: Click on the color square that you believe matches the displayed RGB values
4. **Get Feedback**: Receive immediate visual and textual feedback on your selection
5. **Track Progress**: Monitor your score, total attempts, and accuracy percentage

### Scoring System

- **Correct Answer**: +1 point, automatic progression to next challenge
- **Incorrect Answer**: No points deducted, opportunity to try again
- **Accuracy**: Calculated as (Correct Answers / Total Attempts) × 100%

### Tips for Success

- **Understand RGB Values**: 
  - Red component (0-255): Higher values = more red
  - Green component (0-255): Higher values = more green  
  - Blue component (0-255): Higher values = more blue
- **Color Mixing**: Remember that RGB is additive color mixing
- **Practice**: Start with Easy mode and gradually increase difficulty
- **Pattern Recognition**: Look for dominant color components in the RGB values

## 🛠️ Development

### Project Structure

```
RGB-COLOR-GUISSER/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── ColorGuesser.jsx    # Main game component
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx                 # Root application component
│   ├── App.css                 # Application-specific styles
│   ├── index.css               # Global styles and Tailwind imports
│   └── main.jsx                # Application entry point
├── index.html                  # HTML template
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # Project documentation
```

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code with ESLint
npm run lint
```

### Technology Stack

#### Core Technologies
- **React 18.2.0**: Modern React with hooks and functional components
- **Vite 4.4.5**: Next-generation frontend tooling for fast development
- **JavaScript (ES6+)**: Modern JavaScript features and syntax

#### Styling & UI
- **Tailwind CSS 3.3.0**: Utility-first CSS framework for rapid UI development
- **PostCSS**: CSS post-processor for enhanced styling capabilities
- **Google Fonts (Inter)**: Professional typography with web font optimization

#### Development Tools
- **ESLint**: Code linting and quality assurance
- **Autoprefixer**: Automatic CSS vendor prefixing
- **Hot Module Replacement (HMR)**: Instant updates during development

### Component Architecture

#### ColorGuesser Component

The main game component (`src/components/ColorGuesser.jsx`) implements:

**State Management**:
- `targetColor`: Current RGB color to match
- `options`: Array of color choices (including correct answer)
- `score`: Player's current score
- `attempts`: Total number of attempts
- `difficulty`: Current difficulty level
- `gameState`: Current game state (playing, correct, incorrect)

**Key Functions**:
- `generateRandomColor()`: Creates random RGB color objects
- `generateSimilarColor()`: Creates colors similar to target based on difficulty
- `resetGame()`: Initializes new game round
- `handleGuess()`: Processes player's color selection

**Responsive Design Features**:
- CSS Grid layout that adapts to screen size
- Mobile-first approach with progressive enhancement
- Touch-friendly button sizes and spacing
- Flexible typography scaling

## 🎨 Design System

### Color Palette

The application uses a carefully crafted color palette that ensures accessibility and visual appeal:

```css
/* Primary Colors */
Blue: #3B82F6 (Primary actions, links)
Purple: #8B5CF6 (Accents, gradients)
Green: #10B981 (Success states)
Red: #EF4444 (Error states, hard difficulty)
Yellow: #F59E0B (Warning states, medium difficulty)

/* Neutral Colors */
Gray-50: #F9FAFB (Light backgrounds)
Gray-100: #F3F4F6 (Card backgrounds)
Gray-600: #4B5563 (Secondary text)
Gray-900: #111827 (Primary text)
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900
- **Responsive Scaling**: Fluid typography that scales with viewport size
- **Accessibility**: High contrast ratios and readable font sizes

### Animations & Interactions

- **Hover Effects**: Subtle scale transforms and color transitions
- **Click Feedback**: Active states with scale-down effects
- **Success Animations**: Pulse effects for correct answers
- **Smooth Transitions**: 200ms cubic-bezier easing for all interactions

## 📱 Responsive Design

### Breakpoints

The application is designed with a mobile-first approach using Tailwind CSS breakpoints:

```css
/* Mobile First (default) */
Base: 0px - 639px

/* Small devices (sm) */
640px and up: Tablets in portrait mode

/* Medium devices (md) */
768px and up: Tablets in landscape mode

/* Large devices (lg) */
1024px and up: Desktop computers

/* Extra large devices (xl) */
1280px and up: Large desktop screens
```

### Responsive Features

- **Flexible Grid Layout**: Color options adapt from single column on mobile to three columns on desktop
- **Scalable Typography**: Font sizes adjust appropriately for different screen sizes
- **Touch-Friendly Interface**: Button sizes optimized for touch interaction on mobile devices
- **Adaptive Spacing**: Margins and padding scale with screen size
- **Optimized Images**: SVG icons and graphics that scale without quality loss

## ♿ Accessibility

### WCAG 2.1 Compliance

The application follows Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards:

#### Keyboard Navigation
- **Tab Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Clear visual focus indicators for keyboard users
- **Logical Tab Order**: Intuitive navigation flow through the interface

#### Screen Reader Support
- **Semantic HTML**: Proper use of HTML5 semantic elements
- **ARIA Labels**: Descriptive labels for complex interactions
- **Alt Text**: Meaningful alternative text for visual elements

#### Visual Accessibility
- **Color Contrast**: Minimum 4.5:1 contrast ratio for normal text
- **Color Independence**: Information not conveyed by color alone
- **Scalable Text**: Text remains readable when zoomed to 200%

#### Motor Accessibility
- **Large Click Targets**: Minimum 44px touch targets for mobile
- **Hover Tolerance**: Generous hover areas for precise interaction
- **No Time Limits**: Game can be played at user's own pace

## 🔧 Configuration

### Tailwind CSS Configuration

The `tailwind.config.js` file includes custom configurations:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'bounce-custom': 'bounce 1s ease-in-out',
      }
    },
  },
  plugins: [],
}
```

### Vite Configuration

The `vite.config.js` includes optimizations for development and production:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

## 🚀 Deployment

### Production Build

To create a production-ready build:

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

### Deployment Options

#### Static Hosting Services
- **Vercel**: `npm i -g vercel && vercel`
- **Netlify**: Drag and drop the `dist` folder to Netlify
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Firebase Hosting**: `firebase deploy`

#### Traditional Web Servers
- **Apache**: Copy `dist` contents to web root
- **Nginx**: Configure static file serving
- **IIS**: Deploy as static website

### Environment Variables

For production deployment, you may want to configure:

```bash
# .env.production
VITE_APP_TITLE="RGB Color Challenge"
VITE_APP_VERSION="1.0.0"
```

## 🧪 Testing

### Manual Testing Checklist

#### Functionality Testing
- [ ] Game loads without errors
- [ ] RGB values display correctly
- [ ] Color options generate properly
- [ ] Correct answer detection works
- [ ] Score tracking functions
- [ ] Difficulty levels affect color similarity
- [ ] Reset functionality works

#### Responsive Testing
- [ ] Mobile devices (320px - 768px)
- [ ] Tablets (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Landscape and portrait orientations

#### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Accessibility Testing
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast validation
- [ ] Focus indicators visible

### Performance Testing

Use browser developer tools to verify:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contributing

### Development Workflow

1. **Fork the repository** (if applicable)
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Test thoroughly** across different devices and browsers
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with detailed description

### Coding Standards

#### JavaScript/React
- Use functional components with hooks
- Follow ESLint configuration
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent indentation (2 spaces)

#### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing scale
- Use semantic color names
- Optimize for performance

#### Git Commit Messages
```
feat: add new difficulty level
fix: resolve color generation bug
docs: update README installation steps
style: improve button hover effects
refactor: optimize color similarity algorithm
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 RGB Color Challenge Game

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- **React Team**: For the excellent React framework
- **Vite Team**: For the blazing fast build tool
- **Tailwind CSS**: For the utility-first CSS framework
- **Google Fonts**: For the beautiful Inter font family
- **Open Source Community**: For inspiration and best practices

## 📞 Support

If you encounter any issues or have questions:

1. **Check the FAQ** section below
2. **Review the troubleshooting** guide
3. **Search existing issues** (if repository available)
4. **Create a new issue** with detailed information

### FAQ

**Q: The game doesn't load properly**
A: Ensure you have Node.js 16+ installed and run `npm install` before `npm run dev`

**Q: Colors look different on my monitor**
A: Color perception can vary between displays. The game uses standard RGB values that should be consistent across properly calibrated monitors.

**Q: Can I add more difficulty levels?**
A: Yes! Modify the `difficulty` state and `generateSimilarColor` function in `ColorGuesser.jsx`

**Q: How do I deploy this to my own domain?**
A: Run `npm run build` and upload the `dist` folder contents to your web server

### Troubleshooting

#### Common Issues

**Issue**: `npm run dev` fails with dependency errors
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install`

**Issue**: Styles not loading correctly
**Solution**: Ensure Tailwind CSS is properly configured and PostCSS is processing the styles

**Issue**: Game performance is slow
**Solution**: Check browser developer tools for console errors and ensure hardware acceleration is enabled

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

*Last updated: December 2024*
