import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import { AppContextProvider } from "./context/context";
import { AuthProvider } from "./hooks";
import { DataProvider } from "./context";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <AppContextProvider>
    <AuthProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthProvider>
  </AppContextProvider>
);
