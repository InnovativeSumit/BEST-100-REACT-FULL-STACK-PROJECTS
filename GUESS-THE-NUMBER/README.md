# Guess the Number - Professional React Game

A modern, professional number guessing game built with React + Vite, featuring beautiful UI design and engaging gameplay.

## 🎮 Game Features

- **Interactive Gameplay**: Guess numbers between 1-25 with intelligent feedback
- **Smart Hints**: Get contextual hints like "You're very close!" or "You're getting warmer!"
- **Attempt Tracking**: Visual display of remaining attempts and guess history
- **Professional Design**: Modern gradient UI with responsive design
- **Game Statistics**: Track your guesses and performance
- **Restart Functionality**: Easy game reset and new game options

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm package manager

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd guess-the-number-game
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎯 How to Play

1. **Start the Game**: The game automatically generates a random number between 1-25
2. **Make Your Guess**: Enter a number in the input field
3. **Get Feedback**: Receive hints about whether your guess is too high, too low, or close
4. **Track Progress**: Monitor your remaining attempts and previous guesses
5. **Win or Retry**: Successfully guess the number or start a new game when attempts run out

## 🏗️ Project Structure

```
guess-the-number-game/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Header.jsx    # Game header component
│   │   ├── NumberInput.jsx # Input handling component
│   │   ├── ResultMessage.jsx # Feedback display component
│   │   └── GameStats.jsx # Statistics component
│   ├── App.jsx           # Main application component
│   ├── App.css           # Tailwind CSS styles
│   └── main.jsx          # Application entry point
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite configuration
```

## 🎨 Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide Icons** - Beautiful icon library

## 🌐 VS Code Terminal Commands

### Development Workflow:
```bash
# Clone or navigate to project
cd guess-the-number-game

# Install dependencies
npm install

# Start development server (recommended)
npm run dev

# In a new terminal tab, you can run:
npm run lint    # Check code quality
npm run build   # Build for production
```

### Production Build:
```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Design

The game is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🎯 Game Logic

- **Random Number Generation**: Secure random number between 1-25
- **Attempt Limit**: 5 attempts per game
- **Smart Feedback System**:
  - Distance-based hints (very close, getting warm, etc.)
  - Clear high/low guidance
  - Encouraging messages
- **Game State Management**: Proper handling of win/lose conditions
- **Input Validation**: Ensures valid number inputs within range

## 🔧 Customization

You can easily customize the game by modifying:

- **Number Range**: Change the range in `App.jsx` (currently 1-25)
- **Attempt Limit**: Modify `maxCount` variable
- **Styling**: Update Tailwind classes in components
- **Messages**: Customize feedback messages in the game logic

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the game!

---

**Built with ❤️ using React + Vite • Professional Number Guessing Game**

