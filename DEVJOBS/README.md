# DevForce - Remote Job Board

A modern React + Vite application for browsing remote developer job listings with advanced filtering, pagination, and favorites functionality.

## Features

- 🔍 **Job Search**: Search through job listings by title, company, or description
- 🏷️ **Tech Stack Filtering**: Filter jobs by specific technologies (React, Node.js, Python, etc.)
- 📄 **Pagination**: Browse through job listings with intuitive pagination controls
- ❤️ **Favorites**: Save and manage your favorite job postings
- 🌙 **Dark/Light Theme**: Toggle between light and dark themes with persistent preference
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: CSS3 with CSS Variables for theming
- **Icons**: Lucide React
- **State Management**: React Context API
- **Local Storage**: For theme preferences and favorites persistence

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone or download the project files
2. Navigate to the project directory:
   ```bash
   cd DevJobs
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
DevJobs/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── JobBoard.jsx
│   │   ├── JobCard.jsx
│   │   ├── JobList.jsx
│   │   ├── Pagination.jsx
│   │   └── SearchFilter.jsx
│   ├── context/
│   │   ├── JobContext.jsx
│   │   └── ThemeContext.jsx
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   ├── utils/
│   │   └── mockData.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Usage

### Searching for Jobs

1. Use the search bar to enter keywords related to job titles, companies, or descriptions
2. Click the "Search" button or press Enter to apply the search

### Filtering by Tech Stack

1. Click the "Filters" button to expand the filter panel
2. Select one or more technologies from the available options
3. The job listings will automatically update to show matching jobs
4. Use "Clear All Filters" to reset the tech stack filters

### Managing Favorites

1. Click the heart icon on any job card to add it to your favorites
2. Favorited jobs will have a filled heart icon
3. Click the heart icon again to remove from favorites
4. Your favorites are automatically saved to local storage

### Theme Switching

1. Click the moon/sun icon in the header to toggle between light and dark themes
2. Your theme preference is automatically saved and will persist across sessions

### Pagination

1. Use the pagination controls at the bottom to navigate through job listings
2. Click page numbers to jump to specific pages
3. Use "Previous" and "Next" buttons for sequential navigation

## Data Source

This application uses mock data to simulate job listings. In a production environment, you would replace the mock data with real API calls to job listing services.

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






