import React, { createContext, useContext, useState } from "react";
const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

function getInitialDarkMode() {
  const storedDarkMode = localStorage.getItem("darkMode");
  if (storedDarkMode !== null) {
    return storedDarkMode === "true";
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
