import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'admin';
}

export default function ThemeToggle({ className = '', variant = 'default' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const baseClasses = 'relative p-2 rounded-lg transition-all duration-200 flex items-center justify-center';
  const variantClasses = variant === 'admin'
    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
    : 'text-gray-600 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400';

  return (
    <button
      onClick={toggleTheme}
      className={`${baseClasses} ${variantClasses} ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
