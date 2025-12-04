import { CommonGameTranslation } from "../../types/translations/CommonGame";

const startScreen = {
  pressStart: "Start game",
  startGame: "Start game",
};

const playerSetup = {
  title: "Nothing To Hide",
  welcomeTo: "Welcome to",
  description:
    "Before we start, please choose a cool nickname and an avatar that represents you.",
  errorUsername: "Please enter a nickname.",
  errorUsernameInvalid: "Nickname can only contain letters and numbers",
  errorAvatar: "Please select an avatar.",
  usernameLabel: "Nickname",
  usernamePlaceholder: "Enter your nickname",
  avatarLabel: "Select avatar",
  avatarAlt: "Avatar selection",
  continueButton: "Continue",
};

const quizSetup = {
  title: "Quiz Time!!",
  getReady: "Ready for a quiz",
  startSoon: "It's starting soon...",
};

const achievements = {
  title: "Achievements of:",
  unlockedMessage: "Congratulations, you have achieved the following milestone:",
  failedMessage: "Unfortunately, you did not achieve this badge:",
  password: "Password Master",
  cookie: "Cookie Master",
  socialMedia: "Social Media Master",
  photo: "Photo Master",
  phishing: "Phishing Master",
};

const introduction = {
  welcome: "Hey",
  role: "You are a 10th grade student. You're just chilling - until your phone vibrates. Suddenly you're in the middle of it: Your task? Make decisions, stay cool and keep track of the digital chaos.",
  message: "Your game, your decisions, Go!",
};

const endScreen = {
  successTitle: "Congratulations, Digital Protector!",
  successMessage: "You have mastered all challenges and won all cybersecurity badges.\nYour account is now super protected! Hackers, phishers and curious cookies don't stand a chance!",
  successEndingMessage: "The app InstaVibe trusts you and stays on your device.\nContinue to share responsibly and help others become digital heroes too.",
  failedTitle: "Almost there!",
  failedMessage: "You have already learned a lot of important things, but a few points are still missing.\nTo protect your security, the app InstaVibe will now be deactivated.",
  failedEndingMessage: "Don't worry, you can restart the game, collect the missing badges and come back even stronger!",
  pointsEarned: `Points earned: {POINTS}`,
  tryAgain: "Play again",
  replayFailedModules: "Catch Up on Missing Levels",
  gameOver: "Game over",
  roundOver: "Round over",
};

const tutorial = {
  title: "Tutorial",
  next: "Next",
  back: "Back",
  skip: "Skip",
  start: "Let's go!",
};

const landscapeScreen = {
  turnDevice: "Please rotate your device!"
}

export const commonGame: CommonGameTranslation = {
  startScreen,
  playerSetup,
  quizSetup,
  achievements,
  introduction,
  endScreen,
  tutorial,
  landscapeScreen,
};
