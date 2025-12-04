import { CommonGameTranslation } from "../../types/translations/CommonGame";

const startScreen = {
  pressStart: "Start Game",
  startGame: "Start Game",
};

const playerSetup = {
  title: "Nothing To Hide",
  welcomeTo: "Willkommen bei",
  description:
    "Bevor wir starten, wähle bitte einen coolen Nickname und einen Avatar, der dich repräsentiert.",
  errorUsername: "Bitte gib einen Nickname ein.",
  errorUsernameInvalid: "Nickname darf nur Buchstaben und Zahlen enthalten",
  errorAvatar: "Bitte wähle einen Avatar aus.",
  usernameLabel: "Nickname",
  usernamePlaceholder: "Gib deinen Nickname ein",
  avatarLabel: "Avatar auswählen",
  avatarAlt: "Avatar Auswahl",
  continueButton: "Weiter",
};

const quizSetup = {
  title: "Quiz Time!!",
  getReady: "Bereit für ein Quiz",
  startSoon: "Es geht gleich los...",
};

const achievements = {
  title: "Errungenschaften von:",
  unlockedMessage: "Gratulation, du hast folgenden Meilenstein erreicht:",
  failedMessage: "Schade, du hast diesen Badge leider nicht erreicht:",
  password: "Password\nMaster",
  cookie: "Cookie\nMaster",
  socialMedia: "Social\nMaster",
  photo: "Photo\nMaster",
  phishing: "Phishing\nMaster",
};

const introduction = {
  welcome: "Hey",
  role:
    "Du bist Schüler*in in der 10. Klasse. Eigentlich chillst du nur – bis dein Handy vibriert. Plötzlich steckst " +
    "du mittendrin: Deine Aufgabe? Entscheidungen treffen, cool bleiben und den Überblick behalten im digitalen Chaos.",
  message: "Dein Game, deine Entscheidungen, Go!",
};

const endScreen = {
  successTitle: "Gratulation, Digitaler Beschützer!",
  successMessage:
    "Du hast alle Herausforderungen gemeistert und alle Cybersecurity-Badges gewonnen.\nDein Konto ist jetzt supergeschützt! Hacker, Phisher und neugierige Cookies haben keine Chance!",
  successEndingMessage:
    "Die App InstaVibe vertraut dir und bleibt auf deinem Gerät.\nTeile weiterhin mit Verantwortung und hilf anderen, ebenfalls digitale Helden zu werden.",
  failedTitle: "Fast geschafft!",
  failedMessage:
    "Du hast schon viel Wichtiges gelernt, aber es fehlen noch ein paar Punkte.\nUm deine Sicherheit zu schützen, wird die App InstaVibe jetzt deaktiviert.",
  failedEndingMessage:
    "Keine Sorge, du kannst das Spiel neu starten, die fehlenden Badges sammeln und noch stärker zurückkehren!",
  pointsEarned: "Erreichte Punkte: {POINTS}",
  tryAgain: "Nochmal spielen",
  replayFailedModules: "Fehlende Level nachholen",
  gameOver: "Spiel vorbei",
  roundOver: "Runde vorbei",
};

const tutorial = {
  title: "Tutorial",
  next: "Weiter",
  back: "Zurück",
  skip: "Überspringen",
  start: "Los geht's!",
};

const landscapeScreen = {
  turnDevice: "Bitte drehe dein Gerät!",
};

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
