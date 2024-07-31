import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import { AppContextProvider } from "./context/context";
import { AuthProvider } from "./hooks";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppContextProvider>
  </React.StrictMode>
);
