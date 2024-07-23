import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CalendarContextProvider } from "./context/CalendarContext";
import { DarkModeProvider } from "./context/DarkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <CalendarContextProvider>
        <App />
      </CalendarContextProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
