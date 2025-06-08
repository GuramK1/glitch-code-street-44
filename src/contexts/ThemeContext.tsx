
import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Always dark theme - no toggle functionality
  const isDark = true;

  const toggleTheme = () => {
    // No-op - theme is always dark
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className="bg-jet-black text-white min-h-screen">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
