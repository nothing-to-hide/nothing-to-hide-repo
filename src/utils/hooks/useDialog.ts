import { useState, useEffect } from "react";
import { StoryDialog } from "../../types/game/Story";
import { parseText } from "../Dialogs";
import { useTypewriter } from "./useTypewriter";
import { AudioManager } from "../managers/AudioManager";
import { SOUNDS } from "../../constants/Sounds";

export function useDialog(element: string | StoryDialog, typingSpeed = 30) {
  // Extract common properties
  const rawText = typeof element === "string" ? element : element.text;
  const avatarUrl = typeof element === "string" ? undefined : element.avatarUrl;
  const messageType = typeof element === "string" ? undefined : element.messageType;
  const characterName = typeof element === "string" ? undefined : element.characterName;
  
  // Parse text and setup typewriter
  const { parts, typewriterIndex } = parseText(rawText);
  
  const animatedText = useTypewriter(
    typewriterIndex !== null ? parts[typewriterIndex].content : "",
    typingSpeed
  );
  
  // Button visibility state
  const [showButton, setShowButton] = useState(false);
  const audioManager = AudioManager.getInstance();
  
  // Handle button visibility and sound effects
  useEffect(() => {
    if (
      typewriterIndex === null ||
      (animatedText === parts[typewriterIndex].content && 
       parts[typewriterIndex].content.length > 0)
    ) {
      setShowButton(true);
      audioManager.play(SOUNDS.common.swish);
    } else {
      setShowButton(false);
    }
  }, [animatedText, parts, typewriterIndex, audioManager]);
  
  return {
    parts,
    typewriterIndex,
    animatedText,
    showButton,
    avatarUrl,
    messageType,
    characterName
  };
}