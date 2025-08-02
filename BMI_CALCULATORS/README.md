# BMI Calculator - Interactive Health Assessment Tool

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.4.9-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Lucide_React-0.263.1-000000?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide React" />
</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [BMI Categories](#bmi-categories)
- [Screenshots](#screenshots)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The **BMI Calculator** is a modern, interactive web application built with React and Tailwind CSS that helps users calculate their Body Mass Index (BMI) and provides personalized health insights. This tool supports both metric and imperial units, tracks calculation history, and offers tailored health recommendations based on BMI categories.

### Why BMI Matters

Body Mass Index (BMI) is a widely used screening tool that helps assess whether a person has a healthy body weight for their height. While BMI doesn't directly measure body fat, it provides a useful indicator for identifying potential health risks associated with being underweight, overweight, or obese.

## ✨ Features

### 🧮 Core Functionality
- **Accurate BMI Calculation**: Precise BMI computation using the standard formula (weight/height²)
- **Dual Unit Support**: Seamlessly switch between metric (meters, kg) and imperial (feet, lbs) units
- **Real-time Validation**: Instant form validation with user-friendly error messages
- **Loading States**: Smooth loading animations for better user experience

### 📊 Health Insights
- **BMI Categories**: Visual categorization with color-coded results (Underweight, Normal, Overweight, Obese)
- **Personalized Health Tips**: Tailored recommendations based on your BMI category
- **Health Risk Assessment**: Clear explanations of what your BMI means for your health

### 📈 History & Tracking
- **Calculation History**: Automatic saving of your last 10 BMI calculations
- **Local Storage**: Persistent data storage that survives browser sessions
- **Progress Tracking**: Visual timeline of your BMI changes over time
- **Data Export**: Easy access to your historical data

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Accessibility**: WCAG compliant with proper contrast ratios and keyboard navigation
- **Dark Mode Ready**: Prepared for future dark mode implementation

## 🛠 Tech Stack

### Frontend Framework
- **React 18.3.1**: Modern React with hooks and functional components
- **Vite 5.4.9**: Lightning-fast build tool and development server
- **JavaScript (ES6+)**: Modern JavaScript features and syntax

### Styling & UI
- **Tailwind CSS 3.4.14**: Utility-first CSS framework for rapid UI development
- **Lucide React 0.263.1**: Beautiful, customizable SVG icons
- **Custom CSS**: Additional animations and responsive design enhancements

### Development Tools
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefix addition

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📁 Project Structure

```
bmicalculates/
├── public/                     # Static assets
│   └── vite.svg               # Vite logo
├── src/                       # Source code
│   ├── assets/                # Static assets (images, icons)
│   │   └── react.svg         # React logo
│   ├── components/            # React components
│   │   └── BMICalculator.jsx # Main BMI calculator component
│   ├── App.css               # Global app styles
│   ├── App.jsx               # Main app component
│   ├── index.css             # Global CSS with Tailwind imports
│   └── main.jsx              # Application entry point
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Dependency lock file
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Project documentation
├── tailwind.config.js        # Tailwind CSS configuration
└── vite.config.js            # Vite configuration
```

### Key Files Explained

#### `src/components/BMICalculator.jsx`
The heart of the application containing:
- BMI calculation logic for both metric and imperial units
- State management for form inputs, results, and history
- Health tips and recommendations system
- Local storage integration for data persistence

#### `src/App.jsx`
Main application wrapper that:
- Provides the overall layout structure
- Implements the gradient background design
- Ensures responsive container sizing

#### `src/index.css`
Global styles including:
- Tailwind CSS imports and customizations
- Custom animations and transitions
- Responsive design utilities
- Accessibility enhancements

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**

You can check your versions by running:
```bash
node --version
npm --version
```

### Step-by-Step Installation

1. **Clone or Download the Project**
   ```bash
   # If you have the project as a zip file, extract it
   # If you have it in a git repository:
   git clone <repository-url>
   cd bmicalculates
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This command will install all the required dependencies listed in `package.json`, including:
   - React and React DOM
   - Vite build tool
   - Tailwind CSS
   - Lucide React icons
   - Development dependencies (ESLint, PostCSS, etc.)

3. **Verify Installation**
   ```bash
   npm run dev
   ```
   
   If everything is installed correctly, you should see output similar to:
   ```
   VITE v5.4.9  ready in 500 ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ➜  press h to show help
   ```

### Alternative Installation Methods

#### Using Yarn
```bash
yarn install
yarn dev
```

#### Using pnpm
```bash
pnpm install
pnpm dev
```

## 💻 Usage

### Running the Development Server

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Open Your Browser**
   Navigate to `http://localhost:5173/` (or the URL shown in your terminal)

3. **Start Using the Calculator**
   - Choose your preferred unit system (Metric or Imperial)
   - Enter your height and weight
   - Click "Calculate BMI" to see your results

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Using the BMI Calculator

#### Step 1: Choose Your Units
- **Metric**: Height in meters (e.g., 1.75), Weight in kilograms (e.g., 70)
- **Imperial**: Height in feet (e.g., 5.9), Weight in pounds (e.g., 154)

#### Step 2: Enter Your Measurements
- Input your height in the first field
- Input your weight in the second field
- Both fields include helpful placeholder text

#### Step 3: Calculate and Review
- Click the "Calculate BMI" button
- View your BMI score and category
- Read the personalized health message

#### Step 4: Explore Additional Features
- Click "Show Health Tips" for personalized recommendations
- Review the BMI categories reference chart
- Check your calculation history
- Use the "Reset" button to start over

### Understanding Your Results

Your BMI result will be displayed with:
- **Numerical Score**: Your exact BMI value (e.g., 22.9)
- **Category**: Underweight, Normal, Overweight, or Obese
- **Color Coding**: Visual indication of your health status
- **Health Message**: Explanation of what your BMI means
- **Personalized Tips**: Specific recommendations for your category

## 📊 BMI Categories

The World Health Organization (WHO) defines BMI categories as follows:

| Category | BMI Range | Health Status | Color Code |
|----------|-----------|---------------|------------|
| **Underweight** | Below 18.5 | May indicate malnutrition or health issues | 🔵 Blue |
| **Normal Weight** | 18.5 - 24.9 | Healthy weight range | 🟢 Green |
| **Overweight** | 25.0 - 29.9 | Increased health risks | 🟡 Yellow |
| **Obese** | 30.0 and above | High health risks | 🔴 Red |

### Important Notes About BMI

- BMI is a screening tool, not a diagnostic tool
- It doesn't distinguish between muscle and fat mass
- Results may vary for athletes, elderly, or pregnant individuals
- Always consult healthcare professionals for personalized advice

## 🖼 Screenshots

*Note: Screenshots would be added here showing the application in action*

## 🔧 Development

### Development Workflow

1. **Make Changes**: Edit files in the `src/` directory
2. **Hot Reload**: Changes automatically reflect in the browser
3. **Test**: Verify functionality across different devices
4. **Lint**: Run `npm run lint` to check code quality
5. **Build**: Run `npm run build` to create production build

### Customization Options

#### Styling
- Modify `tailwind.config.js` to customize the design system
- Edit `src/index.css` for global styles
- Update component styles directly in JSX files

#### Functionality
- Add new BMI categories or modify existing ones
- Implement additional health metrics
- Extend the history tracking system
- Add data export/import features

#### Deployment
```bash
# Build for production
npm run build

# The dist/ folder contains the production-ready files
# Deploy the contents to your web server
```

### Performance Optimization

The application is optimized for performance with:
- **Code Splitting**: Automatic code splitting with Vite
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Automatic image and CSS optimization
- **Caching**: Efficient browser caching strategies

## 🤝 Contributing

We welcome contributions to improve the BMI Calculator! Here's how you can help:

### Reporting Issues
- Use the issue tracker to report bugs
- Provide detailed reproduction steps
- Include browser and system information

### Submitting Changes
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Follow the existing code style
- Write clear commit messages
- Add comments for complex logic
- Test on multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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

