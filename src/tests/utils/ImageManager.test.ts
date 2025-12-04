import * as Assets from "../../utils/Assets";
import { ImageManager } from "../../utils/managers/ImageManager";

describe("ImageManager Singleton", () => {
  let originalImage: typeof global.Image;

  beforeAll(() => {
    originalImage = global.Image;

    // Mock the global Image class to control loading behavior
    global.Image = class {
      private _src = "";
      public onload: () => void = () => {};
      public onerror: (err: Error) => void = () => {};

      set src(value: string) {
        // Simulate async loading
        this._src = value;

        setTimeout(() => {
          if (value.includes("fail")) {
            this.onerror(new Error("Failed to load"));
          } else {
            this.onload();
          }
        }, 0);
      }

      get src() {
        return this._src;
      }
    } as any;
  });

  afterAll(() => {
    // Restore original Image class
    global.Image = originalImage;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore – Reset Singleton
    ImageManager.instance = undefined;
  });

  test("returns singleton instance", () => {
    // Verify the singleton pattern
    const a = ImageManager.getInstance();
    const b = ImageManager.getInstance();
    expect(a).toBe(b);
  });

  // Test preloading of multiple images
  test("preloads images from extracted paths", async () => {
    const paths = ["img1.png", "img2.png"];
    jest.spyOn(Assets, "extractPaths").mockReturnValue(paths);

    const instance = ImageManager.getInstance();
    await instance.preloadImages({ foo: "img1.png", bar: "img2.png" });

    expect([...instance["imageCache"].keys()]).toEqual(paths);
  });

  // Test caching mechanism
  test("caches already loaded images", async () => {
    jest.spyOn(Assets, "extractPaths").mockReturnValue(["img1.png"]);
    const instance = ImageManager.getInstance();

    await instance.preloadImages("img1.png");

    const cacheSizeBefore = instance["imageCache"].size;
    await instance.preloadImages("img1.png");
    const cacheSizeAfter = instance["imageCache"].size;

    expect(cacheSizeBefore).toBe(cacheSizeAfter);
  });

  // Test that promises are reused for concurrent requests for the same image
  test("reuses loading promises for same image", async () => {
    jest.spyOn(Assets, "extractPaths").mockReturnValue(["shared.png"]);
    const instance = ImageManager.getInstance();

    const p1 = instance["preloadImage"]("shared.png");
    const p2 = instance["preloadImage"]("shared.png");

    expect(p1).toBe(p2);
  });

  // Test error handling during image loading - now uses Promise.allSettled
  test("handles image loading error gracefully with Promise.allSettled", async () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    jest.spyOn(Assets, "extractPaths").mockReturnValue(["fail.png", "success.png"]);
    const instance = ImageManager.getInstance();

    // Should not throw, even with failed image
    await expect(instance.preloadImages(["fail.png", "success.png"])).resolves.toBeUndefined();
    
    // Failed image should not be cached
    expect(instance["imageCache"].has("fail.png")).toBe(false);
    
    // Successful image should be cached
    expect(instance["imageCache"].has("success.png")).toBe(true);
    
    // Should log warning about failures
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Failed to load 1 of 2 images"));
    
    consoleSpy.mockRestore();
  });

  // Test timeout behavior
  test("handles image loading timeout", async () => {
    // Temporarily restore original Image to test timeout
    global.Image = originalImage;
    
    // Create a mock Image that never loads
    global.Image = class {
      public onload: () => void = () => {};
      public onerror: (err: Error) => void = () => {};
      private _src = "";
      
      set src(value: string) {
        this._src = value;
        // Don't call onload or onerror - simulate hanging request
      }
      
      get src() {
        return this._src;
      }
    } as any;
    
    jest.useFakeTimers();
    const instance = ImageManager.getInstance();
    
    const promise = instance["preloadImage"]("timeout.png");
    
    // Fast-forward past the 10-second timeout
    jest.advanceTimersByTime(10100);
    
    await expect(promise).rejects.toThrow("Image load timeout");
    
    jest.useRealTimers();
    
    // Restore the mock Image with auto-loading behavior
    global.Image = class {
      private _src = "";
      public onload: () => void = () => {};
      public onerror: (err: Error) => void = () => {};

      set src(value: string) {
        this._src = value;
        setTimeout(() => {
          if (value.includes("fail")) {
            this.onerror(new Error("Failed to load"));
          } else {
            this.onload();
          }
        }, 0);
      }

      get src() {
        return this._src;
      }
    } as any;
  });
});
