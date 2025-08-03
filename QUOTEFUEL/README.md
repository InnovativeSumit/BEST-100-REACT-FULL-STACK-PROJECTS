# QuoteFuel - Motivational Quote Generator

A beautiful React + Vite application that generates motivational quotes with an extensive local database of 500+ quotes, featuring text-to-speech functionality and social sharing options.

## 🌟 Features

- 🎯 **Extensive Quote Database**: 500+ carefully curated quotes with 50 quotes per category
- 🏷️ **10 Categories**: Motivational, Inspirational, Success, Wisdom, Life, Happiness, Courage, Perseverance, Leadership, Change
- 🔄 **Dual Quote Sources**: Switch between local database and Quotable API
- 🔊 **Text-to-Speech**: Listen to quotes using the Web Speech API
- 📱 **Social Sharing**: Share quotes via native sharing or copy to clipboard
- 🐦 **Twitter Integration**: Tweet quotes directly with one click
- 🎨 **Beautiful Design**: Modern UI with custom QuoteFuel logo, gradient backgrounds, and smooth animations
- 🌙 **Dark Mode Support**: Automatic dark/light theme support
- 📊 **Statistics Dashboard**: Track your quote exploration
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🚫 **Clean Branding**: No default Vite or React logos - only QuoteFuel branding

## 🚀 Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Lucide React** - Beautiful icons
- **Local Database** - 500+ quotes stored locally for instant access
- **Quotable API** - Free quote API as fallback (no API key required)
- **Web Speech API** - Browser-native text-to-speech

## 📦 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or pnpm

### Installation

1. Extract the project files to your desired directory
2. Navigate to the project directory:
   ```bash
   cd QuoteFuel
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   pnpm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   pnpm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## 🎮 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📖 Usage

### Quote Sources
- **Local Database**: Access 500+ quotes instantly from the built-in database
- **Quotable API**: Fetch fresh quotes from the internet (requires connection)

### How to Use
1. **Choose Quote Source**: Toggle between local database and API
2. **Select Categories**: Choose one or more inspiration categories from the tag selection
3. **Generate Quotes**: Click "New Quote" to get a random motivational quote
4. **Listen**: Click "Listen" to hear the quote read aloud using text-to-speech
5. **Share**: Use the "Share" button to share via native sharing or copy to clipboard
6. **Tweet**: Click "Tweet" to share the quote directly on Twitter

## 📊 Quote Database

The local database contains **50 carefully curated quotes** for each of the following categories:

- **Motivational** (50 quotes) - Drive and determination
- **Inspirational** (50 quotes) - Hope and encouragement  
- **Success** (50 quotes) - Achievement and excellence
- **Wisdom** (50 quotes) - Knowledge and insight
- **Life** (50 quotes) - Life lessons and perspectives
- **Happiness** (50 quotes) - Joy and contentment
- **Courage** (50 quotes) - Bravery and boldness
- **Perseverance** (50 quotes) - Persistence and endurance
- **Leadership** (50 quotes) - Guidance and influence
- **Change** (50 quotes) - Transformation and growth

**Total: 500+ quotes** from famous authors, philosophers, leaders, and thinkers.

## 🎨 Design Features

- **Custom QuoteFuel Logo** - Professional branding with flame icon
- **Custom Favicon** - Branded favicon for browser tabs
- **Gradient Backgrounds** - Beautiful color transitions
- **Glass Morphism** - Modern translucent card designs
- **Floating Animations** - Subtle motion effects for logo
- **Hover Effects** - Interactive button and tag animations
- **Responsive Layout** - Perfect on all screen sizes
- **Custom Scrollbar** - Styled scrollbars for better UX
- **Clean Interface** - No default framework logos visible

## 🌐 Browser Compatibility

- **Text-to-Speech**: Supported in modern browsers (Chrome, Firefox, Safari, Edge)
- **Native Sharing**: Supported in mobile browsers and some desktop browsers
- **Fallback**: Copy to clipboard functionality for unsupported browsers
- **Responsive**: Works on all modern browsers and devices

## 📁 Project Structure

```
QuoteFuel/
├── public/
│   └── favicon.png           # Custom QuoteFuel favicon
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   ├── data/
│   │   └── quotes.js        # Local quote database (500+ quotes)
│   ├── assets/
│   │   └── quotefuel-logo.png  # Custom QuoteFuel logo
│   ├── App.jsx              # Main application component
│   ├── App.css              # Custom styles and animations
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
├── index.html               # HTML template with custom title and favicon
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🔧 Customization

### Adding New Quotes
Edit the `src/data/quotes.js` file to add more quotes to any category:

```javascript
export const QUOTE_DATABASE = {
  motivational: [
    { content: "Your new quote here", author: "Author Name" },
    // ... existing quotes
  ],
  // ... other categories
}
```

### Adding New Categories
1. Add quotes to `QUOTE_DATABASE` in `src/data/quotes.js`
2. The category will automatically appear in the tag selection

### Styling
The application uses Tailwind CSS with custom components defined in `src/App.css`. You can:
- Modify the gradient backgrounds
- Adjust animations and transitions
- Customize the color scheme
- Add new CSS animations

### Speech Settings
Modify the text-to-speech settings in the `speakQuote` function:

```javascript
utterance.rate = 0.8    // Speech rate (0.1 to 10)
utterance.pitch = 1     // Speech pitch (0 to 2)
utterance.volume = 1    // Speech volume (0 to 1)
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting
- Vercel
- Netlify  
- GitHub Pages
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Quote Authors** - All the inspiring individuals whose words motivate us
- [Quotable API](https://quotable.io/) - For providing additional quote data
- [shadcn/ui](https://ui.shadcn.com/) - For the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Lucide](https://lucide.dev/) - For the beautiful icons
- [Vite](https://vitejs.dev/) - For the fast build tool

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure you have a stable internet connection for API requests
3. Verify that your browser supports the Web Speech API for text-to-speech functionality

## 📈 Statistics

- **500+ Quotes** - Extensive local database
- **10 Categories** - Diverse range of inspirational topics
- **50 Per Category** - Consistent quality and quantity
- **2 Quote Sources** - Local database + API fallback
- **Multiple Features** - Speech, sharing, and social integration
- **Clean Branding** - Only QuoteFuel logos and branding

## ✨ What's Different

This version of QuoteFuel features:
- **No Default Logos**: Removed all Vite and React branding
- **Custom Branding**: Only QuoteFuel logo and favicon visible
- **Clean Interface**: Professional appearance without framework logos
- **Custom Favicon**: Branded favicon in browser tabs
- **Enhanced Title**: Descriptive page title in browser

<div align="center">
**Built with ❤️ using React + Vite**

*Fuel your motivation with QuoteFuel!*
<p>Made with ❤️ by <strong>SUMIT PAL</strong></p>

🌟 Let's Connect

I'm passionate about collaborating on innovative projects and sharing knowledge about *coding, design, robotics, and AI*. Let's build something amazing together!  

[![Instagram](https://img.icons8.com/fluency/48/instagram-new.png)](https://www.instagram.com/sumittech_360)  [![YouTube](https://img.icons8.com/fluency/48/youtube-play.png)](https://youtube.com/channel/UCiPxbNaC7dloVut6Jc5xHIQ)  [![GitHub](https://img.icons8.com/fluency/48/github.png)](https://github.com/InnovativeSumit)  [![LinkedIn](https://img.icons8.com/fluency/48/linkedin.png)](https://www.linkedin.com/in/sumit-pal-40511a339) 

⭐ Star this repo on GitHub — it helps!

<p>For questions or support, please open an issue on the repository.</p>
</div>




