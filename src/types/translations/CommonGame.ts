import { ACHIEVEMENT_KEY } from "../../constants/Achievements";

type StartScreenTranslation = {
  pressStart: string;
  startGame: string;
};

type PlayerSetupTranslation = {
  title: string;
  welcomeTo: string;
  description: string;
  errorUsername: string;
  errorUsernameInvalid: string;
  errorAvatar: string;
  usernameLabel: string;
  usernamePlaceholder: string;
  avatarLabel: string;
  avatarAlt: string;
  continueButton: string;
};

type QuizSetup = {
  title: string;
  getReady: string;
  startSoon: string;
};

type AchievementTranslation = {
  title: string;
  unlockedMessage: string;
  failedMessage: string;
} & Record<ACHIEVEMENT_KEY, string>;

type IntroductionTranslation = {
  welcome: string;
  message: string;
  role: string;
};

type EndScreenTranslation = {
  successTitle: string;
  successMessage: string;
  successEndingMessage: string;
  failedTitle: string;
  failedEndingMessage: string;
  failedMessage: string;
  pointsEarned: string;
  tryAgain: string;
  replayFailedModules: string;
  gameOver: string;
  roundOver: string;
};

type TutorialTranslation = {
  title: string;
  next: string;
  back: string;
  skip: string;
  start: string;
};

type LandscapeScreenTranslation = {
  turnDevice: string;
};

export type CommonGameTranslation = {
  startScreen: StartScreenTranslation;
  playerSetup: PlayerSetupTranslation;
  quizSetup: QuizSetup;
  achievements: AchievementTranslation;
  introduction: IntroductionTranslation;
  endScreen: EndScreenTranslation;
  tutorial: TutorialTranslation;
  landscapeScreen: LandscapeScreenTranslation;
};
