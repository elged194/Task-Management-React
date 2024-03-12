import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// ---------------------------------------------------------------------
import { HelmetProvider } from "react-helmet-async";
// ---------------------------------------------------------------------
import { DarkMode } from "./comp/darkMode";
// ---------------------------------------------------------------------



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <DarkMode>
        <App/>
      </DarkMode>
    </HelmetProvider>
  </React.StrictMode>
);
