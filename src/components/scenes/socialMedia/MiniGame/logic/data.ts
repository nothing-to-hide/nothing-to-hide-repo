import { SOCIAL_MEDIA_GAME } from "../../../../../constants/MiniGames/socialMedia";
import { ObjectSearchData, PreparedObjectSearch } from "./types";

const OBJECT_SEARCH_1 = [
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch1.familyPicture,
    width: 5,
    possiblePositions: [
      { left: 30.5, top: 8 },
      { left: 65, top: 1 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch1.sibling,
    width: 6,
    possiblePositions: [
      { left: 12.5, top: 63 },
      { left: 14, top: 97.5 },
      { left: 63, top: 73 },
      { left: 5.5, top: 80 },
      { left: 21, top: 78 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch1.id,
    width: 2.8,
    possiblePositions: [
      { left: 75, top: 35 },
      { left: 86, top: 73 },
      { left: 18, top: 44 },
      { left: 38, top: 59 },
      { left: 71, top: 75 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch1.laptop,
    width: 9.5,
    possiblePositions: [{ left: 60, top: 85 }],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch1.password,
    width: 3.7,
    possiblePositions: [
      { left: 57, top: 80 },
      { left: 31.5, top: 19 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch1.phone,
    width: 2.6,
    possiblePositions: [
      { left: 23.5, top: 86 },
      { left: 26, top: 100 },
      { left: 84, top: 93 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch1.licensePlate,
    width: 5,
    possiblePositions: [{ left: 91, top: 61 }],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch1.creditCard,
    width: 3,
    possiblePositions: [
      { left: 67, top: 84 },
      { left: 39, top: 73 },
      { left: 14, top: 100 },
      { left: 77, top: 48 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch1.passport,
    width: 2.6,
    possiblePositions: [
      { left: 36, top: 23 },
      { left: 70, top: 25 },
    ],
  },
];

const OBJECT_SEARCH_2 = [
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch2.licensePlate,
    width: 3,
    possiblePositions: [{ left: 62, top: 45.5 }],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch2.nameTag,
    width: 2.3,
    possiblePositions: [
      { left: 21.6, top: 64 },
      { left: 38.75, top: 63.5 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch2.notebook,
    width: 6,
    possiblePositions: [
      { left: 29, top: 97 },
      { left: 10, top: 90 },
      { left: 87, top: 64 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch2.phone,
    width: 2,
    possiblePositions: [
      { left: 24, top: 76 },
      { left: 42, top: 74 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch2.streetSign,
    width: 5,
    possiblePositions: [
      { left: 34, top: 32 },
      { left: 61, top: 29 },
      { left: 99, top: 40 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch2.wallet,
    width: 5,
    possiblePositions: [
      { left: 2.25, top: 78.5 },
      { left: 88.5, top: 85 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch2.creditcard,
    width: 4,
    possiblePositions: [
      { left: 74, top: 96 },
      { left: 70, top: 83 },
      { left: 97, top: 66 },
    ],
  },
  {
    src: SOCIAL_MEDIA_GAME.images.objectSearch2.tablet,
    width: 6,
    possiblePositions: [
      { left: 33.5, top: 75.5 },
      { left: 60, top: 74 },
    ],
  },
];

export const OBJECT_SEARCHES: ObjectSearchData[] = [
  {
    backgroundImage: SOCIAL_MEDIA_GAME.images.objectSearch1.background,
    hiddenObjects: OBJECT_SEARCH_1,
    timeForSearch: 60000,
  },
  {
    backgroundImage: SOCIAL_MEDIA_GAME.images.objectSearch2.background,
    hiddenObjects: OBJECT_SEARCH_2,
    timeForSearch: 45000,
  },
];

export const getPreparedObjectSearch = (gameNumber: number): PreparedObjectSearch => {
  const objectSearch = OBJECT_SEARCHES[gameNumber] ?? OBJECT_SEARCHES[0];
  return {
    ...objectSearch,
    hiddenObjects: objectSearch.hiddenObjects.map((object) => {
      // Randomly assign one position to each hidden object
      const position =
        object.possiblePositions[Math.floor(Math.random() * object.possiblePositions.length)];
      return { ...object, position };
    }),
  };
};
