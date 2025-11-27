// src/App.jsx
import ColorGuesser from './components/ColorGuesser';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto">
        <ColorGuesser />
      </div>
      
      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>RGB Color Challenge Game • Built with React & Vite</p>
        <p className="mt-1">Test your color perception and improve your RGB knowledge</p>
      </footer>
    </div>
  );
}

export default App;

