const images = {
  circularSawBlade: "./assets/images/miniGames/password/circularSawBlade.png",

  tutorial: [
    "./assets/images/miniGames/password/tutorial_saw_blade.png",
    "./assets/images/miniGames/password/tutorial_password.png",
    "./assets/images/miniGames/password/tutorial_score.png",
  ],
};

const sounds = {
  theme: "./assets/sounds/miniGames/password.mp3",
};

const config = {
  gameDuration: 60000, // ms
  gameInterval: 1000, // ms
  gameMaxPoints: 4,
  wordSpeedIncrease: 0.05, // px - increase of the speed in after an interval
  wordBaseSpeed: 1,
  wordMinSpeed: 1.5, // minimum falling speed
  wordMaxSpeed: 3.5, // maximum falling speed
  scoreUpdate: 1, // Points deducted for invalid passwords
  targetPointsPerSecond: 0.1, // for score calculation
};

export const PASSWORD_GAME = {
  images,
  sounds,
  config,
};
