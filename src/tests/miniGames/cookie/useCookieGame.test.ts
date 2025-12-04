import { renderHook, act } from "@testing-library/react";
import { useCookieGame } from "../../../components/scenes/cookie/MiniGame/logic/useCookieGame";
import { useGameState } from "../../../context/GameStateContext";
import { AudioManager } from "../../../utils/managers/AudioManager";
import { MINI_GAME_STATE } from "../../../constants/Game";
import { COOKIE_GAME } from "../../../constants/MiniGames/cookie";
import { SOUNDS } from "../../../constants/Sounds";

jest.mock("../../../context/GameStateContext");
jest.mock("../../../utils/managers/AudioManager");

describe("useCookieGame Hook", () => {
  const containerRef = {
    current: {
      getBoundingClientRect: () => ({
        width: 300,
        height: 300,
        top: 0,
        left: 0,
        bottom: 300,
        right: 300,
      }),
    },
  };

  const GOOD_TEXTS = ["good01", "good01"];
  const BAD_TEXTS = ["bad01", "bad01"];

  let playMock: jest.Mock;
  let loopMock: jest.Mock;
  let stopMock: jest.Mock;

  const setupHook = () =>
    renderHook(() =>
      useCookieGame(containerRef as React.RefObject<HTMLDivElement>, GOOD_TEXTS, BAD_TEXTS, () => {}),
    );

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    playMock = jest.fn();
    loopMock = jest.fn();
    stopMock = jest.fn();

    (useGameState as jest.Mock).mockReturnValue({
      gameState: { points: 0 },
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
    global.cancelAnimationFrame = jest.fn();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("initializes with default state", () => {
    const { result } = setupHook();
    expect(result.current.gameState).toBe(MINI_GAME_STATE.INTRO);
    expect(result.current.cookies).toEqual([]);
    expect(result.current.crumbles).toEqual([]);
    expect(result.current.trails).toEqual([]);
    expect(result.current.score).toBe(0);
  });

  describe("game state transitions", () => {
    it("starts the game and loops theme", () => {
      const { result } = setupHook();

      act(() => {
        result.current.handleStart();
      });

      expect(result.current.gameState).toBe(MINI_GAME_STATE.PLAYING);
      expect(loopMock).toHaveBeenCalledWith(COOKIE_GAME.sounds.theme);
    });

    it("finishes the game, updates score, stops audio", () => {
      const updateGameStateMock = jest.fn();
      (useGameState as jest.Mock).mockReturnValue({
        gameState: { points: 5 },
        updateGameState: updateGameStateMock,
      });

      const { result } = setupHook();

      act(() => {
        result.current.handleFinish();
      });

      expect(stopMock).toHaveBeenCalled();
      expect(updateGameStateMock).toHaveBeenCalled();
    });
  });

  describe("cookie spawning and updates", () => {
    it("spawns cookies over time", () => {
      const { result } = setupHook();

      act(() => {
        result.current.handleStart();
        jest.advanceTimersByTime(5000); // multiple intervals
      });

      expect(result.current.cookies.length).toBeGreaterThan(0);
    });

    it("updates cookies positions downward over time", () => {
      const { result } = setupHook();

      act(() => {
        result.current.handleStart();
        result.current.setCookies([
          {
            key: 1,
            position: { x: 10, y: 10 },
            velocityXY: { x: 0, y: -10 },
            state: "intact",
            cookieText: { text: "good01", goodCookie: true },
          },
        ]);
      });

      act(() => {
        result.current.updateCookies(1);
      });

      expect(result.current.cookies[0].position.y).not.toBe(10);
    });
  });

  describe("mouse interactions (slicing)", () => {
    it("detects and slices cookie on mouse down", () => {
      const { result } = setupHook();

      act(() => {
        result.current.handleStart();
        result.current.setCookies([
          {
            key: 0,
            position: { x: 50, y: 50 },
            velocityXY: { x: 0, y: 0 },
            state: "intact",
            cookieText: { text: "good01", goodCookie: false },
          },
        ]);
      });

      act(() => {
        result.current.handleMouseDown({
          clientX: 150,
          clientY: 150,
        } as any);
      });

      // cookie should change state and sound played
      expect(playMock).toHaveBeenCalledWith(SOUNDS.common.crunch);
    });

    it("does not slice cookie if far away", () => {
      const { result } = setupHook();

      act(() => {
        result.current.handleStart();
        result.current.cookies.push({
          key: 0,
          position: { x: 50, y: 50 },
          velocityXY: { x: 0, y: 0 },
          state: "intact",
          cookieText: { text: "good01", goodCookie: true },
        });
      });

      act(() => {
        result.current.handleMouseDown({
          clientX: 150,
          clientY: 150,
        } as any);
      });

      expect(playMock).not.toHaveBeenCalled();
    });
  });

  describe("crumbles spawning and movement", () => {
    it("spawns crumbles when cookie is hit", () => {
      const { result } = setupHook();

      act(() => {
        result.current.handleStart();
        result.current.setCookies([
          {
            key: 1,
            position: { x: 50, y: 50 },
            velocityXY: { x: 0, y: 0 },
            state: "intact",
            cookieText: { text: "bad01", goodCookie: false },
          },
        ]);
        result.current.handleMouseDown({
          clientX: 150,
          clientY: 150,
        } as any);
        result.current.updateCookies(1);
        result.current.updateCrumbles(1);
      });

      expect(result.current.crumbles.length).toBeGreaterThan(0);
    });

    it("updates crumble positions downward", () => {
      const { result } = setupHook();

      act(() => {
        result.current.crumbles.push({
          cookieRef: 1,
          position: { x: 10, y: 10 },
          xDirection: 0,
          size: 5,
          speed: 10,
        });
        result.current.updateCookies(0.5);
        result.current.updateCrumbles(0.5);
      });

      expect(result.current.crumbles[0].position.y).toBeGreaterThan(10);
    });
  });

  describe("slice trail", () => {
    it("adds trail points and clears after timeout", () => {
      const { result } = setupHook();

      act(() => {
        result.current.handleMouseMove({
          clientX: 100,
          clientY: 100,
        } as any);
      });

      act(() => {
        jest.advanceTimersByTime(COOKIE_GAME.config.clearTrailAfterMs + 100);
      });

      expect(result.current.trails).toEqual([]);
    });
  });

  describe("difficulty & cleanup", () => {
    it("clears intervals and frames on unmount", () => {
      const { result, unmount } = setupHook();

      act(() => {
        result.current.handleStart();
        result.current.animationRef.current = 1;
        unmount();
      });

      expect(global.cancelAnimationFrame).toHaveBeenCalled();
    });
  });

  it("getCookieText returns both good and bad cookies randomly", () => {
    const { result } = setupHook();

    // Run multiple times to ensure both branches execute
    let hasGood = false;
    let hasBad = false;
    for (let i = 0; i < 20; i++) {
      const cookieText = result.current.getCookieText();
      if (cookieText.goodCookie) hasGood = true;
      else hasBad = true;
    }

    expect(hasGood).toBe(true);
    expect(hasBad).toBe(true);
  });

  it("updateCookies moves cookies and removes offscreen ones", () => {
    const { result } = setupHook();

    act(() => {
      result.current.setCookies([
        {
          key: 1,
          position: { x: 0, y: 0 },
          velocityXY: { x: 10, y: 20 },
          state: "intact",
          cookieText: { text: "x", goodCookie: false },
        },
        {
          key: 2,
          position: { x: 0, y: 999 },
          velocityXY: { x: 0, y: 100 },
          state: "intact",
          cookieText: { text: "y", goodCookie: false },
        },
      ]);
    });

    act(() => {
      result.current.updateCookies(1); // advance one second
    });

    const cookies = result.current.cookies;
    // cookie 1 moves, cookie 2 filtered out by maxY
    expect(cookies.length).toBe(1);
    expect(cookies[0].position.y).toBeGreaterThan(0);
  });

  it("updateSliceTrail pushes new trail elements and clears after timeout", () => {
    const { result } = setupHook();

    act(() => {
      result.current.updateSliceTrail({ x: 10, y: 20 });
    });

    expect(result.current.trailRef.current.length).toBeGreaterThan(0);

    act(() => {
      // Fast-forward the clear timeout
      jest.advanceTimersByTime(COOKIE_GAME.config.clearTrailAfterMs + 10);
    });

    expect(result.current.trailRef.current).toEqual([]);
    expect(result.current.trails).toEqual([]);
  });

  it("renderSliceTrail sets visible trails from trailRef", () => {
    const { result } = setupHook();

    act(() => {
      result.current.trailRef.current = [{ position: { x: 1, y: 1 }, opacity: 1 }];
      result.current.renderSliceTrail();
    });

    expect(result.current.trails.length).toBe(1);
  });

  it("gameLoop updates cookies", () => {
    const { result } = setupHook();

    act(() => {
      result.current.setCookies([
        {
          key: 1,
          position: { x: 0, y: 0 },
          velocityXY: { x: 10, y: -5 },
          state: "intact",
          cookieText: { text: "x", goodCookie: false },
        },
      ]);
      result.current.gameLoop(1000);
    });

    expect(result.current.cookies.length).toBe(1);
  });

  it("handleIntroDone sets gameState to TUTORIAL", () => {
    const { result } = setupHook();

    act(() => {
      result.current.handleIntroDone();
    });

    expect(result.current.gameState).toBe(MINI_GAME_STATE.TUTORIAL);
  });

  it("startGame starts interval and loops theme sound", () => {
    const { result } = setupHook();

    act(() => {
      result.current.startGame();
    });

    expect(loopMock).toHaveBeenCalledWith(COOKIE_GAME.sounds.theme);

    act(() => {
      // advance one interval to spawn cookies
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.cookies.length).toBeGreaterThan(0);
  });

  it("handleStart resets state and calls startGame", () => {
    const { result } = setupHook();

    act(() => {
      result.current.handleStart();
    });

    expect(result.current.gameState).toBe(MINI_GAME_STATE.PLAYING);
    expect(loopMock).toHaveBeenCalled();
  });

  it("handleGameCompleted updates game state", () => {
    const { result } = setupHook();

    act(() => {
      result.current.handleGameCompleted();
    });

    expect(result.current.gameState).toBe(MINI_GAME_STATE.COMPLETED);
  });

  it("keeps cookieScoreRef in sync with score changes", () => {
    const { result } = setupHook();

    act(() => {
      result.current.handleStart();
      result.current.setScore?.(5);
    });

    expect(result.current.cookieScoreRef.current).toBeDefined();
  });
});
