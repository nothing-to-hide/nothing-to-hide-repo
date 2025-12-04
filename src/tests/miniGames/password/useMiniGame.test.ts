import { renderHook, act } from "@testing-library/react";
import { useMiniGame } from "../../../components/scenes/password/MiniGame/logic/useMiniGame";
import { MINI_GAME_STATE } from "../../../constants/Game";
import { AudioManager } from "../../../utils/managers/AudioManager";
import { useGameState } from "../../../context/GameStateContext";
import { PASSWORD_GAME } from "../../../constants/MiniGames/password";
import { RefObject } from "react";
import { FallingPassword } from "../../../components/scenes/password/MiniGame/logic/types";
import { SOUNDS } from "../../../constants/Sounds";

// Mocks
jest.mock("../../../context/GameStateContext");
jest.mock("../../../utils/managers/AudioManager");

describe("useMiniGame Hook", () => {
  const containerRef = {
    current: {
      clientWidth: 300,
      getBoundingClientRect: () => ({
        width: 300,
        top: 0,
        bottom: 300,
        left: 0,
        right: 0,
      }),
    },
  };
  let playMock: jest.Mock;
  let loopMock: jest.Mock;
  let stopMock: jest.Mock;

  const setupHook = () =>
    renderHook(() => useMiniGame("Mock Player Name", containerRef as RefObject<HTMLDivElement>, () => {}));

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    playMock = jest.fn();
    loopMock = jest.fn();
    stopMock = jest.fn();

    (useGameState as jest.Mock).mockReturnValue({
      gameState: {},
      updateGameState: jest.fn(),
    });

    (AudioManager.getInstance as jest.Mock).mockReturnValue({
      play: playMock,
      loop: loopMock,
      stop: stopMock,
    });

    global.requestAnimationFrame = (cb) => {
      setTimeout(() => cb(0), 0);
      return 0;
    };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("initializes with correct default values", () => {
    const { result } = setupHook();
    expect(result.current.gameState).toBe(MINI_GAME_STATE.INTRO);
    expect(result.current.fallingWords).toEqual([]);
    expect(result.current.score).toBe(0);
  });

  describe("game state transitions", () => {
    it("starts game and plays theme", () => {
      const { result } = setupHook();
      act(() => result.current.handleStart());

      expect(result.current.gameState).toBe(MINI_GAME_STATE.PLAYING);
      expect(loopMock).toHaveBeenCalledWith(PASSWORD_GAME.sounds.theme);
    });

    it("completes game and change game state", () => {
      const { result } = setupHook();
      act(() => result.current.handleGameCompleted());

      expect(result.current.gameState).toBe(MINI_GAME_STATE.COMPLETED);
    });
  });

  describe("word spawning & removal", () => {
    it("spawns new words over time", () => {
      const SPAWN_ITERATIONS = 3;
      const { result } = setupHook();
      act(() => {
        result.current.handleStart();
        jest.advanceTimersByTime(PASSWORD_GAME.config.gameInterval * SPAWN_ITERATIONS);
      });

      expect(result.current.fallingWords.length).toBeGreaterThanOrEqual(SPAWN_ITERATIONS);
    });

    it("removes word when it hits bottom", () => {
      const { result } = setupHook();
      act(() => result.current.handleStart());

      // Simuliere ein Word am Boden
      act(() => {
        const word = result.current.fallingWords[0];
        if (word) {
          word.ref.current = {
            getBoundingClientRect: () => ({
              top: 490,
              bottom: 510, // über Container-Bottom 500
              left: 100,
              right: 150,
            }),
          } as HTMLDivElement;
        }
      });

      act(() => result.current.updateWords());

      expect(result.current.fallingWords.length).toBe(0);
    });

    it("does not play sound when word hits bottom", () => {
      const NUMBER_OF_PIXELS_BELOW_BOTTOM = 10;
      const { result } = setupHook();
      act(() => {
        result.current.fallingWords.push({
          ref: {
            current: {
              getBoundingClientRect: () => ({
                bottom:
                  containerRef.current.getBoundingClientRect().bottom +
                  NUMBER_OF_PIXELS_BELOW_BOTTOM,
              }),
            },
          },
        } as FallingPassword);
        result.current.updateWords();
      });

      expect(playMock).not.toHaveBeenCalled();
    });
  });

  describe("word collision with sawBlade", () => {
    const MOCK_SAW_BLADE_RECT = { top: 90, bottom: 110, left: 40, right: 120 };
    const MOCK_WORD_ID = 999;
    const WORD_RECT_OVERLAPPING = { top: 95, bottom: 105, left: 60, right: 100 };
    const WORD_RECT_NON_OVERLAPPING = { top: 50, bottom: 60, left: 60, right: 100 };

    const createWord = (overlap: boolean, valid: boolean): FallingPassword => ({
      id: MOCK_WORD_ID,
      value: "password",
      valid,
      x: 50,
      y: 0,
      speed: 1,
      ref: {
        current: {
          getBoundingClientRect: () =>
            overlap ? WORD_RECT_OVERLAPPING : WORD_RECT_NON_OVERLAPPING,
        },
      } as RefObject<any>,
    });

    it("removes invalid word on hit and increases score", () => {
      const { result } = setupHook();

      act(() => {
        (result.current.sawBladeRef as any).current = {
          getBoundingClientRect: () => MOCK_SAW_BLADE_RECT,
        };
        result.current.fallingWords.push(createWord(true, false));
        result.current.updateWords();
      });

      expect(result.current.fallingWords).toHaveLength(0);
      expect(result.current.score).toBe(1);
      expect(AudioManager.getInstance().play).toHaveBeenCalledWith(SOUNDS.common.correctClick);
    });

    it("removes valid word on hit and decreases score but not below zero", () => {
      const { result } = setupHook();

      act(() => {
        (result.current.sawBladeRef as any).current = {
          getBoundingClientRect: () => MOCK_SAW_BLADE_RECT,
        };
        result.current.fallingWords.push(createWord(true, true));
        result.current.updateWords();
      });

      expect(result.current.fallingWords).toHaveLength(0);
      expect(result.current.score).toBe(0); // score cannot be negative
      expect(AudioManager.getInstance().play).toHaveBeenCalledWith(SOUNDS.common.falseClick);
    });

    it("does not re-score already hit word", () => {
      const { result } = setupHook();

      const word = createWord(true, false);

      act(() => {
        (result.current.sawBladeRef as any).current = {
          getBoundingClientRect: () => MOCK_SAW_BLADE_RECT,
        };
        // hit once
        result.current.fallingWords.push(word);
        result.current.updateWords();
        // hit twice
        result.current.fallingWords.push(word);
        result.current.updateWords();
      });

      expect(AudioManager.getInstance().play).toHaveBeenCalledTimes(1);
      expect(result.current.score).toBe(1);
    });

    it("keeps word if it does not intersect saw", () => {
      const { result } = setupHook();

      act(() => {
        (result.current.sawBladeRef as any).current = {
          getBoundingClientRect: () => MOCK_SAW_BLADE_RECT,
        };
        result.current.fallingWords.push(createWord(false, false)); // no overlap
        result.current.updateWords();
      });

      expect(result.current.fallingWords).toHaveLength(1);
      expect(result.current.score).toBe(0);
      expect(AudioManager.getInstance().play).not.toHaveBeenCalled();
    });
  });

  describe("difficulty increase", () => {
    it("increases game speed over time without exceeding max speed", () => {
      const { result } = setupHook();

      act(() => {
        result.current.handleStart();
      });

      let previousSpeed = result.current.gameSpeed;

      for (let i = 0; i < 5; i++) {
        act(() => {
          jest.advanceTimersByTime(PASSWORD_GAME.config.gameInterval);
        });
        // the game speed updates continuously
        const currentSpeed = result.current.gameSpeed;
        expect(currentSpeed).toBeGreaterThanOrEqual(previousSpeed);
        expect(currentSpeed).toBeLessThanOrEqual(PASSWORD_GAME.config.wordMaxSpeed);
        previousSpeed = currentSpeed;
      }
    });
  });
});
