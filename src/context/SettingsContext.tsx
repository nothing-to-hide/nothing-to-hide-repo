import { createContext, useState, useContext, ReactNode } from "react";
import { SETTINGS_STORAGE_KEY } from "../constants/Game";
import { Language } from "../translations";
import { LANGUAGES } from "../constants/Languages";

/**
 * Provides a context and provider for managing game settings.
 * Includes functionality to update settings and persist them in localStorage.
 * Use the `useSettings` hook to access the context within components.
 */

export type ISettings = {
  audioEnabled: boolean;
  musicVolume: number; // Volume between 0 and 1
  soundEffectsVolume: number; // Volume between 0 and 1
  language: Language;
  // Add other settings here
};

export type IUpdateSettings = (newSettings: Partial<ISettings>) => void;

// Define the context value type
export type SettingsContextType = {
  settings: ISettings;
  updateSettings: IUpdateSettings;
};

// Create the context with a default value
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Create a provider component
export function SettingsProvider({ children }: { children: ReactNode }) {
  // Get initial state
  const defaultState = {
    audioEnabled: true,
    musicVolume: 0.5,
    soundEffectsVolume: 0.5,
    language: LANGUAGES.DE.code,
    // Initialize other settings here
  };

  const retrieveFromStorage = () => {
    try {
      const localStorage = window.localStorage.getItem(SETTINGS_STORAGE_KEY);

      if (!localStorage) {
        window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultState));
        return defaultState;
      }
      // Combine defaults + saved values
      return { ...defaultState, ...JSON.parse(localStorage) };
    } catch (err) {
      console.error("Error while reading Settings from localStorage:", err);
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultState));
      return defaultState;
    }
  };

  const initialState = retrieveFromStorage();

  const [settings, setSettings] = useState<ISettings>(initialState);

  const updateSettings = (newSettings: Partial<ISettings>) => {
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, ...newSettings };
      // Update localStorage too
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Custom hook to use the SettingsContext
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
