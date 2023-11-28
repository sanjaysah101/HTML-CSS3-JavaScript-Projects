import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { AppProvider } from "./services/stores/CartContext";
import { UserProgressProvider } from "./services/stores/UserProgress.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProgressProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </UserProgressProvider>
  </React.StrictMode>
);
