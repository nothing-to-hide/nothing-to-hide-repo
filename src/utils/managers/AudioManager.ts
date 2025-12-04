import { SETTINGS_STORAGE_KEY } from "../../constants/Game";
import { ISettings } from "../../context/SettingsContext";
import { extractPaths } from "../Assets";

export type AudioVolumeType = "musicVolume" | "soundEffectsVolume";

export class AudioManager {
  private static instance: AudioManager;
  private audioMap: Map<string, HTMLAudioElement> = new Map();
  private loadingPromises: Map<string, Promise<void>> = new Map();
  private currentLoop: HTMLAudioElement | null = null;
  private pendingLoopSrc: string | null = null; // Source of audio pending to be looped after user interaction
  private musicVolume;
  private soundEffectsVolume;
  private audioEnabled;

  private constructor(musicVolume: number, soundEffectsVolume: number, audioEnabled: boolean) {
    this.musicVolume = musicVolume;
    this.soundEffectsVolume = soundEffectsVolume;
    this.audioEnabled = audioEnabled;
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      //default settings
      let settings: ISettings = {
        musicVolume: 1,
        soundEffectsVolume: 1,
        audioEnabled: true,
        language: "DE",
      };

      try {
        const state = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (state) {
          settings = { ...settings, ...JSON.parse(state) };
        }
      } catch (e) {
        console.error("Failed to load settings from localStorage, settings stay default", e);
      }

      AudioManager.instance = new AudioManager(
        settings.musicVolume,
        settings.soundEffectsVolume,
        settings.audioEnabled,
      );
    }

    return AudioManager.instance;
  }

  /**
   * Preloads a set of sounds given their sources.
   * Uses Promise.allSettled to continue even if some sounds fail.
   *
   * @param soundSources - The source(s) from which to extract audio paths. The exact structure is determined by `extractPaths`
   * @returns A promise that resolves when all sounds have been attempted.
   */
  public async preloadSounds(soundSources: unknown): Promise<void> {
    const paths = extractPaths(soundSources);
    const tasks = paths.map((src) => this.preloadSound(src));
    const results = await Promise.allSettled(tasks);
    
    // Log failures but don't throw
    const failures = results.filter(r => r.status === 'rejected');
    if (failures.length > 0) {
      console.warn(`Failed to load ${failures.length} of ${paths.length} sounds`);
    }
  }

  /**
   * Lazy preload sounds in the background without blocking.
   * Optimized for iOS to avoid blocking the main loading process.
   *
   * @param soundSources - The source(s) from which to extract audio paths.
   */
  public lazyPreloadSounds(soundSources: unknown): void {
    const paths = extractPaths(soundSources);
    // Load sounds one at a time in background
    paths.forEach((src, index) => {
      setTimeout(() => {
        this.preloadSound(src).catch(() => {
          // Silent fail for lazy loading
        });
      }, index * 200); // Stagger loads by 200ms
    });
  }

  private preloadSound(src: string): Promise<void> {
    if (!src) return Promise.resolve();
    // If already cached, skip
    if (this.audioMap.has(src)) return Promise.resolve();

    // If currently loading, return same promise
    if (this.loadingPromises.has(src)) return this.loadingPromises.get(src)!;

    // Otherwise, preload it with timeout
    const promise = new Promise<void>((resolve, reject) => {
      const audio = new Audio();
      const timeout = setTimeout(() => {
        this.loadingPromises.delete(src);
        reject(new Error(`Audio load timeout: ${src}`));
      }, 8000); // 8 second timeout per audio file

      audio.onloadeddata = () => {
        clearTimeout(timeout);
        this.audioMap.set(src, audio);
        this.loadingPromises.delete(src);
        resolve();
      };
      audio.onerror = (e) => {
        clearTimeout(timeout);
        console.warn(`Failed to load audio: ${src}`, e);
        this.loadingPromises.delete(src);
        reject(e);
      };
      
      audio.src = src;
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  // Used for playing short sound effects
  public play(key: string): void {
    const audio = this.audioMap.get(key);
    if (!audio) {
      // Try to load on-demand if not cached
      this.preloadSound(key).then(() => {
        const loadedAudio = this.audioMap.get(key);
        if (loadedAudio) {
          loadedAudio.volume = this.audioEnabled ? this.soundEffectsVolume : 0;
          loadedAudio.currentTime = 0;
          loadedAudio.loop = false;
          loadedAudio.play().catch(() => {});
        }
      }).catch(() => {});
      return;
    }

    audio.pause();
    audio.volume = this.audioEnabled ? this.soundEffectsVolume : 0;
    audio.currentTime = 0;
    audio.loop = false;
    audio.play().catch((err) => {
      if (err.name !== "AbortError") {
        console.warn("play error:", err);
      }
    });
  }

  // Used for looping music
  public loop(key: string, loop = true): void {
    const audio = this.audioMap.get(key);
    if (!audio) {
      // Try to load on-demand if not cached
      this.preloadSound(key).then(() => {
        const loadedAudio = this.audioMap.get(key);
        if (loadedAudio) {
          this.loop(key, loop); // Retry after loading
        }
      }).catch(() => {});
      return;
    }

    if (this.currentLoop) this.stop(); // Stop any previously looping audio

    this.currentLoop = audio;
    audio.volume = this.audioEnabled ? this.musicVolume : 0;
    audio.loop = loop;
    audio.currentTime = 0;

    audio.play().catch((err) => {
      if (err.name === "NotAllowedError") {
        console.warn("Autoplay blocked, deferring until user interaction…");
        this.pendingLoopSrc = key;

        // Set up event listeners to resume playback on user interaction
        const resumeEvents = ["click", "touchstart", "keydown"];
        const tryResume = () => {
          if (this.pendingLoopSrc) {
            this.loop(this.pendingLoopSrc, loop);
            this.pendingLoopSrc = null;
          }
          resumeEvents.forEach((e) => document.removeEventListener(e, tryResume));
        };
        // Use { once: true } to automatically remove listeners after first invocation
        resumeEvents.forEach((e) => document.addEventListener(e, tryResume, { once: true }));
      } else if (err.name !== "AbortError") {
        console.warn("loop error:", err);
      }
    });
  }

  public stop(key?: string): void {
    const audio = key ? this.audioMap.get(key) : this.currentLoop;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.loop = false;

    if (!key) {
      this.currentLoop = null;
    }
  }

  public setVolume(volume: number, type: AudioVolumeType) {
    if (type === "musicVolume") {
      this.musicVolume = volume;
      if (this.audioEnabled && this.currentLoop) {
        this.currentLoop.volume = volume; // Apply volume if audio is enabled
      }
    }
    if (type === "soundEffectsVolume") {
      this.soundEffectsVolume = volume; // Will be applied on demand in play()
    }
  }

  public setEnabled(enabled: boolean) {
    this.audioEnabled = enabled;
    // Mute or unmute current loop
    if (this.currentLoop) {
      this.currentLoop.volume = enabled ? this.musicVolume : 0;
    }
  }

  public isMuted(): boolean {
    return !this.audioEnabled;
  }
}
