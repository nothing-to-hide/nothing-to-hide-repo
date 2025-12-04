const images = {
  cookies: {
    light: "./assets/images/miniGames/cookie/cookie_light.png",
    background: "./assets/images/miniGames/cookie/background.png",
  },
  crumbles: [
    "./assets/images/miniGames/cookie/crumble1.png",
    "./assets/images/miniGames/cookie/crumble2.png",
    "./assets/images/miniGames/cookie/crumble3.png",
    "./assets/images/miniGames/cookie/crumble4.png",
    "./assets/images/miniGames/cookie/crumble5.png",
  ],
  tutorial: [
    "./assets/images/miniGames/cookie/tutorial1.png",
    "./assets/images/miniGames/cookie/tutorial2.png",
    "./assets/images/miniGames/cookie/tutorial3.png",
  ],
};

const sounds = {
  theme: "./assets/sounds/miniGames/cookies.mp3",
};

const config = {
  gameDuration: 90000, // ms
  gameInterval: 1000, // ms
  cookieGravity: 30,
  cookieSpawnMaxX: 80, // %
  cookieSpawnMinX: 20, // %
  cookieSpeedRangeX: 5,
  cookieBaseSpeedY: 50,
  cookieSpeedRangeY: 20,
  cookieMaxYPosition: 105, // %
  cookieHitBoxRange: 8, // %
  crumbleAmountRange: 5,
  minCrumblesPerCookie: 5,
  crumbleDirectionRange: 30, // %
  crumbleSizeRange: 20, // %
  crumbleMinSize: 2, // %
  crumbleFallingSpeed: 70,
  crumbleFallingSpeedRange: 20,
  maxTrailElements: 5,
  clearTrailAfterMs: 200, // ms
  initialSpawnFrequency: 2000, // ms
  maxSpawnFrequency: 700, // ms
  spawnFrequencyIncrease: 50, // ms
  gameMaxPoints: 4, 
  targetPointsPerSecond: 0.1, // for score calculation
};

export const COOKIE_GAME = {
  images,
  sounds,
  config,
};
