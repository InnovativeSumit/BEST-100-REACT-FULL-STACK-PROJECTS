# Myth Weaver - AI Story Generator

A professional React+Vite application that generates creative stories using Google's Gemini AI based on user-provided keywords.

## Features

- **AI Story Generation**: Creates 5 unique stories in different genres (Fantasy, Sci-Fi, Romance, Mystery, Mythology)
- **Professional UI**: Modern, responsive design with beautiful gradients and animations
- **Separate Navigation Sections**: 
  - Home: Landing page with hero section
  - AI Story: Story generation interface
  - Dev's: Developer profiles and information
  - About Us: Project information and features
- **Copy to Clipboard**: Easy copying of generated stories
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **HTTP Client**: Axios
- **AI Integration**: Google Gemini API
- **Routing**: React Router DOM

## Installation & Setup

1. **Clone/Extract the project**:
   ```bash
   cd MYTH-WAVER
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up API Key**:
   - Get a valid Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)
   - Update the `.env` file with your API key:
   ```
   VITE_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   - Navigate to `http://localhost:5173/`

## Usage

1. **Navigate to AI Story Generator**: Click on "AI Story" in the navigation
2. **Enter Keywords**: Input 4-6 descriptive keywords that inspire your story
3. **Generate Stories**: Click "Generate Stories" button
4. **View Results**: Browse through 5 unique stories in different genres
5. **Copy Stories**: Use the copy icon to copy any story to clipboard

## API Integration

The app uses Google's Gemini 1.5 Flash model to generate stories. Each story generation creates 5 different stories:

1. **Fantasy Adventure**: Mystical and magical themes
2. **Sci-Fi Thriller**: Technology and futuristic elements
3. **Romantic Tale**: Emotional depth and beautiful imagery
4. **Mystery Story**: Tension and intrigue
5. **Epic Mythology**: Gods, heroes, and ancient wisdom

## Development Team

- **Ravi Pandey** (@mrravipandee): React and Tailwind implementation
- **Shweta Bandawane** (@shweta1817): UI/UX design and color selection
- **Yash Jejurkar** (@jejurkaryash): AI integration and MERN stack development

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Troubleshooting

If you encounter issues:

1. **API Errors**: Check that your Gemini API key is valid and properly set in `.env`
2. **Build Issues**: Try deleting `node_modules` and running `npm install` again
3. **Port Conflicts**: The app runs on port 5173 by default, ensure it's available

## License

© 2024 Myth Weaver | All rights reserved
