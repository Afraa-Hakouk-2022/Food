import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QuantityContextProvider } from "./components/Store/Quantity-Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QuantityContextProvider>
    <App />
  </QuantityContextProvider>
);
