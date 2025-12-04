import { AVATAR, SCENE } from "./Game";

// Common icons and images used across the game
const common = {
  replayIcon: "./assets/icons/replay_icon.png",
  settingsIcon: "./assets/icons/settings_icon.png",
  trophyIcon: "./assets/icons/trophy_icon.png",
  achievementBook: "./assets/icons/achievement_icon.png",
  phoneWhite: "./assets/images/app/phoneWhite.png",
  vibratingPhone: "./assets/images/app/vibratingPhone.png",
  instaVibe: "./assets/icons/instaVibe.png",
};

// Player avatars with different moods
const playerAvatars: Record<AVATAR, { normal: string; happy: string; sad: string }> = {
  [AVATAR.UNDEFINED]: {
    normal: "",
    happy: "",
    sad: "",
  },
  [AVATAR.AVATAR_1]: {
    normal: "./assets/avatars/player/female.png",
    happy: "./assets/avatars/player/female_happy.png",
    sad: "./assets/avatars/player/female_sad.png",
  },
  [AVATAR.AVATAR_2]: {
    normal: "./assets/avatars/player/male.png",
    happy: "./assets/avatars/player/male_happy.png",
    sad: "./assets/avatars/player/male_sad.png",
  },
  [AVATAR.AVATAR_3]: {
    normal: "./assets/avatars/player/female-long-hair.png",
    happy: "./assets/avatars/player/female-long-hair_happy.png",
    sad: "./assets/avatars/player/female-long-hair_sad.png",
  },
  [AVATAR.AVATAR_4]: {
    normal: "./assets/avatars/player/dark-skin.png",
    happy: "./assets/avatars/player/dark-skin_happy.png",
    sad: "./assets/avatars/player/dark-skin_sad.png",
  },
  [AVATAR.AVATAR_5]: {
    normal: "./assets/avatars/player/asian.png",
    happy: "./assets/avatars/player/asian_happy.png",
    sad: "./assets/avatars/player/asian_sad.png",
  },
};

// Helper to get player avatar by mood
const getAvatar = (avatar: AVATAR, mood?: "happy" | "normal" | "sad"): string => {
  if (mood) return playerAvatars[avatar][mood];
  return playerAvatars[avatar].normal;
};

// Avatars of non-player characters (NPCs)
const npcAvatars = {
  max: "./assets/avatars/npc/max.png",
  defaultUserProfile: "./assets/avatars/npc/defaultUserIcon.png",
  csProfessor: "./assets/avatars/npc/cs_professor.png",
  csProfessor_happy: "./assets/avatars/npc/cs_professor_happy.png",
};

// Chat room icons
const chatRoomIcons = {
  schoolChatRoom: "./assets/images/scenes/chatRoomIcon.png",
};

// Achievement icons
const achievements = {
  book: "./assets/images/achievements/book.png",
  socialMedia: "./assets/images/achievements/socialMedia.png",
  cookie: "./assets/images/achievements/cookie.png",
  phishing: "./assets/images/achievements/phishing.png",
  photo: "./assets/images/achievements/photo.png",
  password: "./assets/images/achievements/password.png",
};

// Get background image for a scene, optionally depending on avatar or success
export const getSectionImage = (scene: SCENE, avatar: AVATAR, success?: boolean): string => {
  switch (scene) {
    case SCENE.START_SCREEN:
      return "./assets/images/scenes/startScreen.png";
    case SCENE.SCENE_1:
      return socialMediaSceneAvatarImages[avatar];
    case SCENE.SCENE_2:
      return cookieSceneAvatarImages[avatar];
    case SCENE.SCENE_3:
      return phishingSceneAvatarImages[avatar];
    case SCENE.SCENE_4:
      return photosSceneAvatarImages[avatar];
    case SCENE.SCENE_5:
      return "./assets/images/scenes/password/sceneBackground.png";
    case SCENE.END_SCREEN:
      if (success) return "./assets/images/scenes/end_screen_sunny.png";
      return "./assets/images/scenes/end_screen_cloudy.png";
    default:
      return "";
  }
};

// Scene-specific avatar background images
const socialMediaSceneAvatarImages: Record<AVATAR, string> = {
  [AVATAR.UNDEFINED]: "",
  [AVATAR.AVATAR_1]: "./assets/images/scenes/socialMedia/sceneBackgroundAvatar1.png",
  [AVATAR.AVATAR_2]: "./assets/images/scenes/socialMedia/sceneBackgroundAvatar2.png",
  [AVATAR.AVATAR_3]: "./assets/images/scenes/socialMedia/sceneBackgroundAvatar3.png",
  [AVATAR.AVATAR_4]: "./assets/images/scenes/socialMedia/sceneBackgroundAvatar4.png",
  [AVATAR.AVATAR_5]: "./assets/images/scenes/socialMedia/sceneBackgroundAvatar5.png",
};

const cookieSceneAvatarImages: Record<AVATAR, string> = {
  [AVATAR.UNDEFINED]: "",
  [AVATAR.AVATAR_1]: "./assets/images/scenes/cookie/sceneBackgroundAvatar1.png",
  [AVATAR.AVATAR_2]: "./assets/images/scenes/cookie/sceneBackgroundAvatar2.png",
  [AVATAR.AVATAR_3]: "./assets/images/scenes/cookie/sceneBackgroundAvatar3.png",
  [AVATAR.AVATAR_4]: "./assets/images/scenes/cookie/sceneBackgroundAvatar4.png",
  [AVATAR.AVATAR_5]: "./assets/images/scenes/cookie/sceneBackgroundAvatar5.png",
};

const phishingSceneAvatarImages: Record<AVATAR, string> = {
  [AVATAR.UNDEFINED]: "",
  [AVATAR.AVATAR_1]: "./assets/images/scenes/phishing/sceneBackgroundAvatar1.png",
  [AVATAR.AVATAR_2]: "./assets/images/scenes/phishing/sceneBackgroundAvatar2.png",
  [AVATAR.AVATAR_3]: "./assets/images/scenes/phishing/sceneBackgroundAvatar3.png",
  [AVATAR.AVATAR_4]: "./assets/images/scenes/phishing/sceneBackgroundAvatar4.png",
  [AVATAR.AVATAR_5]: "./assets/images/scenes/phishing/sceneBackgroundAvatar5.png",
};
const photosSceneAvatarImages: Record<AVATAR, string> = {
  [AVATAR.UNDEFINED]: "",
  [AVATAR.AVATAR_1]: "./assets/images/scenes/photos/sceneBackgroundAvatar1.png",
  [AVATAR.AVATAR_2]: "./assets/images/scenes/photos/sceneBackgroundAvatar2.png",
  [AVATAR.AVATAR_3]: "./assets/images/scenes/photos/sceneBackgroundAvatar3.png",
  [AVATAR.AVATAR_4]: "./assets/images/scenes/photos/sceneBackgroundAvatar4.png",
  [AVATAR.AVATAR_5]: "./assets/images/scenes/photos/sceneBackgroundAvatar5.png",
};

// Photos scene special images
const photosSceneImages = {
  embarrassingPictureOfMax: "./assets/images/scenes/photos/embarrassing-picture-of-max.png",
};

export const IMAGES = {
  common,
  playerAvatars,
  npcAvatars,
  chatRoomIcons,
  achievements,
  photosSceneImages,
  getSectionImage,
  getAvatar,
};
