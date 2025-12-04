import { useEffect, useState } from "react";
import { FishingRodProps } from "../components/FishingRod";
import { SOUNDS } from "../../../../../constants/Sounds";
import { PHISHING_GAME } from "../../../../../constants/MiniGames/phishing";
import { AudioManager } from "../../../../../utils/managers/AudioManager";

const BAIT_HIT_BOX = 60; // Radius within which the diver can interact with the bait

export const useFishingRod = (props: FishingRodProps) => {
  const { bait, diverCoordinates, onBaitPaused, onBaitAnswered } = props;
  const { xPos, yPos, id, message } = bait;
  const audioManager = AudioManager.getInstance();

  const [showMessage, setShowMessage] = useState(false); // Whether the message should be shown
  const [read, setRead] = useState(false); // Whether this bait has already been interacted with
  const [phishingImage, setPhishingImage] = useState(PHISHING_GAME.images.bait.envelop); // Image to display for the bait

  // Checks if the diver and bait rectangles overlap (Axis-Aligned Bounding Box collision)
  const isColliding = () => {
    return (
      diverCoordinates.x < xPos + BAIT_HIT_BOX && // Diver's left side is left of bait's right side
      diverCoordinates.x + PHISHING_GAME.config.driverWidth > xPos && // Diver's right side is right of bait's left side
      diverCoordinates.y < yPos + BAIT_HIT_BOX && // Diver's top side is above bait's bottom side
      diverCoordinates.y + PHISHING_GAME.config.driverHeight > yPos // Diver's bottom side is below bait's top side
    );
  }

  // // Trigger message display when diver is close enough to the bait
  useEffect(() => {
    if (!read && isColliding()) {
      onBaitPaused(id, true); // Pause the bait while the message is shown
      setShowMessage(true); // Display the phishing message
    }
  }, [diverCoordinates, read, xPos, yPos]);

  // Check if the player's answer was correct
  const isAnswerCorrect = (playerSaysPhishing: boolean) => {
    return (
      (playerSaysPhishing && message.isPhishing) || (!playerSaysPhishing && !message.isPhishing)
    );
  };

  // Play success or failure sound based on the result
  const playSound = (correct: boolean) => {
    if (correct) audioManager.play(SOUNDS.common.click);
    else audioManager.play(SOUNDS.common.falseClick);
  };

  // Handle when player submits an answer (phishing or not)
  const handleRevealMessage = (playerSaysPhishing: boolean) => {
    const isCorrect = isAnswerCorrect(playerSaysPhishing);
    playSound(isCorrect); // Give audio feedback
    setPhishingImage(isCorrect ? PHISHING_GAME.images.bait.good : PHISHING_GAME.images.bait.bad); // Change image based on result
    setShowMessage(false); // Hide the message
    setRead(true); // Mark this bait as processed
    onBaitPaused(id, false); // Resume bait behavior
    onBaitAnswered(id, isCorrect); // Notify parent component of the result
  };

  return {
    showMessage,
    phishingImage,
    handleRevealMessage,
  };
};
