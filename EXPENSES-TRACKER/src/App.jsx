import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import './App.css';

// Components
import Dashboard from './components/Dashboard';
import ExpenseManager from './components/ExpenseManager';
import IncomeManager from './components/IncomeManager';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import Navbar from './components/Navbar';

// Context for global state management
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ExpenseProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Professional Navbar */}
            <Navbar />
            
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/expenses" element={<ExpenseManager />} />
                <Route path="/income" element={<IncomeManager />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ExpenseProvider>
    </ThemeProvider>
  );
}

export default App;
