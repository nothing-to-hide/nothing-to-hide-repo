import { renderHook } from "@testing-library/react";
import { act } from "react";
import { SETTINGS_STORAGE_KEY } from "../../constants/Game";
import { LANGUAGES } from "../../constants/Languages";
import { SettingsProvider, useSettings } from "../../context/SettingsContext";
import { Language } from "../../translations";

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
  });
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("SettingsProvider", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SettingsProvider>{children}</SettingsProvider>
  );

  const DEFAULT_MUSIC_VOLUME = 0.5;
  const DEFAULT_SOUND_EFFECTS_VOLUME = 0.5;

  const defaultSettings = {
    audioEnabled: true,
    musicVolume: DEFAULT_MUSIC_VOLUME,
    soundEffectsVolume: DEFAULT_SOUND_EFFECTS_VOLUME,
    language: LANGUAGES.DE.code,
  };

  it("should provide default settings when no localStorage data exists", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.settings).toEqual(defaultSettings);
  });

  it("should load settings from localStorage when available", () => {
    const SAVED_MUSIC_VOLUME = 0.3;
    const SAVED_SFX_VOLUME = 0.7;
    const savedSettings = {
      audioEnabled: false,
      musicVolume: SAVED_MUSIC_VOLUME,
      soundEffectsVolume: SAVED_SFX_VOLUME,
      language: LANGUAGES.DE.code,
    };
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(savedSettings));

    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.settings).toEqual(savedSettings);
  });

  it("should update settings and persist to localStorage", () => {
    const UPDATED_MUSIC_VOLUME = 0.8;
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.updateSettings({
        audioEnabled: false,
        musicVolume: UPDATED_MUSIC_VOLUME,
      });
    });

    // Check hook state
    expect(result.current.settings.audioEnabled).toBe(false);
    expect(result.current.settings.musicVolume).toBe(UPDATED_MUSIC_VOLUME);
    expect(result.current.settings.soundEffectsVolume).toBe(DEFAULT_SOUND_EFFECTS_VOLUME); // Should remain unchanged

    // Check localStorage
    const storedSettings = JSON.parse(window.localStorage.getItem(SETTINGS_STORAGE_KEY)!);
    expect(storedSettings.audioEnabled).toBe(false);
    expect(storedSettings.musicVolume).toBe(UPDATED_MUSIC_VOLUME);
    expect(storedSettings.soundEffectsVolume).toBe(DEFAULT_SOUND_EFFECTS_VOLUME);
  });

  it("should handle partial updates correctly", () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.updateSettings({ audioEnabled: false });
    });

    expect(result.current.settings).toEqual({
      ...defaultSettings,
      audioEnabled: false,
    });

    act(() => {
      result.current.updateSettings({ language: LANGUAGES.DE.code as Language });
    });

    expect(result.current.settings).toEqual({
      ...defaultSettings,
      audioEnabled: false,
      language: LANGUAGES.DE.code,
    });
  });

  it("should throw error when used outside provider", () => {
    // Suppress expected error logging in test output
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      renderHook(() => useSettings());
    }).toThrow("useSettings must be used within a SettingsProvider");

    console.error = originalError;
  });

  it("should validate volume ranges when updating", () => {
    const VALID_VOLUME_LEVEL = 0.5;
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.updateSettings({
        musicVolume: VALID_VOLUME_LEVEL,
        soundEffectsVolume: VALID_VOLUME_LEVEL,
      });
    });

    expect(result.current.settings.musicVolume).toBe(VALID_VOLUME_LEVEL);
    expect(result.current.settings.soundEffectsVolume).toBe(VALID_VOLUME_LEVEL);
  });

  it("should maintain separate instances for different providers", () => {
    const wrapper1 = ({ children }: { children: React.ReactNode }) => (
      <SettingsProvider>{children}</SettingsProvider>
    );
    const wrapper2 = ({ children }: { children: React.ReactNode }) => (
      <SettingsProvider>{children}</SettingsProvider>
    );

    const { result: result1 } = renderHook(() => useSettings(), { wrapper: wrapper1 });
    const { result: result2 } = renderHook(() => useSettings(), { wrapper: wrapper2 });

    act(() => {
      result1.current.updateSettings({ audioEnabled: false });
    });

    expect(result1.current.settings.audioEnabled).toBe(false);
    expect(result2.current.settings.audioEnabled).toBe(true); // Should remain default
  });
});
