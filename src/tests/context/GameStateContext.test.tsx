import { renderHook } from "@testing-library/react";
import { act } from "react";
import { AVATAR, GAME_STORAGE_KEY, SCENE, SCENE_STEP } from "../../constants/Game";
import { GameStateProvider, IGameState, useGameState } from "../../context/GameStateContext";

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
  });
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("GameStateProvider", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <GameStateProvider>{children}</GameStateProvider>
  );

  it("should provide default state when no localStorage data exists", () => {
    const { result } = renderHook(() => useGameState(), { wrapper });

    expect(result.current.gameState).toEqual({
      playerName: "",
      avatar: AVATAR.UNDEFINED,
      points: 0,
      scene: SCENE.START_SCREEN,
      step: SCENE_STEP.INTRO,
      unlockedAchievements: [],
      replayQueue: [],
    });
  });

  it("should load state from localStorage when available", () => {
    const savedState: IGameState = {
      playerName: "Test Player",
      avatar: AVATAR.UNDEFINED,
      points: 100,
      scene: SCENE.SCENE_1,
      step: SCENE_STEP.INTRO,
      unlockedAchievements: [],
      replayQueue: [],
    };
    window.localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(savedState));

    const { result } = renderHook(() => useGameState(), { wrapper });

    expect(result.current.gameState).toEqual(savedState);
  });

  it("should update state and persist to localStorage", () => {
    const { result } = renderHook(() => useGameState(), { wrapper });

    act(() => {
      result.current.updateGameState({
        playerName: "New Player",
        points: 50,
      });
    });

    // Check hook state
    expect(result.current.gameState.playerName).toBe("New Player");
    expect(result.current.gameState.points).toBe(50);

    // Check localStorage
    const storedState = JSON.parse(window.localStorage.getItem(GAME_STORAGE_KEY)!);
    expect(storedState.playerName).toBe("New Player");
    expect(storedState.points).toBe(50);
    expect(storedState.scene).toBe(SCENE.START_SCREEN); // Other values should remain unchanged
  });

  it("should reset state to defaults", () => {
    // Set initial state
    window.localStorage.setItem(
      GAME_STORAGE_KEY,
      JSON.stringify({
        playerName: "Test Player",
        avatar: "avatar1.png",
        points: 100,
        scene: SCENE.SCENE_1,
        step: SCENE_STEP.INTRO,
        unlockedAchievements: [],
        replayQueue: [],
      }),
    );

    const { result } = renderHook(() => useGameState(), { wrapper });

    act(() => {
      result.current.resetGameState();
    });

    // Check hook state
    expect(result.current.gameState).toEqual({
      playerName: "",
      avatar: AVATAR.UNDEFINED,
      points: 0,
      scene: SCENE.START_SCREEN,
      step: SCENE_STEP.INTRO,
      unlockedAchievements: [],
      replayQueue: [],
    });

    // Check localStorage
    const storedState = JSON.parse(window.localStorage.getItem(GAME_STORAGE_KEY)!);
    expect(storedState).toEqual({
      playerName: "",
      avatar: AVATAR.UNDEFINED,
      points: 0,
      scene: SCENE.START_SCREEN,
      step: SCENE_STEP.INTRO,
      unlockedAchievements: [],
      replayQueue: [],
    });
  });

  it("should throw error when used outside provider", () => {
    // Prevent console error from being displayed in test output
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      renderHook(() => useGameState());
    }).toThrow("useGameState must be used within a GameStateProvider");

    console.error = originalError;
  });
});
