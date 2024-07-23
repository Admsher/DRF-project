import { createContext, useEffect } from "react";
import React, { useState } from "react";

export const CalendarContext = createContext();

export const CalendarContextProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {}, []);

  return (
    <CalendarContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </CalendarContext.Provider>
  );
};
