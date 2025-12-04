import { Achievement } from "../types/game/Achievements";
import { IMAGES } from "./Images";

export enum ACHIEVEMENT_KEY {
  socialMedia = "socialMedia",
  cookie = "cookie",
  phishing = "phishing",
  photo = "photo",
  password = "password"
}

export const ACHIEVEMENTS: Record<ACHIEVEMENT_KEY, Achievement> = {
  socialMedia: {
    key: ACHIEVEMENT_KEY.socialMedia,
    imgPath: IMAGES.achievements.socialMedia,
  },
  cookie: {
    key: ACHIEVEMENT_KEY.cookie,
    imgPath: IMAGES.achievements.cookie,
  },
  phishing: {
    key: ACHIEVEMENT_KEY.phishing,
    imgPath: IMAGES.achievements.phishing,
  },
  photo: {
    key: ACHIEVEMENT_KEY.photo,
    imgPath: IMAGES.achievements.photo,
  },
  password: {
    key: ACHIEVEMENT_KEY.password,
    imgPath: IMAGES.achievements.password,
  },
};
