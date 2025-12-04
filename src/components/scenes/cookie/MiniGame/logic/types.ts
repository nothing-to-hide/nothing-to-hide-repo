import { Coordinates } from "../../../../../types/game/MiniGame";

export type CookieState = "intact" | "hit" | "crumbles";

export type Cookie = {
  key: number;
  position: Coordinates;
  velocityXY: Coordinates;
  state: CookieState;
  cookieText: {
    text: string;
    goodCookie: boolean;
  };
};

export type Crumble = {
  position: Coordinates;
  size: number;
  xDirection: number;
  cookieRef: number;
  speed: number;
};

export type Trail = {
  position: Coordinates;
  opacity: number;
};
