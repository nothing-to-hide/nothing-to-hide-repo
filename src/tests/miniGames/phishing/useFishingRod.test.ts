import { renderHook, act } from "@testing-library/react";
import { FishingRodProps } from "../../../components/scenes/phishing/MiniGame/components/FishingRod";
import { PhishingMessage, Bait } from "../../../components/scenes/phishing/MiniGame/logic/types";
import { useFishingRod } from "../../../components/scenes/phishing/MiniGame/logic/useFishingRod";
import { PHISHING_GAME } from "../../../constants/MiniGames/phishing";
import { SOUNDS } from "../../../constants/Sounds";

// Mock AudioManager
const playMock = jest.fn();
jest.mock("../../../utils/managers/AudioManager", () => ({
  AudioManager: {
    getInstance: () => ({
      play: playMock,
    }),
  },
}));

describe("useFishingRod", () => {
  const phishingMessage: PhishingMessage = {
    type: "email",
    sender: "scammer@example.com",
    text: "Click here to claim your prize!",
    isPhishing: true,
  };

  const bait: Bait = {
    id: 1,
    xPos: 100,
    yPos: 100,
    message: phishingMessage,
  };

  const createProps = (overrides: Partial<FishingRodProps> = {}): FishingRodProps => ({
    bait,
    diverCoordinates: { x: 0, y: 0 },
    onBaitPaused: jest.fn(),
    onBaitAnswered: jest.fn(),
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const props = createProps();
    const { result } = renderHook(() => useFishingRod(props));

    expect(result.current.showMessage).toBe(false);
    expect(result.current.phishingImage).toBe(PHISHING_GAME.images.bait.envelop);
  });

  it("should trigger message when diver is near the bait", () => {
    const onBaitPaused = jest.fn();
    const props = createProps({
      diverCoordinates: { x: 105, y: 100 },
      onBaitPaused,
    });

    const { result, rerender } = renderHook(() => useFishingRod(props));
    rerender(); // needed to apply useEffect

    expect(onBaitPaused).toHaveBeenCalledWith(1, true);
    expect(result.current.showMessage).toBe(true);
  });

  it("should handle correct answer (user says phishing)", () => {
    const onBaitPaused = jest.fn();
    const onBaitAnswered = jest.fn();
    const props = createProps({
      diverCoordinates: { x: 100, y: 100 },
      onBaitPaused,
      onBaitAnswered,
    });

    const { result } = renderHook(() => useFishingRod(props));

    act(() => {
      result.current.handleRevealMessage(true); // user says it's phishing
    });

    expect(playMock).toHaveBeenCalledWith(SOUNDS.common.click);
    expect(result.current.phishingImage).toBe(PHISHING_GAME.images.bait.good);
    expect(result.current.showMessage).toBe(false);
    expect(onBaitPaused).toHaveBeenCalledWith(1, false);
    expect(onBaitAnswered).toHaveBeenCalledWith(1, true);
  });

  it("should handle wrong answer (user says not phishing)", () => {
    const onBaitPaused = jest.fn();
    const onBaitAnswered = jest.fn();
    const props = createProps({
      diverCoordinates: { x: 100, y: 100 },
      onBaitPaused,
      onBaitAnswered,
    });

    const { result } = renderHook(() => useFishingRod(props));

    act(() => {
      result.current.handleRevealMessage(false); // user says it's not phishing
    });

    expect(playMock).toHaveBeenCalledWith(SOUNDS.common.falseClick);
    expect(result.current.phishingImage).toBe(PHISHING_GAME.images.bait.bad);
    expect(result.current.showMessage).toBe(false);
    expect(onBaitPaused).toHaveBeenCalledWith(1, false);
    expect(onBaitAnswered).toHaveBeenCalledWith(1, false);
  });
});
