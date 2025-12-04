import { renderHook, act } from "@testing-library/react";
import { createRef, RefObject } from "react";
import { useSawBlade } from "../../../components/scenes/password/MiniGame/logic/useSawBlade";

jest.useFakeTimers();

const createMockElement = (width: number, left = 0): HTMLDivElement =>
  ({
    clientWidth: width,
    getBoundingClientRect: () => ({ left } as DOMRect),
    style: { left: "0px" },
  } as unknown as HTMLDivElement);

describe("useSawBlade", () => {
  const MOCK_CONTAINER_WIDTH_PX = 300;
  const MOCK_SAW_BLADE_WIDTH_PX = 100;
  const FRAME_TIME_MS = 16; // Approx. time for one frame at 60 FPS
  const BOUNDARY_TEST_DURATION_MS = 2000;

  let container: HTMLDivElement;
  let sawBlade: HTMLDivElement;
  let containerRef: RefObject<HTMLDivElement | null>;
  let sawBladeRef: RefObject<HTMLDivElement | null>;

  beforeEach(() => {
    container = createMockElement(MOCK_CONTAINER_WIDTH_PX);
    sawBlade = createMockElement(MOCK_SAW_BLADE_WIDTH_PX);
    (containerRef = createRef()).current = container;
    (sawBladeRef = createRef()).current = sawBlade;
  });

  const triggerKey = (key: string) =>
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key }));
      jest.advanceTimersByTime(FRAME_TIME_MS);
    });

  const triggerKeyUp = (key: string) =>
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keyup", { key }));
      jest.advanceTimersByTime(FRAME_TIME_MS);
    });

  it("centers saw blade initially", () => {
    const { result } = renderHook(() => useSawBlade(containerRef, sawBladeRef));
    expect(result.current.xPos).toBe(100); // (300 - 100) / 2
  });

  it("follows mouse movement right", () => {
    renderHook(() => useSawBlade(containerRef, sawBladeRef));
    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 150 }));
    });
    expect(sawBladeRef.current!.style.left).toBe("100px");
  });

  it("follows mouse movement left", () => {
    renderHook(() => useSawBlade(containerRef, sawBladeRef));
    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 100 }));
    });
    expect(sawBladeRef.current!.style.left).toBe("50px");
  });

  it("follows touch movement right", () => {
    renderHook(() => useSawBlade(containerRef, sawBladeRef));
    act(() => {
      window.dispatchEvent(
        new TouchEvent("touchmove", {
          touches: [{ clientX: 250 }] as any,
        }),
      );
    });
    expect(sawBladeRef.current!.style.left).toBe("200px");
  });

  it("follows touch movement left", () => {
    renderHook(() => useSawBlade(containerRef, sawBladeRef));
    act(() => {
      window.dispatchEvent(
        new TouchEvent("touchmove", {
          touches: [{ clientX: 200 }] as any,
        }),
      );
    });
    expect(sawBladeRef.current!.style.left).toBe("150px");
  });

  it("moves left on ArrowLeft", () => {
    const { result } = renderHook(() => useSawBlade(containerRef, sawBladeRef));
    triggerKey("ArrowLeft");
    expect(result.current.xPos).toBe(80);
  });

  it("moves right on ArrowRight", () => {
    const { result } = renderHook(() => useSawBlade(containerRef, sawBladeRef));
    triggerKey("ArrowRight");
    expect(result.current.xPos).toBe(120);
  });

  it("moves right on 'd'", () => {
    const { result } = renderHook(() => useSawBlade(containerRef, sawBladeRef));
    triggerKey("d");
    expect(result.current.xPos).toBe(120);
  });

  it("moves left on 'a'", () => {
    const { result } = renderHook(() => useSawBlade(containerRef, sawBladeRef));
    triggerKey("a");
    expect(result.current.xPos).toBe(80);
  });

  it("stops moving after keyup", () => {
    const { result } = renderHook(() => useSawBlade(containerRef, sawBladeRef));
    triggerKey("ArrowRight");
    expect(result.current.xPos).toBe(120);

    triggerKeyUp("ArrowRight");
    expect(result.current.xPos).toBe(120); // still 120 – no further movement
  });

  it("clamps position within container boundaries", () => {
    const { result } = renderHook(() => useSawBlade(containerRef, sawBladeRef));

    // Simulate key press long enough to move beyond the left boundary
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
      jest.advanceTimersByTime(BOUNDARY_TEST_DURATION_MS);
    });
    expect(result.current.xPos).toBe(0); // Should not go below 0

    // Simulate key press long enough to move beyond the right boundary
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
      jest.advanceTimersByTime(BOUNDARY_TEST_DURATION_MS);
    });
    const maxX = container.clientWidth - sawBlade.clientWidth;
    expect(result.current.xPos).toBe(maxX); // Should not exceed right edge
  });
});
