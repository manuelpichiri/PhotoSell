import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "rc-slider/assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/plus-jakarta-sans";
import "rc-tooltip/assets/bootstrap.css";
import "./index.css";
import { UserProvider } from "../context/userContext.jsx";
import { PhotoProvider } from "../context/photoContext.jsx";
import App from "./App.jsx";
import { CartProvider } from "../context/cartContext.jsx";
import { OrderProvider } from "../context/orderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <OrderProvider>
      <CartProvider>
        <UserProvider>
          <PhotoProvider>
            <App />
          </PhotoProvider>
        </UserProvider>
      </CartProvider>
    </OrderProvider>
  </StrictMode>,
);
