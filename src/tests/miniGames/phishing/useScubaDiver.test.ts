import { renderHook, act } from "@testing-library/react";
import { useScubaDiver } from "../../../components/scenes/phishing/MiniGame/logic/useScubaDiver";

const INITIAL_COORDINATES = { x: 100, y: 100 };
const MOUSE_CLICK_COORDINATES = { x: 400, y: 300 };

beforeEach(() => {
  jest.useFakeTimers();
});

const mockContainer = document.createElement("div");
mockContainer.getBoundingClientRect = () => ({
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

it("initializes with correct defaults", () => {
  const ref = { current: mockContainer };
  const { result } = renderHook(() => useScubaDiver(ref, false));

  expect(result.current.coordinates).toEqual(INITIAL_COORDINATES);
  expect(result.current.direction).toBe("right");
  expect(result.current.action).toBe("idle");
});

it("sets action to 'swimming' on ArrowRight keydown and back to 'idle' on keyup", () => {
  const ref = { current: mockContainer };
  const { result } = renderHook(() => useScubaDiver(ref, true));

  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
  });
  expect(result.current.action).toBe("swimming");

  act(() => {
    window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
  });
  expect(result.current.action).toBe("idle");
});

it("moves diver to the right using ArrowRight", () => {
  const ref = { current: mockContainer };
  const { result } = renderHook(() => useScubaDiver(ref, true));

  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    jest.advanceTimersByTime(60);
  });

  expect(result.current.coordinates.x).toBeGreaterThan(INITIAL_COORDINATES.x);
  expect(result.current.direction).toBe("right");
});

it("moves diver toward mouse click", () => {
  const ref = { current: mockContainer };
  const { result } = renderHook(() => useScubaDiver(ref, true));

  act(() => {
    ref.current?.dispatchEvent(
      new MouseEvent("mousedown", {
        bubbles: true,
        clientX: MOUSE_CLICK_COORDINATES.x,
        clientY: MOUSE_CLICK_COORDINATES.y,
      }),
    );
    jest.advanceTimersByTime(100);
  });

  expect(result.current.coordinates.x).toBeGreaterThan(INITIAL_COORDINATES.x);
  expect(result.current.action).toBe("swimming");

  act(() => {
    window.dispatchEvent(new MouseEvent("mouseup"));
  });

  expect(result.current.action).toBe("idle");
});

it("does not respond to events if isActive is false", () => {
  const ref = { current: mockContainer };
  const { result } = renderHook(() => useScubaDiver(ref, false));

  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    jest.advanceTimersByTime(100);
  });

  expect(result.current.coordinates.x).toBe(INITIAL_COORDINATES.x);
  expect(result.current.action).toBe("idle");
});
