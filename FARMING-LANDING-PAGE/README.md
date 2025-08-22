# AgriTech Solutions - Modern Farming Landing Page

A modern, responsive React landing page for agricultural technology solutions. This application showcases farming services including crop health prediction, land tool renting, and land rental services with smooth navigation and interactive components.

## 🌾 Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Smooth Navigation**: Functional navigation menu with smooth scrolling to different sections
- **Interactive Components**: Hover effects, animations, and interactive service cards
- **Modern UI**: Clean, professional design with Tailwind CSS styling
- **Contact Form**: Functional contact form with validation
- **Service Showcase**: Three main services with detailed descriptions and call-to-action buttons
- **About Section**: Company mission and values presentation
- **Social Media Integration**: Footer with social media links

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (version 18.0 or higher)
- **npm** or **pnpm** (pnpm is recommended)

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the project as a zip file, extract it
   # If you have it from git:
   git clone <repository-url>
   cd farming-landing-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you prefer pnpm (recommended)
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or with pnpm
   pnpm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📁 Project Structure

```
farming-landing-react/
├── public/                 # Static files
│   ├── favicon.ico        # Website favicon
│   └── vite.svg          # Vite logo
├── src/                   # Source code
│   ├── assets/           # Images and static assets
│   │   └── images/       # All project images
│   │       ├── landingpage/  # Landing page specific images
│   │       └── logos/        # Logo files
│   ├── components/       # Reusable React components
│   │   └── ui/          # UI components from shadcn/ui
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── App.jsx          # Main application component
│   ├── App.css          # Global styles and custom CSS
│   ├── index.css        # Base Tailwind CSS imports
│   └── main.jsx         # Application entry point
├── components.json       # shadcn/ui configuration
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── pnpm-lock.yaml       # Lock file for dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite bundler configuration
└── README.md           # This file
```

## 🎯 Available Scripts

In the project directory, you can run:

### `npm run dev` or `pnpm run dev`
Starts the development server on `http://localhost:5173`. The page will reload automatically when you make changes.

### `npm run build` or `pnpm run build`
Builds the app for production to the `dist` folder. The build is minified and optimized for best performance.

### `npm run preview` or `pnpm run preview`
Serves the production build locally for testing before deployment.

### `npm run lint` or `pnpm run lint`
Runs ESLint to check for code quality issues and potential bugs.

## 🧩 Components Overview

### Header Component
- Fixed navigation header with smooth scrolling
- Responsive mobile menu
- Login and Sign Up buttons
- Transparent background that becomes solid on scroll

### Hero Section
- Animated title with letter-by-letter animation using Framer Motion
- Call-to-action buttons that scroll to relevant sections
- Profile images of community farmers
- Large hero image showcasing modern farming

### About Section
- Company mission and values
- Feature highlights with checkmark icons
- Two-column layout with text and image

### Services Section
- Three service cards with hover effects
- Interactive "Learn More" buttons with animations
- Responsive grid layout
- Service images and detailed descriptions

### Contact Section
- Contact form with validation
- Contact information display
- Professional styling with green accent colors

### Footer
- Company logo and social media links
- Quick navigation links
- Contact information
- Copyright notice

## 🎨 Styling and Design

### Technologies Used
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Animation library for React
- **Lucide React**: Beautiful, customizable icons
- **Custom CSS**: Additional styling for specific components

### Color Scheme
- **Primary Green**: `#16a34a` (green-600)
- **Secondary Green**: `#22c55e` (green-500)
- **Dark Green**: `#15803d` (green-700)
- **Background**: White and light gray (`#f9fafb`)
- **Text**: Dark gray (`#1f2937`) and medium gray (`#6b7280`)

### Typography
- **Font Family**: System fonts with fallbacks
- **Headings**: Bold weights (font-bold)
- **Body Text**: Regular and medium weights
- **Responsive Sizing**: Text scales appropriately across devices

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

### Responsive Features
- Collapsible mobile navigation menu
- Flexible grid layouts that stack on smaller screens
- Scalable images and typography
- Touch-friendly button sizes on mobile devices

## 🔧 Customization

### Adding New Sections
1. Create a new component in the `src` directory
2. Import and add it to the main `App.jsx` file
3. Add navigation links in the Header component
4. Update the smooth scrolling functionality

### Modifying Colors
1. Update the Tailwind configuration in `tailwind.config.js`
2. Modify CSS custom properties in `App.css`
3. Update component classes throughout the application

### Adding New Images
1. Place images in the `src/assets/images/` directory
2. Import them in components using relative paths
3. Ensure images are optimized for web (WebP format recommended)

### Updating Content
- **Hero Section**: Modify text in the `HeroSection` component
- **Services**: Update the `cardsData` array in the `ServicesSection` component
- **About**: Edit content in the `AboutSection` component
- **Contact**: Update contact information in the `ContactSection` component

## 🌐 Deployment

### Build for Production
```bash
npm run build
# or
pnpm run build
```

### Deployment Options
1. **Netlify**: Drag and drop the `dist` folder
2. **Vercel**: Connect your repository for automatic deployments
3. **GitHub Pages**: Use GitHub Actions for automated deployment
4. **Traditional Hosting**: Upload the `dist` folder contents to your web server

### Environment Variables
If you need to add environment variables:
1. Create a `.env` file in the root directory
2. Add variables prefixed with `VITE_`
3. Access them in code using `import.meta.env.VITE_VARIABLE_NAME`

## 🛠️ Development Tips

### Code Organization
- Keep components small and focused on a single responsibility
- Use custom hooks for reusable logic
- Organize imports: React imports first, then third-party, then local imports

### Performance Optimization
- Images are optimized and properly sized
- Components use React best practices
- Tailwind CSS is purged in production builds
- Lazy loading can be added for images if needed

### Adding Animations
The project uses Framer Motion for animations. To add new animations:
```jsx
import { motion } from 'framer-motion'

const MyComponent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    Content here
  </motion.div>
)
```

## 🐛 Troubleshooting

### Common Issues

**Development server won't start**
- Ensure Node.js version is 18.0 or higher
- Delete `node_modules` and `pnpm-lock.yaml`, then run `pnpm install` again
- Check if port 5173 is already in use

**Images not loading**
- Verify image paths are correct relative to the `src` directory
- Ensure images exist in the `src/assets/images/` directory
- Check browser console for 404 errors

**Styling issues**
- Ensure Tailwind CSS is properly configured
- Check that custom CSS doesn't conflict with Tailwind classes
- Verify PostCSS configuration is correct

**Build errors**
- Run `npm run lint` to check for code issues
- Ensure all imports are correct and files exist
- Check for TypeScript errors if using TypeScript

### Getting Help
If you encounter issues:
1. Check the browser console for error messages
2. Verify all dependencies are installed correctly
3. Ensure you're using the correct Node.js version
4. Review the Vite documentation for build-related issues

## 📄 License

This project is created for educational and demonstration purposes. Feel free to use it as a template for your own projects.

## 🤝 Contributing

If you'd like to contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support regarding this project, please refer to the documentation or create an issue in the project repository.

---

**Built with ❤️ for modern agriculture and sustainable farming practices.**

