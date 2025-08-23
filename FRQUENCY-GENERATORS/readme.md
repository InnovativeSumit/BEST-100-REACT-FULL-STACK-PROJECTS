# Frequency Generator

A modern, interactive web application built with React that generates pure sine wave tones at customizable frequencies. This project demonstrates the power of the Web Audio API combined with a sleek, responsive user interface designed with Tailwind CSS.

![Frequency Generator Screenshot](./docs/screenshot.png)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Development](#development)
- [Deployment](#deployment)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

The Frequency Generator is a sophisticated audio synthesis tool that leverages modern web technologies to create precise sine wave tones across the entire audible frequency spectrum (20 Hz to 20,000 Hz). Built as a single-page application using React and Vite, this project serves as both a practical audio tool and an educational demonstration of Web Audio API capabilities.

The application features an intuitive slider interface that allows users to select any frequency within the audible range, with real-time frequency display and immediate audio feedback. The clean, modern design ensures accessibility across desktop and mobile devices, making it suitable for musicians, audio engineers, educators, and anyone interested in sound synthesis.

## Features

### Core Functionality
- **Real-time Frequency Generation**: Generate pure sine wave tones from 20 Hz to 20,000 Hz
- **Interactive Slider Control**: Smooth, responsive frequency selection with real-time updates
- **Instant Audio Feedback**: Immediate tone generation and modification without latency
- **Start/Stop Controls**: Simple play and pause functionality for audio output

### User Experience
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern UI**: Clean, professional interface built with Tailwind CSS
- **Visual Feedback**: Real-time frequency display with clear typography
- **Gradient Background**: Attractive blue-to-purple gradient for visual appeal

### Technical Features
- **Web Audio API Integration**: Native browser audio synthesis without external dependencies
- **React Hooks**: Modern React patterns with useState and useEffect
- **Memory Management**: Proper cleanup of audio contexts to prevent memory leaks
- **Cross-browser Compatibility**: Support for both AudioContext and webkitAudioContext

## Technology Stack

### Frontend Framework
- **React 18.3.1**: Modern JavaScript library for building user interfaces
- **React DOM 18.3.1**: React package for working with the DOM

### Build Tools
- **Vite 5.4.9**: Next-generation frontend tooling for fast development and building
- **@vitejs/plugin-react 4.3.3**: Official Vite plugin for React support

### Styling
- **Tailwind CSS 3.4.14**: Utility-first CSS framework for rapid UI development
- **PostCSS 8.4.47**: Tool for transforming CSS with JavaScript
- **Autoprefixer 10.4.20**: PostCSS plugin to parse CSS and add vendor prefixes

### Development Tools
- **ESLint 9.13.0**: Static code analysis tool for identifying problematic patterns
- **ESLint React Plugins**: Specialized linting rules for React development
- **TypeScript Types**: Type definitions for React and React DOM

### Audio Technology
- **Web Audio API**: Native browser API for audio processing and synthesis
- **AudioContext**: Primary interface for audio graph creation and management
- **OscillatorNode**: Web Audio API node for generating periodic waveforms

## Installation

### Prerequisites
Before installing the Frequency Generator, ensure you have the following software installed on your system:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn** (version 1.22 or higher)
- A modern web browser with Web Audio API support

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/frequency-generator.git
   cd frequency-generator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
   Or if you prefer yarn:
   ```bash
   yarn install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Or with yarn:
   ```bash
   yarn dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` in your web browser to access the application.

### Alternative Installation Methods

#### Using pnpm
```bash
pnpm install
pnpm dev
```

#### Using Docker (Optional)
```bash
docker build -t frequency-generator .
docker run -p 5173:5173 frequency-generator
```

## Usage

### Basic Operation

The Frequency Generator provides a straightforward interface for audio synthesis:

1. **Frequency Selection**: Use the horizontal slider to select your desired frequency. The current frequency is displayed in real-time above the slider in Hz (Hertz).

2. **Start Audio**: Click the blue "Start Tone" button to begin generating the selected frequency. The application will create a pure sine wave tone that plays through your device's audio output.

3. **Adjust Frequency**: While the tone is playing, you can move the slider to change the frequency in real-time. The audio will immediately adjust to match your selection.

4. **Stop Audio**: Click the red "Stop Tone" button to cease audio generation and return to silence.

### Frequency Range Guide

The application supports the full range of human hearing:

- **Sub-bass (20-60 Hz)**: Deep, felt frequencies often used in electronic music
- **Bass (60-250 Hz)**: Fundamental frequencies of bass instruments
- **Low Midrange (250-500 Hz)**: Lower vocal ranges and instrument fundamentals
- **Midrange (500-2000 Hz)**: Primary vocal and instrument ranges
- **Upper Midrange (2000-4000 Hz)**: Presence and clarity frequencies
- **Treble (4000-8000 Hz)**: Brightness and detail frequencies
- **High Treble (8000-20000 Hz)**: Air and sparkle frequencies

### Practical Applications

#### For Musicians
- **Tuning Reference**: Generate precise reference tones for instrument tuning
- **Interval Training**: Create specific frequencies to practice interval recognition
- **Composition Aid**: Explore frequency relationships for electronic music production

#### For Audio Engineers
- **System Testing**: Test audio equipment frequency response
- **Room Analysis**: Identify resonant frequencies in acoustic spaces
- **Calibration**: Provide reference tones for audio system calibration

#### For Educators
- **Physics Demonstrations**: Illustrate wave properties and frequency concepts
- **Hearing Tests**: Demonstrate frequency perception and hearing range
- **Audio Technology**: Teach Web Audio API and digital signal processing concepts

### Keyboard Shortcuts

While the application is primarily mouse/touch-driven, the following keyboard interactions are supported:

- **Tab**: Navigate between interactive elements
- **Space**: Activate focused buttons (Start/Stop)
- **Arrow Keys**: Fine-tune slider position when focused
- **Enter**: Activate focused buttons

## Project Structure

The Frequency Generator follows a clean, modular architecture that separates concerns and promotes maintainability:

```
frequency-generator/
├── public/
│   └── vite.svg                 # Vite logo favicon
├── src/
│   ├── assets/
│   │   └── react.svg           # React logo asset
│   ├── components/
│   │   └── FrequencyGenerator.jsx  # Main component
│   ├── App.css                 # Application-specific styles
│   ├── App.jsx                 # Root application component
│   ├── index.css               # Global styles and Tailwind imports
│   └── main.jsx                # Application entry point
├── .gitignore                  # Git ignore patterns
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Dependency lock file
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite build configuration
└── README.md                   # Project documentation
```

### Key Files Explained

#### `/src/main.jsx`
The application entry point that renders the React application into the DOM. This file sets up the React root and imports global styles.

#### `/src/App.jsx`
The root component that provides the application layout and renders the FrequencyGenerator component within a centered, gradient background container.

#### `/src/components/FrequencyGenerator.jsx`
The core component containing all frequency generation logic, including:
- State management for frequency, audio context, and oscillator
- Audio synthesis functions using Web Audio API
- User interface with slider and control buttons
- Cleanup logic to prevent memory leaks

#### `/src/index.css`
Global stylesheet that imports Tailwind CSS utilities and sets the Inter font family for consistent typography across the application.

#### `/tailwind.config.js`
Tailwind CSS configuration that specifies content sources for purging unused styles and defines the build optimization strategy.

#### `/vite.config.js`
Vite build tool configuration that enables React support and defines development server settings.

## API Reference

### FrequencyGenerator Component

The main component exposes the following interface:

#### Props
The FrequencyGenerator component currently accepts no props, making it a self-contained audio synthesis tool.

#### State Variables

```javascript
const [frequency, setFrequency] = useState(440)
```
- **Type**: Number
- **Default**: 440 (A4 musical note)
- **Range**: 20-20000
- **Description**: Current frequency in Hz for tone generation

```javascript
const [audioCtx, setAudioCtx] = useState(null)
```
- **Type**: AudioContext | null
- **Default**: null
- **Description**: Web Audio API context for audio processing

```javascript
const [oscillator, setOscillator] = useState(null)
```
- **Type**: OscillatorNode | null
- **Default**: null
- **Description**: Web Audio API oscillator node for tone generation

#### Methods

##### `startSound()`
Initializes audio context and begins tone generation.

**Behavior**:
- Creates new AudioContext if none exists
- Generates OscillatorNode with sine wave type
- Connects oscillator to audio destination
- Sets frequency to current state value
- Starts oscillator playback

**Browser Compatibility**:
- Uses `AudioContext` for modern browsers
- Falls back to `webkitAudioContext` for Safari

##### `stopSound()`
Terminates audio generation and cleans up resources.

**Behavior**:
- Stops current oscillator if active
- Resets oscillator state to null
- Resets audio context state to null
- Prevents memory leaks through proper cleanup

#### Event Handlers

##### `onChange` (Frequency Slider)
```javascript
onChange={(e) => setFrequency(Number(e.target.value))}
```
Updates frequency state in real-time as user moves slider.

##### `onClick` (Start Button)
```javascript
onClick={startSound}
```
Initiates audio generation with current frequency setting.

##### `onClick` (Stop Button)
```javascript
onClick={stopSound}
```
Terminates audio generation and cleans up resources.

### Web Audio API Integration

The application leverages several Web Audio API interfaces:

#### AudioContext
- **Purpose**: Primary interface for audio processing graph
- **Creation**: `new (window.AudioContext || window.webkitAudioContext)()`
- **Methods Used**: `createOscillator()`, `currentTime`

#### OscillatorNode
- **Purpose**: Generates periodic waveforms
- **Type**: Sine wave (`osc.type = "sine"`)
- **Frequency Control**: `setValueAtTime(frequency, ctx.currentTime)`
- **Connection**: Connected directly to audio destination

#### AudioDestination
- **Purpose**: Final destination for audio processing graph
- **Access**: `ctx.destination`
- **Function**: Routes audio to system audio output

## Development

### Development Environment Setup

To contribute to the Frequency Generator project, follow these steps to set up your development environment:

1. **Fork and Clone**
   ```bash
   git fork https://github.com/yourusername/frequency-generator.git
   git clone https://github.com/yourusername/frequency-generator.git
   cd frequency-generator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

### Available Scripts

The project includes several npm scripts for development and production workflows:

#### `npm run dev`
Starts the Vite development server with hot module replacement (HMR) enabled. The application will be available at `http://localhost:5173` with automatic reloading when files change.

#### `npm run build`
Creates an optimized production build in the `dist/` directory. This command:
- Bundles all JavaScript and CSS files
- Optimizes assets for production
- Generates source maps for debugging
- Purges unused Tailwind CSS classes

#### `npm run preview`
Serves the production build locally for testing before deployment. This allows you to verify the production build works correctly in a local environment.

#### `npm run lint`
Runs ESLint to check code quality and identify potential issues. The linting configuration includes:
- React-specific rules
- React Hooks rules
- Modern JavaScript best practices
- Accessibility guidelines

### Code Style Guidelines

The project follows established React and JavaScript best practices:

#### Component Structure
- Use functional components with hooks
- Implement proper state management with useState
- Handle side effects with useEffect
- Include cleanup functions to prevent memory leaks

#### Naming Conventions
- Use PascalCase for component names
- Use camelCase for variables and functions
- Use descriptive names that indicate purpose
- Prefix boolean variables with "is", "has", or "should"

#### File Organization
- Place components in `/src/components/` directory
- Use `.jsx` extension for React components
- Keep related files grouped together
- Maintain consistent import ordering

### Testing Strategy

While the current project doesn't include automated tests, recommended testing approaches include:

#### Unit Testing
- Test individual component functionality
- Verify state management behavior
- Mock Web Audio API for consistent testing

#### Integration Testing
- Test component interactions
- Verify audio generation workflow
- Test responsive design across devices

#### Browser Testing
- Verify Web Audio API compatibility
- Test across different browsers and versions
- Validate mobile device functionality

### Performance Considerations

The application implements several performance optimizations:

#### Memory Management
- Proper cleanup of audio contexts
- Oscillator node disposal after use
- Event listener cleanup in useEffect

#### Bundle Optimization
- Vite's tree-shaking eliminates unused code
- Tailwind CSS purging removes unused styles
- Modern JavaScript features reduce bundle size

#### Runtime Performance
- Minimal re-renders through efficient state management
- Direct Web Audio API usage avoids library overhead
- Responsive design prevents layout thrashing

## Deployment

### Production Build

To create a production-ready build of the Frequency Generator:

1. **Generate Production Build**
   ```bash
   npm run build
   ```

2. **Verify Build**
   ```bash
   npm run preview
   ```

The production build will be created in the `dist/` directory with optimized assets ready for deployment.

### Deployment Options

#### Static Hosting Services

##### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

##### Vercel
1. Import project from GitHub
2. Vercel automatically detects Vite configuration
3. Deploy with zero configuration required

##### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run build && npm run deploy`

#### Traditional Web Hosting
1. Build the project: `npm run build`
2. Upload contents of `dist/` directory to web server
3. Configure server to serve `index.html` for all routes

### Environment Configuration

For production deployments, consider these configuration options:

#### Base URL Configuration
If deploying to a subdirectory, update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-subdirectory/',
  plugins: [react()],
})
```

#### HTTPS Requirements
The Web Audio API requires HTTPS in production environments. Ensure your hosting provider supports SSL certificates.

#### Content Security Policy
If implementing CSP headers, include:
```
script-src 'self' 'unsafe-inline';
connect-src 'self';
```

## Browser Compatibility

The Frequency Generator is designed to work across modern web browsers with Web Audio API support:

### Supported Browsers

#### Desktop Browsers
- **Chrome**: Version 34+ (Full support)
- **Firefox**: Version 25+ (Full support)
- **Safari**: Version 14.1+ (Full support with webkit prefix)
- **Edge**: Version 79+ (Full support)
- **Opera**: Version 22+ (Full support)

#### Mobile Browsers
- **Chrome Mobile**: Version 34+ (Full support)
- **Safari iOS**: Version 14.5+ (Full support)
- **Firefox Mobile**: Version 25+ (Full support)
- **Samsung Internet**: Version 4.0+ (Full support)

### Feature Detection

The application includes automatic feature detection for Web Audio API:

```javascript
const ctx = new (window.AudioContext || window.webkitAudioContext)();
```

This ensures compatibility with both standard and webkit-prefixed implementations.

### Known Limitations

#### iOS Safari Restrictions
- Requires user interaction before audio context creation
- Audio may not play until user taps the screen
- Background audio may be limited by iOS policies

#### Older Browser Support
- Internet Explorer: Not supported (lacks Web Audio API)
- Chrome < 34: Limited or no Web Audio API support
- Firefox < 25: No Web Audio API support

### Accessibility Features

The application includes several accessibility considerations:

#### Keyboard Navigation
- Tab navigation between interactive elements
- Keyboard activation of buttons
- Slider control via arrow keys

#### Screen Reader Support
- Semantic HTML structure
- Descriptive labels for form controls
- ARIA attributes where appropriate

#### Visual Accessibility
- High contrast color scheme
- Readable font sizes
- Clear visual hierarchy

## Contributing

We welcome contributions to the Frequency Generator project! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### Getting Started

1. **Fork the Repository**
   Click the "Fork" button on the GitHub repository page to create your own copy.

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   Implement your feature or fix following the project's coding standards.

4. **Test Your Changes**
   Ensure your changes work correctly and don't break existing functionality.

5. **Submit a Pull Request**
   Push your changes and create a pull request with a clear description.

### Contribution Guidelines

#### Code Quality
- Follow existing code style and conventions
- Include comments for complex logic
- Ensure code passes ESLint checks
- Test changes across multiple browsers

#### Commit Messages
- Use clear, descriptive commit messages
- Follow conventional commit format when possible
- Reference issue numbers in commits

#### Pull Request Process
- Provide clear description of changes
- Include screenshots for UI changes
- Update documentation if necessary
- Respond to review feedback promptly

### Areas for Contribution

#### Feature Enhancements
- Additional waveform types (square, triangle, sawtooth)
- Frequency presets for common musical notes
- Volume control slider
- Frequency spectrum visualization

#### Technical Improvements
- Unit test implementation
- Performance optimizations
- Accessibility enhancements
- Mobile experience improvements

#### Documentation
- API documentation expansion
- Tutorial creation
- Code example additions
- Translation to other languages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

The MIT License is a permissive license that allows you to:
- Use the software for any purpose
- Modify the software
- Distribute the software
- Include the software in proprietary applications

The only requirement is that the license and copyright notice must be included with any substantial portions of the software.

## Acknowledgments

### Technologies and Libraries
- **React Team**: For creating and maintaining the React library
- **Vite Team**: For the fast and efficient build tool
- **Tailwind CSS**: For the utility-first CSS framework
- **Web Audio API**: W3C specification for audio processing

### Inspiration and Resources
- **MDN Web Docs**: Comprehensive Web Audio API documentation
- **React Documentation**: Official React guides and best practices
- **Tailwind CSS Documentation**: Styling guidelines and utilities

### Community
- **Open Source Community**: For continuous inspiration and support
- **Stack Overflow**: For problem-solving and knowledge sharing
- **GitHub**: For providing the platform for collaboration

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

