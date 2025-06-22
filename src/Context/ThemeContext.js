import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Custom hook for consuming the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component to wrap around the app
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Update body class when theme changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Provide theme state and toggle function
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
