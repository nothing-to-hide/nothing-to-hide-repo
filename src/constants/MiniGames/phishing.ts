const images = {
  scubaFrames: {
    idle: [
      "./assets/images/miniGames/phishing/scubaIdle_0.png",
      "./assets/images/miniGames/phishing/scubaIdle_1.png",
    ],
    swim: [
      "./assets/images/miniGames/phishing/scubaSwimming_0.png",
      "./assets/images/miniGames/phishing/scubaSwimming_1.png",
    ],
  },
  // Fish
  fishFrames: [
    "./assets/images/miniGames/phishing/fish_0.png",
    "./assets/images/miniGames/phishing/fish_1.png",
    "./assets/images/miniGames/phishing/fish_2.png",
    "./assets/images/miniGames/phishing/fish_3.png",
    "./assets/images/miniGames/phishing/fish_4.png",
  ],
  // Bait
  bait: {
    envelop: "./assets/images/miniGames/phishing/bait_envelop.png",
    good: "./assets/images/miniGames/phishing/bait_good.png",
    bad: "./assets/images/miniGames/phishing/bait_bad.png",
  },
  // Ground
  ground: [
    "./assets/images/miniGames/phishing/ground_0.png",
    "./assets/images/miniGames/phishing/ground_1.png",
    "./assets/images/miniGames/phishing/ground_rock.png",
    "./assets/images/miniGames/phishing/ground_coralRed.png",
    "./assets/images/miniGames/phishing/ground_coralGreen.png",
  ],
  // Tutorial
  tutorial: [
    "./assets/images/miniGames/phishing/tutorial_swim.png",
    "./assets/images/miniGames/phishing/tutorial_envelop.png",
    "./assets/images/miniGames/phishing/tutorial_message.png",
    "./assets/images/miniGames/phishing/tutorial_skull.png",
    "./assets/images/miniGames/phishing/tutorial_apple.png",
    "./assets/images/miniGames/phishing/tutorial_fish_health.png",
  ],
};

const sounds = {
  theme: "./assets/sounds/miniGames/phishing.mp3",
};

const config = {
  gameDuration: 60000, // milliseconds
  gameMaxPoints: 4,
  // baits
  baitInitialInterval: 6250, // milliseconds
  baitIntervalMinimum: 3750, // milliseconds
  baitMaximal: 5, // Maximum number of baits on screen at once
  baitDropSpeed: 2, // Pixels per frame
  decayFactor: 0.95, // Each spawn interval gets 5% faster
  decayInterval: 5000, // ms between interval decay updates
  // fish
  fishInitialHealth: 100, // Starting health of the fish (%)
  fishMinHealth: 0,
  fishMaxHealth: 100,
  fishHealthUpdate: 10, // % health gained/lost per bait
  fishSpeed: 1.5, // 1: slow, 1.5: normal, 2: fast
  fishEatingDistance: 30,
  fishHealthColorThresholds: [
    { min: 76, color: "#4CAF50" }, // High
    { min: 51, color: "#FFEB3B" }, // Medium
    { min: 26, color: "#FF9800" }, // Low
    { min: 0, color: "#F44336" }, // Critical
  ],
  // scuba diver
  driverWidth: 100,
  driverHeight: 100,
  diverSpeed: 7.5,
  diverStartCoords: { x: 100, y: 100 },
  diverUpdateIntervalMs: 30, // 1000ms / this_value = FPS --> e.g. 30ms = ~33FPS
  diverIdleAnimationSpeed: 400,
  diverSwimAnimationSpeed: 100,
};

export const PHISHING_GAME = {
  images,
  sounds,
  config,
};
