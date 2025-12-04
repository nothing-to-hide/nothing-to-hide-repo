import { SETTINGS_STORAGE_KEY } from "../../constants/Game";
import { AudioManager } from "../../utils/managers/AudioManager";

// Global Mocks
const mockPlay = jest.fn(() => Promise.resolve());
const mockPause = jest.fn();
const mockAudio = {
  play: mockPlay,
  pause: mockPause,
  onloadeddata: jest.fn(),
  onerror: jest.fn(),
  src: "",
  currentTime: 0,
  loop: false,
  volume: 1,
};

const MockAudio = jest.fn(() => ({ ...mockAudio }));

global.Audio = MockAudio as unknown as typeof Audio;

beforeEach(() => {
  mockPlay.mockClear();
  mockPause.mockClear();
  MockAudio.mockClear();

  Object.defineProperty(window, "localStorage", {
    value: {
      store: {} as Record<string, string>,
      getItem(key: string) {
        return this.store[key] || null;
      },
      setItem(key: string, value: string) {
        this.store[key] = value;
      },
      removeItem(key: string) {
        delete this.store[key];
      },
      clear() {
        this.store = {};
      },
    },
    writable: true,
  });

  window.localStorage.setItem(
    SETTINGS_STORAGE_KEY,
    JSON.stringify({
      musicVolume: 0.5,
      soundEffectsVolume: 0.8,
      audioEnabled: true,
    }),
  );

  // reset singleton
  // This is necessary to ensure a fresh instance is created for each test
  // @ts-ignore
  AudioManager.instance = undefined;
});

describe("AudioManager Singleton", () => {
  test("returns the same instance", () => {
    // Verify the singleton pattern
    const a = AudioManager.getInstance();
    const b = AudioManager.getInstance();
    expect(a).toBe(b);
  });

  test("reads initial values from localStorage", () => {
    const TEST_MUSIC_VOLUME = 0.3;
    const TEST_SFX_VOLUME = 0.6;
    window.localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        musicVolume: TEST_MUSIC_VOLUME,
        soundEffectsVolume: TEST_SFX_VOLUME,
        audioEnabled: false,
      }),
    );
    // @ts-ignore
    AudioManager.instance = undefined;
    const instance = AudioManager.getInstance();
    expect(instance["musicVolume"]).toBe(TEST_MUSIC_VOLUME);
    expect(instance["soundEffectsVolume"]).toBe(TEST_SFX_VOLUME);
    expect(instance["audioEnabled"]).toBe(false);
  });

  test("does not reinitialize on second call", () => {
    // Ensure that getInstance doesn't overwrite existing settings
    const a = AudioManager.getInstance();
    window.localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        musicVolume: 1,
        soundEffectsVolume: 1,
        audioEnabled: false,
      }),
    );
    const b = AudioManager.getInstance();
    expect(b["musicVolume"]).toBe(a["musicVolume"]);
  });
});

describe("AudioManager preload logic", () => {
  let instance: AudioManager;

  beforeEach(() => {
    // @ts-ignore
    AudioManager.instance = undefined;
    instance = AudioManager.getInstance();
  });

  test("preloadSound adds audio to map", async () => {
    const p = instance["preloadSound"]("test1.mp3");
    const audio = MockAudio.mock.results.at(-1)?.value;
    audio.onloadeddata();
    await p;
    expect(instance["audioMap"].has("test1.mp3")).toBe(true);
  });

  test("preloadSound returns same promise if already loading", () => {
    const p1 = instance["preloadSound"]("test2.mp3");
    // Calling preloadSound again with the same key should return the same promise
    const p2 = instance["preloadSound"]("test2.mp3");
    expect(p1).toBe(p2);
  });

  test("preloadSound resolves immediately if already loaded", async () => {
    // Manually add an audio element to the cache
    instance["audioMap"].set("test3.mp3", {} as HTMLAudioElement);
    const result = await instance["preloadSound"]("test3.mp3");
    expect(result).toBeUndefined();
  });

  test("preloadSound handles timeout", async () => {
    jest.useFakeTimers();
    const p = instance["preloadSound"]("timeout.mp3");
    // Fast-forward time beyond the 8-second timeout
    jest.advanceTimersByTime(8100);
    await expect(p).rejects.toThrow("Audio load timeout: timeout.mp3");
    jest.useRealTimers();
  });

  test("preloadSound handles error event", async () => {
    const p = instance["preloadSound"]("error.mp3");
    const audio = MockAudio.mock.results.at(-1)?.value;
    const error = new Error("Load failed");
    audio.onerror(error);
    await expect(p).rejects.toBe(error);
  });

  test("preloadSounds uses Promise.allSettled and continues on failures", async () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    const sources = {
      sound1: "sound1.mp3",
      sound2: "sound2.mp3",
      sound3: "sound3.mp3",
    };

    const preloadPromise = instance.preloadSounds(sources);
    
    // Resolve first audio
    const audio1 = MockAudio.mock.results[0]?.value;
    audio1.onloadeddata();
    
    // Fail second audio
    const audio2 = MockAudio.mock.results[1]?.value;
    audio2.onerror(new Error("Failed"));
    
    // Resolve third audio
    const audio3 = MockAudio.mock.results[2]?.value;
    audio3.onloadeddata();

    await preloadPromise;
    
    // Should log warning about failures but not throw
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Failed to load 1 of 3 sounds"));
    consoleSpy.mockRestore();
  });

  test("lazyPreloadSounds staggers loading without blocking", () => {
    jest.useFakeTimers();
    const sources = {
      sound1: "lazy1.mp3",
      sound2: "lazy2.mp3",
      sound3: "lazy3.mp3",
    };

    instance.lazyPreloadSounds(sources);
    
    // Initially, no audio should be created
    expect(MockAudio).not.toHaveBeenCalled();
    
    // After 0ms, first should start
    jest.advanceTimersByTime(0);
    expect(MockAudio).toHaveBeenCalledTimes(1);
    
    // After 200ms, second should start
    jest.advanceTimersByTime(200);
    expect(MockAudio).toHaveBeenCalledTimes(2);
    
    // After another 200ms, third should start
    jest.advanceTimersByTime(200);
    expect(MockAudio).toHaveBeenCalledTimes(3);
    
    jest.useRealTimers();
  });

  test("lazyPreloadSounds silently handles failures", () => {
    jest.useFakeTimers();
    const sources = { sound1: "lazy-fail.mp3" };

    instance.lazyPreloadSounds(sources);
    jest.advanceTimersByTime(0);
    
    const audio = MockAudio.mock.results[0]?.value;
    // Trigger error - should not throw
    expect(() => audio.onerror(new Error("Failed"))).not.toThrow();
    
    jest.useRealTimers();
  });
});

describe("AudioManager sound playback", () => {
  let instance: AudioManager;

  // Mock audio object with initial volume
  const audioMock = {
    ...mockAudio,
    volume: 0,
  } as unknown as HTMLAudioElement;

  beforeEach(() => {
    // @ts-ignore
    // Reset singleton and set up audio map for playback tests
    AudioManager.instance = undefined;
    instance = AudioManager.getInstance();
    instance["audioMap"].set("effect.mp3", audioMock);
    instance["audioMap"].set("music.mp3", audioMock);
    mockPlay.mockClear();
  });

  test("play() triggers short sound with correct volume", () => {
    const TEST_SFX_VOLUME = 0.6;
    instance["audioEnabled"] = true;
    instance["soundEffectsVolume"] = TEST_SFX_VOLUME;
    instance.play("effect.mp3");
    expect(audioMock.play).toHaveBeenCalled();
    expect(audioMock.volume).toBe(TEST_SFX_VOLUME);
  });

  test("play() loads audio on-demand if not cached", async () => {
    const preloadSpy = jest.spyOn(instance as any, "preloadSound").mockResolvedValue(undefined);
    
    // Call play with uncached audio
    instance.play("ondemand.mp3");
    
    expect(preloadSpy).toHaveBeenCalledWith("ondemand.mp3");
    preloadSpy.mockRestore();
  });

  test("play() handles on-demand load failure gracefully", async () => {
    jest.spyOn(instance as any, "preloadSound").mockRejectedValue(new Error("Load failed"));
    
    // Should not throw
    expect(() => instance.play("failed.mp3")).not.toThrow();
  });

  test("loop() replaces previous loop", () => {
    const TEST_MUSIC_VOLUME = 0.4;
    instance["currentLoop"] = audioMock;
    instance["audioEnabled"] = true;
    instance["musicVolume"] = TEST_MUSIC_VOLUME;
    instance.loop("music.mp3");
    expect(audioMock.play).toHaveBeenCalled();
    expect(audioMock.loop).toBe(true);
    expect(audioMock.volume).toBe(TEST_MUSIC_VOLUME);
  });

  test("loop() loads audio on-demand if not cached", async () => {
    const preloadSpy = jest.spyOn(instance as any, "preloadSound").mockResolvedValue(undefined);
    
    // Call loop with uncached audio
    instance.loop("ondemand-loop.mp3");
    
    expect(preloadSpy).toHaveBeenCalledWith("ondemand-loop.mp3");
    preloadSpy.mockRestore();
  });

  test("loop() handles on-demand load failure gracefully", async () => {
    jest.spyOn(instance as any, "preloadSound").mockRejectedValue(new Error("Load failed"));
    
    // Should not throw
    expect(() => instance.loop("failed-loop.mp3")).not.toThrow();
  });

  test("loop() handles autoplay blocked error", async () => {
    const playError = { name: "NotAllowedError" } as Error;
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    const mockPlayRejected = jest.fn(() => Promise.reject(playError));
    const audioWithError = { ...audioMock, play: mockPlayRejected };
    
    instance["audioMap"].set("blocked.mp3", audioWithError as any);
    instance.loop("blocked.mp3");
    
    // Wait for promise rejection to be handled
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Should set up event listeners for user interaction
    expect(addEventListenerSpy).toHaveBeenCalledWith("click", expect.any(Function), { once: true });
    expect(addEventListenerSpy).toHaveBeenCalledWith("touchstart", expect.any(Function), { once: true });
    expect(addEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function), { once: true });
    
    addEventListenerSpy.mockRestore();
  });

  test("stop() pauses and resets loop", () => {
    instance["currentLoop"] = audioMock;
    instance.stop();
    expect(audioMock.pause).toHaveBeenCalled();
    expect(instance["currentLoop"]).toBe(null);
  });

  test("stop(key) stops specific audio", () => {
    const customAudio = { ...audioMock, pause: jest.fn() };
    instance["audioMap"].set("custom.mp3", customAudio);
    instance.stop("custom.mp3");
    expect(customAudio.pause).toHaveBeenCalled();
  });

  test("stop() returns early if no current loop", () => {
    instance["currentLoop"] = null;
    expect(() => instance.stop()).not.toThrow();
  });

  test("stop(key) returns early if audio not found", () => {
    expect(() => instance.stop("nonexistent.mp3")).not.toThrow();
  });
});

describe("AudioManager settings", () => {
  let instance: AudioManager;
  const musicMock = {
    volume: 1,
    pause: jest.fn(),
    play: jest.fn(),
    loop: false,
    currentTime: 0,
  };

  beforeEach(() => {
    // Reset singleton and set a current loop mock
    // @ts-ignore
    AudioManager.instance = undefined;
    instance = AudioManager.getInstance();
    instance["currentLoop"] = musicMock as any;
  });

  test("setVolume updates music volume and applies it", () => {
    const NEW_MUSIC_VOLUME = 0.2;
    instance["audioEnabled"] = true;
    instance.setVolume(NEW_MUSIC_VOLUME, "musicVolume");
    expect(instance["musicVolume"]).toBe(NEW_MUSIC_VOLUME);
    expect(musicMock.volume).toBe(NEW_MUSIC_VOLUME);
  });

  test("setVolume updates music volume when audio is disabled", () => {
    const NEW_MUSIC_VOLUME = 0.3;
    instance["audioEnabled"] = false;
    instance["currentLoop"] = null;
    instance.setVolume(NEW_MUSIC_VOLUME, "musicVolume");
    expect(instance["musicVolume"]).toBe(NEW_MUSIC_VOLUME);
    // Volume should not be applied to musicMock when disabled or no current loop
  });

  test("setVolume updates sound effect volume only", () => {
    const NEW_SFX_VOLUME = 0.9;
    instance.setVolume(NEW_SFX_VOLUME, "soundEffectsVolume");
    expect(instance["soundEffectsVolume"]).toBe(NEW_SFX_VOLUME);
  });

  test("setEnabled(true) unmutes music", () => {
    instance.setEnabled(true);
    expect(musicMock.volume).toBe(instance["musicVolume"]);
  });

  test("setEnabled(false) mutes music", () => {
    instance.setEnabled(false);
    expect(musicMock.volume).toBe(0);
  });

  test("setEnabled handles null currentLoop", () => {
    instance["currentLoop"] = null;
    expect(() => instance.setEnabled(true)).not.toThrow();
    expect(() => instance.setEnabled(false)).not.toThrow();
  });

  test("isMuted() reflects state", () => {
    instance.setEnabled(false);
    expect(instance.isMuted()).toBe(true);
    instance.setEnabled(true);
    expect(instance.isMuted()).toBe(false);
  });
});

describe("AudioManager error handling", () => {
  let instance: AudioManager;

  beforeEach(() => {
    // @ts-ignore
    AudioManager.instance = undefined;
  });

  test("getInstance handles corrupted localStorage gracefully", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, "invalid-json{");
    
    expect(() => AudioManager.getInstance()).not.toThrow();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to load settings from localStorage, settings stay default",
      expect.any(Error)
    );
    
    consoleSpy.mockRestore();
  });

  test("preloadSound handles empty string gracefully", async () => {
    instance = AudioManager.getInstance();
    await expect(instance["preloadSound"]("")).resolves.toBeUndefined();
  });

  test("play() handles play errors gracefully", () => {
    instance = AudioManager.getInstance();
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    const playError = { name: "SomeOtherError", message: "Failed" } as Error;
    const mockPlayRejected = jest.fn(() => Promise.reject(playError));
    const audioWithError = { 
      ...mockAudio, 
      play: mockPlayRejected,
      pause: jest.fn(),
    };
    
    instance["audioMap"].set("error.mp3", audioWithError as any);
    instance.play("error.mp3");
    
    consoleSpy.mockRestore();
  });

  test("loop() handles non-NotAllowedError gracefully", async () => {
    instance = AudioManager.getInstance();
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    const playError = { name: "SomeOtherError", message: "Failed" } as Error;
    const mockPlayRejected = jest.fn(() => Promise.reject(playError));
    const audioWithError = { 
      ...mockAudio, 
      play: mockPlayRejected,
      pause: jest.fn(),
    };
    
    instance["audioMap"].set("error.mp3", audioWithError as any);
    instance.loop("error.mp3");
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(consoleSpy).toHaveBeenCalledWith("loop error:", playError);
    consoleSpy.mockRestore();
  });

  test("loop() ignores AbortError", async () => {
    instance = AudioManager.getInstance();
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    const playError = { name: "AbortError" } as Error;
    const mockPlayRejected = jest.fn(() => Promise.reject(playError));
    const audioWithError = { 
      ...mockAudio, 
      play: mockPlayRejected,
      pause: jest.fn(),
    };
    
    instance["audioMap"].set("abort.mp3", audioWithError as any);
    instance.loop("abort.mp3");
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Should not log AbortError
    expect(consoleSpy).not.toHaveBeenCalledWith("loop error:", playError);
    consoleSpy.mockRestore();
  });
});
