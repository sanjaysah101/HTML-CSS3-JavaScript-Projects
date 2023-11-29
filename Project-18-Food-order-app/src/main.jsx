import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { CartContextProvider } from "./services/stores/CartContext";
import { UserProgressProvider } from "./services/stores/UserProgress.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProgressProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </UserProgressProvider>
  </React.StrictMode>
);
