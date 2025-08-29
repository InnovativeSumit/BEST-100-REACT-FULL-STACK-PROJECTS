# Professional HEX/RGB Color Converter

A sophisticated React application for seamless bidirectional conversion between HEX and RGB color formats, featuring a professional user interface with real-time conversion capabilities.

## Features

### Core Functionality
- **Bidirectional Conversion**: Convert from HEX to RGB and RGB to HEX simultaneously
- **Real-time Processing**: Instant conversion as you type, no button clicks required
- **Input Validation**: Comprehensive error handling with user-friendly feedback
- **Copy to Clipboard**: One-click copying of converted color values

### User Experience
- **Professional UI**: Modern, gradient-based design with smooth animations
- **Color Preview**: Live color preview circle that updates with current selection
- **Preset Colors**: Quick access to 10 commonly used colors
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Visual Feedback**: Hover effects, transitions, and success notifications

### Technical Features
- **Enhanced Validation**: Supports both 3-digit (#RGB) and 6-digit (#RRGGBB) HEX formats
- **Flexible RGB Input**: Accepts various RGB string formats with whitespace tolerance
- **Error Handling**: Clear error messages for invalid color formats
- **Performance Optimized**: Efficient real-time conversion with React hooks

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd HEX-RGBCONVERTOR
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173/
   ```

## Usage Guide

### HEX to RGB Conversion
1. Enter a HEX color value in the "HEX Input" field (e.g., `#FF5733` or `#F53`)
2. The RGB equivalent will appear instantly in the "RGB Output" field
3. Click the "Copy" button to copy the RGB value to your clipboard

### RGB to HEX Conversion
1. Enter an RGB color value in the "RGB Input" field (e.g., `rgb(255, 87, 51)`)
2. The HEX equivalent will appear instantly in the "HEX Output" field
3. Click the "Copy" button to copy the HEX value to your clipboard

### Quick Color Presets
- Click any of the colored squares in the "Quick Color Presets" section
- Both input fields will be populated with the selected color
- The color preview will update to show the selected color

## Supported Formats

### HEX Input Formats
- 6-digit format: `#RRGGBB` (e.g., `#FF5733`)
- 3-digit format: `#RGB` (e.g., `#F53`)
- Case insensitive (both uppercase and lowercase accepted)

### RGB Input Formats
- Standard format: `rgb(r, g, b)` (e.g., `rgb(255, 87, 51)`)
- Flexible whitespace: `rgb( 255 , 87 , 51 )`
- Values must be integers between 0-255

## Technical Architecture

### Built With
- **React 18**: Modern React with hooks for state management
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **JavaScript ES6+**: Modern JavaScript features

### Key Components
- `ColorConverter.jsx`: Main component handling conversion logic and UI
- `App.jsx`: Root application component with layout
- Enhanced conversion algorithms with comprehensive validation

### Conversion Algorithms
- **HEX to RGB**: Parses hexadecimal values and converts to decimal RGB
- **RGB to HEX**: Validates RGB ranges and converts to padded hexadecimal
- **Error Handling**: Validates input formats and provides user feedback

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

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



