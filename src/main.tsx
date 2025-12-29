import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { CompProvider } from "./context/loginContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CompProvider>
      <App />
    </CompProvider>
  </StrictMode>
);
