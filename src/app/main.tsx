import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { GameStateProvider } from "../context/GameStateContext";
import { SettingsProvider } from "../context/SettingsContext";
import { ErrorBoundary } from "../components/common/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <SettingsProvider>
        <GameStateProvider>
          <App />
        </GameStateProvider>
      </SettingsProvider>
    </ErrorBoundary>
  </StrictMode>,
);
