import { useEffect, useState } from "react";
import { ImageManager } from "../managers/ImageManager";
import { AudioManager } from "../managers/AudioManager";

const LOADING_TIMEOUT_MS = 15000; // 15 seconds max loading time
const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

/**
 * Custom React hook to preload image and audio assets asynchronously.
 * Optimized for iOS with timeout protection and lazy audio loading.
 *
 * @param imageSources - Optional sources for images to preload.
 * @param audioSources - Optional sources for audio files to preload.
 * @param loopSoundOnFinish - Optional sound key to loop after preloading finishes.
 * @returns An object containing the loading state (`isLoading`).
 */
export const useAssetPreloader = (
  imageSources?: unknown,
  audioSources?: unknown,
  loopSoundOnFinish?: string,
) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let mounted = true;

    const preloadAssets = async () => {
      try {
        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          if (mounted) {
            console.warn("Asset loading timeout reached, proceeding anyway");
            setIsLoading(false);
          }
        }, LOADING_TIMEOUT_MS);

        // Always preload images (critical for UI)
        if (imageSources) {
          await ImageManager.getInstance().preloadImages(imageSources);
        }

        // On iOS, skip audio preloading to avoid blocking - lazy load on interaction
        if (audioSources && !iOS) {
          await AudioManager.getInstance().preloadSounds(audioSources);
        } else if (audioSources && iOS) {
          // Queue audio for background loading without blocking
          AudioManager.getInstance().lazyPreloadSounds(audioSources);
        }

        if (mounted) {
          clearTimeout(timeoutId);
          setIsLoading(false);
          
          // Start background music after user can interact
          if (loopSoundOnFinish) {
            AudioManager.getInstance().loop(loopSoundOnFinish);
          }
        }
      } catch (error) {
        console.error("Error preloading assets:", error);
        if (mounted) {
          clearTimeout(timeoutId);
          setIsLoading(false); // Proceed anyway
        }
      }
    };

    preloadAssets();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [imageSources, audioSources, loopSoundOnFinish]);

  return {
    isLoading,
  };
};
