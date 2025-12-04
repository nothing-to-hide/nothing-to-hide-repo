import { SCENE } from "./Game";

// Common sound effects used throughout the game
const common = {
  fail: "./assets/sounds/fail.mp3",
  click: "./assets/sounds/click.mp3",
  swish: "./assets/sounds/swish.mp3",
  woosh: "./assets/sounds/woosh.mp3",
  correctClick: "./assets/sounds/correctClick.mp3",
  falseClick: "./assets/sounds/falseClick.mp3",
  crunch: "./assets/sounds/crunch.mp3",
};

// Quiz-specific background or effect sound
const quizzes = {
  quiz: "./assets/sounds/quizzes/quiz.mp3",
};

// Background music per scene
const scenes: Record<SCENE, string> = {
  [SCENE.START_SCREEN]: "./assets/sounds/scenes/startScreen.mp3",
  [SCENE.SCENE_1]: "./assets/sounds/scenes/socialMedia.mp3",
  [SCENE.SCENE_2]: "./assets/sounds/scenes/cookie.mp3",
  [SCENE.SCENE_3]: "./assets/sounds/scenes/phishing.mp3",
  [SCENE.SCENE_4]: "./assets/sounds/scenes/photos.mp3",
  [SCENE.SCENE_5]: "./assets/sounds/scenes/password.mp3",
  [SCENE.END_SCREEN]: "./assets/sounds/scenes/endScreen.mp3",
};

// Achievement-related sounds
const achievements = {
  unlocked: "./assets/sounds/achievements/unlocked.mp3",
};

export const SOUNDS = {
  common,
  quizzes,
  scenes,
  achievements,
};
