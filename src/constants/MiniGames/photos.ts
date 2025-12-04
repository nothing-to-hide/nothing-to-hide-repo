const images = {
  awkwardSelfie: "./assets/images/miniGames/photos/awkwardSelfie.jpeg",
  awkwardSelfie2: "./assets/images/miniGames/photos/awkwardSelfie2.jpeg",
  beach: "./assets/images/miniGames/photos/beach.jpeg",
  birthday: "./assets/images/miniGames/photos/birthday.jpeg",
  fingerInNose: "./assets/images/miniGames/photos/fingerInNose.jpeg",
  groupPhoto: "./assets/images/miniGames/photos/groupPhoto.jpeg",
  photoWithDog: "./assets/images/miniGames/photos/PhotoWithDog.jpeg",
  playingBasketball: "./assets/images/miniGames/photos/playingBasketball.jpeg",
  playingSoccer: "./assets/images/miniGames/photos/playingSoccer.jpeg",
  schoolPhoto: "./assets/images/miniGames/photos/SchoolPhoto.jpeg",
  showingTowers: "./assets/images/miniGames/photos/showingTowers.jpeg",
  toiletPaperOnShoe: "./assets/images/miniGames/photos/toiletPaperOnShoe.jpeg",
};

const imageFeedback = {
  awkwardSelfie: { canPost: false },
  awkwardSelfie2: { canPost: false },
  beach: { canPost: true },
  birthday: { canPost: true },
  fingerInNose: { canPost: false },
  groupPhoto: { canPost: true },
  photoWithDog: { canPost: true },
  playingBasketball: { canPost: true },
  playingSoccer: { canPost: true },
  schoolPhoto: { canPost: true },
  showingTowers: { canPost: true },
  toiletPaperOnShoe: { canPost: false },
};

const sounds = {
  theme: "./assets/sounds/miniGames/photos.mp3",
};

const config = {
  numberOfImages: 10,
  maxPointsToEarn: 4,

}

export const PHOTOS_GAME = {
  images, imageFeedback, sounds, config
};