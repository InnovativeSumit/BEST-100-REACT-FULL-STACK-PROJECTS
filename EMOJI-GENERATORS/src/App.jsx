// src/App.jsx
import EmojiSearch from './components/EmojiSearch';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* Background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      
      {/* Theme toggle button */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-7xl">
          <EmojiSearch />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-gray-500 dark:text-gray-400">
        <p className="text-sm">
          🚀 Built with React & Tailwind CSS | 
          <span className="mx-2">✨</span>
          Professional Emoji Generator
          <span className="mx-2">✨</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
