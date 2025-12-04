/**
 * @file Scenes.ts
 * @description Defines types for translations used in different scenes of the game.
 */
import { PhishingMessage } from "../../components/scenes/phishing/MiniGame/logic/types";
import { Tutorial } from "../game/MiniGame";
import { StoryQuiz } from "../game/Story";

/**
 * Represents the structure of the story Dialog.
 *
 * @property characterName - Optional character name for Display.
 * @property dialog - displayed Dialog.
 */
type DialogType = {
  characterName?: string;
  dialog: string;
};

/**
 * Represents the translation structure for various scenes in the application.
 * Each scene is defined as a record with string keys and unknown values,
 * allowing flexibility for different types of content.
 *
 * @property prologue - Translations related to the prologue scene.
 * @property intro - Translations related to the introduction scene.
 * @property miniGame - Translations related to the mini-game scene.
 * @property quiz - Translations related to the quiz scene.
 */
type BaseSceneTranslation = {
  prologue?: Record<string, unknown>;
  intro: Record<string, unknown>;
  miniGame: Record<string, unknown>;
  quiz: Partial<StoryQuiz>[];
};

export type SocialMediaTranslation = BaseSceneTranslation & {
  prologue: {
    innerDialog: string;
  };
  intro: {
    chatGroupName: string;
    chat1: DialogType;
    chat2: DialogType;
    chat3: DialogType;
    chat4: DialogType;
    player1: DialogType;
    player2: DialogType;
  };
  miniGame: {
    youHave: string;
    objectsFound: string;
    all: string;
    title: string;
    description: string;
    miniGameGiveUp: string;
    tutorial: Omit<Tutorial, "image">[];
  };
  quiz: Partial<StoryQuiz>[];
};

export type CookieTranslation = BaseSceneTranslation & {
  intro: {
    buttonTextAcceptCookies: string;
    buttonTextManageCookies: string;
    cookieInfo1: string;
    player1: DialogType;
    hint: DialogType;
    cookies: {
      title: string;
      essentialTitle: string;
      nonEssentialTitle: string;
      essential: {
        login: string;
        security: string;
        language: string;
        system: string;
      };
      nonEssential: {
        tracking: string;
        advertising: string;
        marketing: string;
        thirdParty: string;
        social: string;
        remarketing: string;
        analytics: string;
      };
      cookieInfo2: string;
      cookieInfo3: string;
      buttonTextContinue: string;
    };
  };
  miniGame: {
    title: string;
    description: string;
    goodCookieTexts: string[];
    badCookieTexts: string[];
    tutorial: Omit<Tutorial, "image">[];
  };
  quiz: Partial<StoryQuiz>[];
};

export type PhishingTranslation = BaseSceneTranslation & {
  prologue: {
    bedroom: string;
  };
  intro: {
    player1: DialogType;
    chat1: DialogType;
    player2: DialogType;
  };
  miniGame: {
    title: string;
    description: string;
    hint: string;
    startButton: string;
    legit: string;
    phishing: string;
    gameOver: string;
    success: string;
    failure: string;
    phishingMessages: PhishingMessage[];
    tutorial: Omit<Tutorial, "image">[];
  };
  quiz: Partial<StoryQuiz>[];
};

export type PhotosTranslation = BaseSceneTranslation & {
  intro: PhotosIntroTranslation;
  miniGame: {
    title: string;
    description: string;
    allCorrect: string;
    minimumReached: string;
    insufficient: string;
    post: string;
    notPost: string;
    couldPost: string;
    shouldNotPost: string;
  }
};

export type ActionOption = {
  id: string;
  label: string;
  response: string;
  isCorrect: boolean;
};

export type PhotosIntroTranslation = {
  initialMessage: string;
  notificationTitle: string;
  overlayTitle: string;
  overlayPrompt: string;
  header: {
    avatarLabel: string;
    profileName: string;
    subtitle: string;
  };
  feedActions: {
    like: string;
    chat: string;
    share: string;
  };
  commentsLabel: string;
  actions: ActionOption[];
};

export type PasswordTranslation = BaseSceneTranslation & {
  prologue: {
    classroom: string;
  };
  intro: {
    herrMueller1: string;
    herrMueller2: string;
    herrMueller3: string;
    player1: string;
  };
  miniGame: {
    title: string;
    description: string;
    hint: string;
    endScreenScore: string;
    tutorial: Omit<Tutorial, "image">[];
  };
  quiz: Partial<StoryQuiz>[];
};

export type SceneTranslations = {
  socialMedia: SocialMediaTranslation;
  cookie: CookieTranslation;
  phishing: PhishingTranslation;
  photos: PhotosTranslation;
  password: PasswordTranslation;
};
