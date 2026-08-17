import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext.jsx";
import { AuthContext } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>,
);
