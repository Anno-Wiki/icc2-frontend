import React, { useContext, useState, createContext } from 'react';

const AppStateContext = createContext();

const AppStateProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const valueObj = {
    theme,
    toggleTheme,
  };

  return (
    <AppStateContext.Provider value={valueObj}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const state = useContext(AppStateContext);

  if (!state) {
    throw new Error('useAppState must be used within AppStateProvider');
  }

  return [state];
};

export default AppStateProvider;
