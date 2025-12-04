import { renderHook, waitFor } from "@testing-library/react";
import { MINI_GAME_STATE } from "../../../constants/Game";
import { AudioManager } from "../../../utils/managers/AudioManager";
import { ImageManager } from "../../../utils/managers/ImageManager";
import { useMiniGame } from "../../../components/scenes/socialMedia/MiniGame/logic/useMiniGame";
import { useGameState } from "../../../context/GameStateContext";
import { act } from "react";

// Mocks
jest.mock("../../../context/GameStateContext");
jest.mock("../../../utils/managers/AudioManager");
jest.mock("../../../utils/managers/ImageManager");
jest.mock("../../../components/scenes/socialMedia/MiniGame/logic/data", () => ({
  OBJECT_SEARCHES: [
    { hiddenObjects: Array(3).fill({ src: "a" }) },
    { hiddenObjects: Array(5).fill({ src: "b" }) },
  ],
  getPreparedObjectSearch: jest.fn((i: number) => ({
    id: i,
    hiddenObjects: Array(i === 0 ? 3 : 5)
      .fill(null)
      .map((_, idx) => ({ src: `${i}-${idx}` })),
  })),
}));


describe("useMiniGame (Social Media)", () => {
  let mockOnComplete: jest.Mock;
  let updateGameStateMock: jest.Mock;
  let playMock: jest.Mock;
  let loopMock: jest.Mock;
  let stopMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockOnComplete = jest.fn();
    updateGameStateMock = jest.fn();

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

    (ImageManager.getInstance as jest.Mock).mockReturnValue({
      preloadImages: jest.fn().mockResolvedValue(undefined),
    });
  });

  it("starts in INTRO state and transitions to INTRO after asset preload", async () => {
    const { result } = renderHook(() => useMiniGame(mockOnComplete));

    await waitFor(() => {
      expect(result.current.gameState).toBe(MINI_GAME_STATE.INTRO);
    });
  });

  it("transitions to TUTORIAL when handleIntroDone is called", () => {
    const { result } = renderHook(() => useMiniGame(mockOnComplete));

    act(() => {
      result.current.handleIntroDone();
    });

    expect(result.current.gameState).toBe(MINI_GAME_STATE.TUTORIAL);
  });

  it("starts the game and calls audio loop on handleStartGame", () => {
    const { result } = renderHook(() => useMiniGame(mockOnComplete));

    act(() => {
      result.current.handleStartGame();
    });

    expect(loopMock).toHaveBeenCalledWith(expect.any(String)); // theme sound key
    expect(result.current.gameState).toBe(MINI_GAME_STATE.PLAYING);
  });

  it("calculates score, updates game state, and calls onComplete", () => {
    const updateGameStateMock = jest.fn();

    (useGameState as jest.Mock).mockReturnValue({
      gameState: { points: 0 },
      updateGameState: updateGameStateMock,
    });

    const { result } = renderHook(() => useMiniGame(mockOnComplete));

    act(() => {
      result.current.handleObjectSearchDone(5);
    });

    act(() => {
      result.current.handleFinishGame();
    });

    expect(updateGameStateMock).toHaveBeenCalledWith({ points: 3 });
    expect(mockOnComplete).toHaveBeenCalled();
  });


  it("handles zero score without errors and calls onComplete", () => {
    const initialPoints = 1;
    const expectedFinalPoints = 1;

    (useGameState as jest.Mock).mockReturnValue({
      gameState: { points: initialPoints },
      updateGameState: updateGameStateMock,
    });
    const { result } = renderHook(() => useMiniGame(mockOnComplete));

    act(() => {
      result.current.handleFinishGame();
    });

    // zero score means no additional points
    expect(updateGameStateMock).toHaveBeenCalledWith({ points: expectedFinalPoints });
    expect(mockOnComplete).toHaveBeenCalled();
  });
});
