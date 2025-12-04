import { renderHook, act } from "@testing-library/react";
import { Bait } from "../../../components/scenes/phishing/MiniGame/logic/types";
import { useFish } from "../../../components/scenes/phishing/MiniGame/logic/useFish";
import { PHISHING_GAME } from "../../../constants/MiniGames/phishing";

jest.useFakeTimers();

describe("useFish Hook", () => {
  const mockOnEatBait = jest.fn();
  const [HIGH_THRESHOLD, MEDIUM_THRESHOLD, LOW_THRESHOLD, CRITICAL_THRESHOLD] =
    PHISHING_GAME.config.fishHealthColorThresholds;

  const createBait = (id: number, xPos: number, yPos: number): Bait => ({
    id,
    xPos,
    yPos,
    message: {
      type: "email",
      sender: "test@example.com",
      text: "Test message",
      isPhishing: false,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize fish coordinates correctly", () => {
    const { result } = renderHook(() => useFish([], 100, true, mockOnEatBait));

    expect(result.current.fishCoordinates.x).toBe(100);
    expect(result.current.fishCoordinates.y).toBe(window.innerHeight / 2);
  });

  it("should select a target bait on the same y-level", () => {
    const bait = createBait(1, 200, window.innerHeight / 2);
    const { result } = renderHook(() => useFish([bait], 100, true, mockOnEatBait));

    // Allow useEffect to run
    act(() => {
      jest.advanceTimersByTime(0);
    });

    // Since targetBait is internal, we can't access it directly.
    // However, we can infer its selection by checking if the fish starts moving.
    const initialX = result.current.fishCoordinates.x;

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.fishCoordinates.x).not.toBe(initialX);
  });

  it("should move fish towards the bait", () => {
    const bait = createBait(1, 200, window.innerHeight / 2);
    const { result } = renderHook(() => useFish([bait], 100, true, mockOnEatBait));

    const initialX = result.current.fishCoordinates.x;

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.fishCoordinates.x).toBeGreaterThan(initialX);
  });

  it("should call onEatBait when fish is close to bait", () => {
    const bait = createBait(1, 100, window.innerHeight / 2);

    renderHook(() => useFish([bait], 100, true, mockOnEatBait));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockOnEatBait).toHaveBeenCalledWith(1);
  });

  it("should return correct health color", () => {
    const { result: resultHigh } = renderHook(() =>
      useFish([], HIGH_THRESHOLD.min, true, mockOnEatBait),
    );
    expect(resultHigh.current.healthColor).toBe(HIGH_THRESHOLD.color);

    const { result: resultMedium } = renderHook(() =>
      useFish([], MEDIUM_THRESHOLD.min, true, mockOnEatBait),
    );
    expect(resultMedium.current.healthColor).toBe(MEDIUM_THRESHOLD.color);

    const { result: resultLow } = renderHook(() =>
      useFish([], LOW_THRESHOLD.min, true, mockOnEatBait),
    );
    expect(resultLow.current.healthColor).toBe(LOW_THRESHOLD.color);

    const { result: resultCritical } = renderHook(() =>
      useFish([], CRITICAL_THRESHOLD.min, true, mockOnEatBait),
    );
    expect(resultCritical.current.healthColor).toBe(CRITICAL_THRESHOLD.color);
  });
});
