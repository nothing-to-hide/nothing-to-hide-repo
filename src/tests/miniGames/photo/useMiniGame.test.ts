import { renderHook, act } from "@testing-library/react";
import {
  useMiniGame,
  finalMessageId,
  FeedbackId,
} from "../../../components/scenes/photos/MiniGame/logic/useMiniGame";

jest.mock("../../../context/GameStateContext", () => ({
  useGameState: () => ({
    gameState: "INTRO",
    setGameState: jest.fn(),
  }),
}));

describe("useMiniGame Hook", () => {
  const mockImages = [
    { src: "a", canPost: true },
    { src: "b", canPost: false },
  ];

  let result: any;

  beforeEach(() => {
    const hook = renderHook(() => useMiniGame(mockImages, () => {}));
    result = hook.result;
  });

  it("returns correct FinalMessageId for different scores", () => {
    expect(result.current.getFinalMessageId(0)).toBe(finalMessageId.Insufficient);
    expect(result.current.getFinalMessageId(4)).toBe(finalMessageId.Insufficient);
    expect(result.current.getFinalMessageId(5)).toBe(finalMessageId.MinimumReached);
    expect(result.current.getFinalMessageId(7)).toBe(finalMessageId.MinimumReached);
    expect(result.current.getFinalMessageId(9)).toBe(finalMessageId.MinimumReached);
    expect(result.current.getFinalMessageId(10)).toBe(finalMessageId.AllCorrect);
  });

  it("sets feedback ShouldNotPost when wrong choice with shouldPost=true", () => {
    act(() => {
      result.current.handleChoice(true);
    });

    act(() => {
      result.current.handleChoice(true);
    });
    expect(result.current.feedback).toBe(FeedbackId.ShouldNotPost);
  });

  it("sets feedback CouldPost when wrong choice with shouldPost=false", () => {
    act(() => {
      result.current.handleChoice(false);
    });

    expect(result.current.feedback).toBe(FeedbackId.CouldPost);
  });

  it("increments score for correct choice", () => {
    act(() => {
      result.current.handleChoice(true);
    });

    expect(result.current.score).toBe(1);
  });
});