# Tip Calculator

A modern, responsive tip calculator application built with React, Vite, and Tailwind CSS. This application provides an intuitive interface for calculating tips and splitting bills among multiple people, making it perfect for dining out with friends or colleagues.

## 🌟 Features

- **Easy Bill Input**: Enter your bill amount with a clean, user-friendly interface
- **Flexible Tip Calculation**: Customize tip percentage to match your preferences
- **Bill Splitting**: Calculate how much each person owes when splitting the bill
- **Real-time Results**: Instant calculations with detailed breakdown
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional design with smooth hover effects

## 🚀 Live Demo

Experience the Tip Calculator in action by running it locally following the installation instructions below.

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠 Installation

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (version 14.0 or higher)
- npm (comes with Node.js) or yarn

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TIP-CALCULATORS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or if you prefer yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   or with yarn:
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 💡 Usage

### Basic Usage

1. **Enter Bill Amount**: Input the total bill amount in the first field
2. **Set Tip Percentage**: Adjust the tip percentage (default is 15%)
3. **Specify Number of People**: Enter how many people are splitting the bill
4. **Calculate**: Click the "Calculate" button to see the results

### Results Display

After calculation, you'll see:
- **Total Tip**: The amount of tip based on your percentage
- **Total Amount**: Bill amount plus tip
- **Amount per Person**: How much each person should pay

### Example Calculation

For a $100 bill with 18% tip split between 4 people:
- Total Tip: $18.00
- Total Amount: $118.00
- Amount per Person: $29.50

## 📁 Project Structure

```
TIP-CALCULATORS/
├── public/
│   └── vite.svg                 # Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg           # React logo
│   ├── components/
│   │   └── TipCalculator.jsx   # Main calculator component
│   ├── App.jsx                 # Root application component
│   ├── index.css              # Global styles and Tailwind imports
│   └── main.jsx               # Application entry point
├── .gitignore                 # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Locked dependency versions
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Project documentation
├── tailwind.config.js        # Tailwind CSS configuration
└── vite.config.js           # Vite build configuration
```

### Key Components

#### TipCalculator.jsx
The main component that handles all tip calculation logic and user interface. It includes:
- State management for bill amount, tip percentage, and number of people
- Calculation functions for tip and per-person amounts
- Responsive form inputs with proper validation
- Results display with formatted currency values

#### App.jsx
The root component that provides the overall layout and styling, featuring:
- Gradient background design
- Centered layout with proper spacing
- Application title and main component integration

## 🔧 Technologies Used

### Frontend Framework
- **React 18**: Modern JavaScript library for building user interfaces
- **Vite**: Next-generation frontend build tool for faster development

### Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **PostCSS**: Tool for transforming CSS with JavaScript plugins

### Development Tools
- **ESLint**: JavaScript linting utility for code quality
- **Node.js**: JavaScript runtime for development environment

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| React | ^18.3.1 | Core UI library |
| React DOM | ^18.3.1 | DOM rendering |
| Vite | ^5.4.10 | Build tool and dev server |
| Tailwind CSS | ^3.4.14 | Utility-first CSS framework |
| ESLint | ^9.13.0 | Code linting and quality |

## 🔨 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Development Workflow

1. **Start Development Server**: Run `npm run dev` to start the local development server
2. **Make Changes**: Edit files in the `src/` directory
3. **Hot Reload**: Changes are automatically reflected in the browser
4. **Build for Production**: Use `npm run build` when ready to deploy

### Customization Options

#### Styling Customization
The application uses Tailwind CSS, making it easy to customize:
- Modify `tailwind.config.js` to change theme colors, fonts, or spacing
- Update component classes in `TipCalculator.jsx` for different styling
- Adjust the gradient background in `App.jsx`

#### Functionality Extensions
Consider adding these features:
- Preset tip percentage buttons (10%, 15%, 18%, 20%)
- Currency selection for international use
- Bill item breakdown functionality
- Save calculation history
- Dark mode toggle

## 🤝 Contributing

We welcome contributions to improve the Tip Calculator! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed
- Ensure all linting checks pass

### Bug Reports
If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable

