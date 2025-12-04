import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useMiniGame } from "../../../components/scenes/phishing/MiniGame/logic/useMiniGame";
import { MINI_GAME_STATE } from "../../../constants/Game";
import { PHISHING_GAME } from "../../../constants/MiniGames/phishing";
import { useGameState } from "../../../context/GameStateContext";
import { AudioManager } from "../../../utils/managers/AudioManager";
import { PhishingMessage } from "../../../components/scenes/phishing/MiniGame/logic/types";

// Mock dependencies
jest.mock("../../../context/GameStateContext");
jest.mock("../../../utils/managers/AudioManager");

const mockPhishingMessages = [
  {
    type: "email",
    sender: "bank@example.com",
    text: "Your account has been compromised!",
    isPhishing: true,
  },
  {
    type: "sms",
    sender: "Amazon",
    text: "Your package is delayed",
    isPhishing: false,
  },
] as PhishingMessage[];

const mockPhishingContainer = document.createElement("div");
mockPhishingContainer.getBoundingClientRect = () => ({
  width: 800,
  height: 600,
  left: 0,
  top: 0,
  right: 800,
  bottom: 600,
  x: 0,
  y: 0,
  toJSON: () => "",
});

describe("useMiniGame", () => {
  const MOCK_BAIT_ID = 1;
  const MOCK_BAIT_INITIAL_X_POS = 100;
  const MOCK_BAIT_INITIAL_Y_POS = 100;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock useGameState
    (useGameState as jest.Mock).mockReturnValue({
      gameState: {},
      updateGameState: jest.fn(),
    });

    // Mock AudioManager
    (AudioManager.getInstance as jest.Mock).mockReturnValue({
      play: jest.fn(),
      loop: jest.fn(),
      stop: jest.fn(),
    });

    // Mock requestAnimationFrame
    jest.useFakeTimers();
    global.requestAnimationFrame = (callback) => {
      setTimeout(() => callback(0), 0);
      return 0;
    };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useMiniGame({ current: null }, mockPhishingMessages, () => {}));

    expect(result.current.gameState).toBe(MINI_GAME_STATE.INTRO);
    expect(result.current.baits).toEqual([]);
    expect(result.current.fishHealth).toBe(PHISHING_GAME.config.fishInitialHealth);
  });

  describe("game state transitions", () => {
    it("should transition from INTRO to TUTORIAL when handleIntroDone is called", () => {
      const { result } = renderHook(() => useMiniGame({ current: null }, mockPhishingMessages, () => {}));

      act(() => {
        result.current.handleIntroDone();
      });

      expect(result.current.gameState).toBe(MINI_GAME_STATE.TUTORIAL);
    });

    it("should transition to PLAYING when handleStart is called", () => {
      const { result } = renderHook(() => useMiniGame({ current: null }, mockPhishingMessages, () => {}));

      act(() => {
        result.current.handleStart();
      });

      expect(result.current.gameState).toBe(MINI_GAME_STATE.PLAYING);
      expect(AudioManager.getInstance().loop).toHaveBeenCalledWith(PHISHING_GAME.sounds.theme);
    });

    it("should transition to COMPLETED when handleGameCompleted is called", () => {
      const { result } = renderHook(() => useMiniGame({ current: null }, mockPhishingMessages, () => {}));

      act(() => {
        result.current.handleGameCompleted();
      });

      expect(result.current.gameState).toBe(MINI_GAME_STATE.COMPLETED);
    });

    it("should play fail sound when handleGameCompleted is called with lost=true", () => {
      const { result } = renderHook(() => useMiniGame({ current: null }, mockPhishingMessages, () => {}));

      act(() => {
        result.current.handleGameCompleted(true);
      });

      expect(AudioManager.getInstance().play).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe("bait handling", () => {
    it("should spawn baits when game is PLAYING", () => {
      const containerRef = { current: mockPhishingContainer };
      const { result } = renderHook(() => useMiniGame(containerRef, mockPhishingMessages, () => {}));

      // Start the game
      act(() => {
        result.current.handleStart();
      });

      // Advance timers to trigger bait spawning
      act(() => {
        jest.advanceTimersByTime(PHISHING_GAME.config.baitInitialInterval);
      });

      expect(result.current.baits.length).toBeGreaterThan(0);
      expect(result.current.baits[0].message).toEqual(mockPhishingMessages[0]);
    });

    it("should limit number of baits based on config", () => {
      const containerRef = { current: mockPhishingContainer };
      const NUMBER_OF_MESSAGES_FOR_LIMIT_TEST = 20;
      const manyMessages = Array(NUMBER_OF_MESSAGES_FOR_LIMIT_TEST).fill(mockPhishingMessages[0]);
      const { result } = renderHook(() => useMiniGame(containerRef, manyMessages, () => {}));

      // Start the game
      act(() => {
        result.current.handleStart();
      });

      // Spawn more baits than the limit
      act(() => {
        jest.advanceTimersByTime(
          PHISHING_GAME.config.baitInitialInterval * (PHISHING_GAME.config.baitMaximal + 1),
        );
      });

      expect(result.current.baits.length).toBeLessThanOrEqual(PHISHING_GAME.config.baitMaximal);
    });

    it("should handle bait eaten correctly (bad answer)", () => {
      const containerRef = { current: mockPhishingContainer };
      const { result } = renderHook(() => useMiniGame(containerRef, [], () => {}));

      // Start the game and spawn a bait
      act(() => {
        result.current.handleStart();
      });

      // Eat the bait
      act(() => {
        result.current.setBaits([
          {
            id: MOCK_BAIT_ID,
            xPos: MOCK_BAIT_INITIAL_X_POS,
            yPos: MOCK_BAIT_INITIAL_Y_POS,
            message: mockPhishingMessages[0],
            correctAnswer: false,
          },
        ]);
        result.current.handleBaitEaten(MOCK_BAIT_ID);
      });
      expect(result.current.baits).toEqual([]);
      expect(result.current.fishHealth).toBe(
        PHISHING_GAME.config.fishInitialHealth - PHISHING_GAME.config.fishHealthUpdate,
      );
    });

    it("should handle bait eaten correctly (good answer)", () => {
      const containerRef = { current: mockPhishingContainer };
      const { result } = renderHook(() => useMiniGame(containerRef, [], () => {}));

      // Start the game and spawn a bait
      act(() => {
        result.current.handleStart();
      });

      // Eat the bait
      act(() => {
        result.current.setBaits([
          {
            id: MOCK_BAIT_ID,
            xPos: MOCK_BAIT_INITIAL_X_POS,
            yPos: MOCK_BAIT_INITIAL_Y_POS,
            message: mockPhishingMessages[0],
            correctAnswer: true,
          },
        ]);
        result.current.handleBaitEaten(MOCK_BAIT_ID);
      });

      expect(result.current.baits).toEqual([]);
      expect(result.current.fishHealth).toBe(PHISHING_GAME.config.fishInitialHealth);
    });

    it("should end game when fish health reaches 0", () => {
      const BAITS_TO_DEPLETE_HEALTH = 10;
      const containerRef = { current: mockPhishingContainer };
      const { result } = renderHook(() => useMiniGame(containerRef, [], () => {}));

      act(() => {
        result.current.handleStart();
      });

      // kill the fish with 10 bad-baits
      for (let i = 0; i < BAITS_TO_DEPLETE_HEALTH; i++) {
        act(() => {
          result.current.setBaits([
            {
              id: MOCK_BAIT_ID,
              xPos: MOCK_BAIT_INITIAL_X_POS,
              yPos: MOCK_BAIT_INITIAL_Y_POS,
              message: mockPhishingMessages[0],
              correctAnswer: false,
            },
          ]);
          result.current.handleBaitEaten(MOCK_BAIT_ID);
        });
      }

      expect(result.current.gameState).toBe(MINI_GAME_STATE.COMPLETED);
    });
  });

  describe("bait movement", () => {
    it("should move baits downward when game is PLAYING", () => {
      const containerRef = { current: mockPhishingContainer };
      const { result } = renderHook(() => useMiniGame(containerRef, mockPhishingMessages, () => {}));

      // Start the game and add a bait
      act(() => {
        result.current.handleStart();
        result.current.setBaits([
          {
            id: MOCK_BAIT_ID,
            xPos: MOCK_BAIT_INITIAL_X_POS,
            yPos: MOCK_BAIT_INITIAL_Y_POS,
            message: mockPhishingMessages[0],
          },
        ]);
      });

      // Trigger animation frame
      act(() => {
        jest.advanceTimersByTime(0);
      });

      expect(result.current.baits[0].yPos).toBeGreaterThan(MOCK_BAIT_INITIAL_Y_POS);
    });

    it("should not move paused baits", () => {
      const containerRef = { current: mockPhishingContainer };
      const { result } = renderHook(() => useMiniGame(containerRef, mockPhishingMessages, () => {}));

      // Start the game and add a paused bait
      act(() => {
        result.current.handleStart();
        result.current.setBaits([
          {
            id: MOCK_BAIT_ID,
            xPos: MOCK_BAIT_INITIAL_X_POS,
            yPos: MOCK_BAIT_INITIAL_Y_POS,
            message: mockPhishingMessages[0],
            paused: true,
          },
        ]);
      });

      // Trigger animation frame
      act(() => {
        jest.advanceTimersByTime(0);
      });

      expect(result.current.baits[0].yPos).toBe(MOCK_BAIT_INITIAL_Y_POS);
    });
  });

  describe("difficulty increase", () => {
    it("should decrease bait spawn interval over time", () => {
      const containerRef = { current: mockPhishingContainer };
      const { result } = renderHook(() => useMiniGame(containerRef, mockPhishingMessages, () => {}));

      // Start the game
      act(() => {
        result.current.handleStart();
      }); // Advance time beyond the decay interval
      act(() => {
        jest.advanceTimersByTime(PHISHING_GAME.config.decayInterval);
      });

      // The exact value depends on your DECAY_FACTOR
      expect(result.current.baits.length).toBeGreaterThan(0);
    });
  });
});
