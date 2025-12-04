// Keys for storing data in localStorage
export const GAME_STORAGE_KEY = "NothingToHideGameState";
export const SETTINGS_STORAGE_KEY = "NothingToHideSettingsState";

// Arrow key constants for player input
export const ARROW_KEYS = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
};

// Scenes in the game
export enum SCENE {
  START_SCREEN = "START_SCREEN",       // Start screen
  SCENE_1 = "SCENE_1",                 // Social Media Scene
  SCENE_2 = "SCENE_2",                 // Cookie Scene
  SCENE_3 = "SCENE_3",                 // Phishing Scene
  SCENE_4 = "SCENE_4",                 // Photos Scene
  SCENE_5 = "SCENE_5",                 // Password Scene
  END_SCREEN = "END_SCREEN",           // Ending screen
}

// Player avatars
export enum AVATAR {
  UNDEFINED,   // No avatar selected
  AVATAR_1,
  AVATAR_2,
  AVATAR_3,
  AVATAR_4,
  AVATAR_5,
}

// Mapping for next scene progression
export const NEXT_SCENE_MAP: Record<SCENE, SCENE> = {
  [SCENE.START_SCREEN]: SCENE.SCENE_1,
  [SCENE.SCENE_1]: SCENE.SCENE_2,
  [SCENE.SCENE_2]: SCENE.SCENE_3,
  [SCENE.SCENE_3]: SCENE.SCENE_4,
  [SCENE.SCENE_4]: SCENE.SCENE_5,
  [SCENE.SCENE_5]: SCENE.END_SCREEN,
  [SCENE.END_SCREEN]: SCENE.START_SCREEN, // Loops back to start
};

// Steps within a scene
export enum SCENE_STEP {
  PROLOGUE = "PROLOGUE",   // Initial story/dialog
  INTRO = "INTRO",         // Intro to mini-game
  MINI_GAME = "MINI_GAME", // Interactive mini-game
  QUIZ = "QUIZ",           // Quiz after mini-game
}

// Mapping for step progression within a scene
export const NEXT_STEP_MAP: Record<SCENE_STEP, SCENE_STEP> = {
  [SCENE_STEP.PROLOGUE]: SCENE_STEP.INTRO,
  [SCENE_STEP.INTRO]: SCENE_STEP.MINI_GAME,
  [SCENE_STEP.MINI_GAME]: SCENE_STEP.QUIZ,
  [SCENE_STEP.QUIZ]: SCENE_STEP.PROLOGUE, // Loops back if needed
};

// Steps for the start screen flow
export enum START_STEP {
  PRESS_START = "PRESS_START",   // Press start button
  PLAYER_SETUP = "PLAYER_SETUP", // Choose avatar/name
  SETTINGS = "SETTINGS",         // Configure settings
  INTRODUCTION = "INTRODUCTION", // Intro story before first scene
}

// States of a mini-game
export enum MINI_GAME_STATE {
  LOADING = "LOADING",   // Assets are loading
  INTRO = "INTRO",       // Intro animation/tutorial
  TUTORIAL = "TUTORIAL", // Player learns the game
  READY = "READY",       // Ready to start
  PLAYING = "PLAYING",   // Game in progress
  PAUSED = "PAUSED",     // Game paused
  COMPLETED = "COMPLETED", // Game finished
}
