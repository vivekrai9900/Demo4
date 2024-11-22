import React, { createContext, useState, useContext } from 'react';

// Create the UI context
export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  // Default theme is light
  const [theme, setTheme] = useState('light'); // Default theme is 'light'

  // Function to set theme (can be called based on profile)
  const setUserTheme = (userTheme) => {
    setTheme(userTheme === 'dark' ? 'dark' : 'light');
  };

  return (
    <UIContext.Provider value={{ theme, setUserTheme }}>
      {children}
    </UIContext.Provider>
  );
};

// Custom hook to use the UI context
export const useUI = () => useContext(UIContext);
