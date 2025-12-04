import { createContext, useState, useContext, ReactNode } from "react";
import { AVATAR, GAME_STORAGE_KEY, SCENE, SCENE_STEP, START_STEP } from "../constants/Game";
import { ACHIEVEMENT_KEY } from "../constants/Achievements";

/**
 * Provides a context and state management for the game's progress, including player name and scene.
 * Allows updating the game state and persists changes to localStorage.
 * Use `useGameState` to access the context within components.
 */

export type IGameState = {
  playerName: string;
  avatar: AVATAR; // Will store the path to the selected avatar image
  points: number;
  scene: SCENE;
  step: SCENE_STEP | START_STEP;
  unlockedAchievements: ACHIEVEMENT_KEY[]; // Store the keys of unlocked achievements
  replayQueue: ACHIEVEMENT_KEY[]; // Replay mode: store the keys of missing achievements
  // Add other progress-related fields here
};

export type IUpdateGameState = (newState: Partial<IGameState>) => void;

// Define the context value type
export type IGameStateContextType = {
  gameState: IGameState;
  updateGameState: IUpdateGameState;
  resetGameState: () => void;
};

// Create the context with a default value
const GameStateContext = createContext<IGameStateContextType | undefined>(undefined);

// Create a provider component
export function GameStateProvider({ children }: { children: ReactNode }) {
  // Get initial state
  const defaultState = {
    playerName: "",
    avatar: AVATAR.UNDEFINED,
    points: 0,
    scene: SCENE.START_SCREEN,
    step: SCENE_STEP.INTRO,
    unlockedAchievements: [],
    replayQueue: [],
    // Initialize other game state related fields here
  };

  const retrieveFromStorage = () => {
    try {
      const localStorage = window.localStorage.getItem(GAME_STORAGE_KEY);

      if (!localStorage) {
        window.localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(defaultState));
        return defaultState;
      }
      // Combine defaults + saved values
      return { ...defaultState, ...JSON.parse(localStorage) };
    } catch (err) {
      console.error("Error while reading GameState from localStorage:", err);
      window.localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(defaultState));
      return defaultState;
    }
  };

  const initialState = retrieveFromStorage();

  const [gameState, setGameState] = useState<IGameState>(initialState);

  const updateGameState = (newGameState: Partial<IGameState>) => {
    const prevGameState = retrieveFromStorage() || gameState; // LocalStorage is the source of truth
    const updatedGameState = { ...prevGameState, ...newGameState };

    window.localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(updatedGameState));
    setGameState(updatedGameState);
  };

  const resetGameState = () => {
    updateGameState(defaultState);
  };

  return (
    <GameStateContext.Provider value={{ gameState, updateGameState, resetGameState }}>
      {children}
    </GameStateContext.Provider>
  );
}

// Custom hook to use the GameStateContext
export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
}
