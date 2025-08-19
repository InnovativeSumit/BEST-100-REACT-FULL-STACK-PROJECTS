import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage first, then system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Apply theme to document root for Tailwind CSS dark mode
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prevIsDark => !prevIsDark);
    };

    return (
        <button
            onClick={toggleTheme}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                relative inline-flex items-center justify-center
                px-6 py-3 rounded-full font-semibold text-sm
                transition-all duration-300 ease-in-out
                transform hover:scale-105 active:scale-95
                shadow-lg hover:shadow-xl
                ${isDark 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:from-yellow-300 hover:to-orange-400' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500'
                }
                ${isHovered ? 'shadow-2xl' : ''}
            `}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <span className="flex items-center space-x-2">
                <span className="text-lg">
                    {isDark ? '☀️' : '🌙'}
                </span>
                <span className="font-medium">
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
            </span>
            
            {/* Animated background effect */}
            <div className={`
                absolute inset-0 rounded-full opacity-0 transition-opacity duration-300
                ${isHovered ? 'opacity-20' : ''}
                ${isDark 
                    ? 'bg-gradient-to-r from-yellow-200 to-orange-200' 
                    : 'bg-gradient-to-r from-indigo-200 to-purple-200'
                }
            `} />
            
            {/* Sparkle effects */}
            <div className={`
                absolute -top-1 -right-1 w-2 h-2 rounded-full
                transition-all duration-300
                ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                ${isDark ? 'bg-yellow-300' : 'bg-purple-300'}
            `} />
            <div className={`
                absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full
                transition-all duration-500 delay-100
                ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                ${isDark ? 'bg-orange-300' : 'bg-indigo-300'}
            `} />
        </button>
    );
};

export default ThemeToggle;