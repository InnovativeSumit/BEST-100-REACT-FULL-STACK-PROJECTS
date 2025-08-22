# Personal Dietitian - Fitness App

A modern React+Vite application for creating personalized diet plans based on health parameters and medical information.

## Features

- **Multi-step Form Interface**: Clean, intuitive step-by-step process
- **Health Parameter Input**: Age, height, weight with real-time BMI calculation
- **Medical Reports Upload**: Optional file upload for medical documents
- **Personalized Diet Plans**: Generated based on user input
- **Download Functionality**: Export diet plans as text files
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Lucide React**: Beautiful icons
- **JavaScript (JSX)**: No TypeScript for simplicity

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or pnpm package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd fitness-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   pnpm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```
or
```bash
pnpm run dev
```

The application will be available at `http://localhost:5173/`

### Building for Production

To create a production build:
```bash
npm run build
```
or
```bash
pnpm run build
```

## Usage

1. **Welcome Screen**: Introduction to the application and overview of the process
2. **Health Parameters**: Enter your age, height, and weight
3. **Medical Reports**: Optionally upload medical documents (PDF, JPG, PNG, DOC, DOCX)
4. **Diet Plan Generation**: View your personalized diet plan
5. **Download**: Save your diet plan as a text file

## Project Structure

```
fitness-app/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and other assets
│   ├── components/
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.css           # App-specific styles
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── components.json        # shadcn/ui configuration
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## Key Components

- **Multi-step Form**: Handles navigation between different steps
- **Health Parameter Input**: Collects user health data with validation
- **BMI Calculator**: Real-time BMI calculation and display
- **File Upload**: Handles medical report uploads
- **Diet Plan Generator**: Creates personalized meal plans
- **Download Feature**: Exports diet plans as downloadable files

## Customization

The application uses a mock diet plan generator. To integrate with a real backend:

1. Replace the `generateDietPlan` function in `App.jsx`
2. Add API endpoints for diet plan generation
3. Implement proper file upload handling for medical reports
4. Add user authentication if needed

## Browser Support

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



