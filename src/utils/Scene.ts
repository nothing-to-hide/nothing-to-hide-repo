const FADE_INTERVAL_MS = 20;
const FADE_STEP = 0.02;
const MAX_OPACITY = 1;
const START_FADE_IN_OPACITY = 0.1; // opacity before fade-in starts
let isFading = false;
/**
 * Fades out the current scene, executes a callback, and then fades the new scene in.
 *
 * @param callback - The function to execute after the fade-out is complete.
 */
export const fadeScene = (callback: () => void) => {
  if (isFading) return; // Prevent multiple triggers
  isFading = true;
  // Fade out
  let opacity = MAX_OPACITY;
  const interval = setInterval(() => {
    opacity -= FADE_STEP;
    document.body.style.opacity = opacity.toString();
    if (opacity <= START_FADE_IN_OPACITY) {
      clearInterval(interval);
      callback();
      // Fade in
      const fadeInInterval = setInterval(() => {
        opacity += FADE_STEP;
        document.body.style.opacity = opacity.toString();
        if (opacity >= MAX_OPACITY) {
          clearInterval(fadeInInterval);
          isFading = false; // Reset after fade-in is complete
        }
      }, FADE_INTERVAL_MS);
    }
  }, FADE_INTERVAL_MS);
};