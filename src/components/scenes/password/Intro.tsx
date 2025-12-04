import { useState } from "react";
import { MessageType, StoryDialog } from "../../../types/game/Story";
import { useTranslation } from "../../../utils/hooks/useTranslation";
import { Dialog } from "../../common/Dialogs/Dialog";
import { useGameState } from "../../../context/GameStateContext";
import { IMAGES } from "../../../constants/Images";

type PasswordIntroProps = {
  onComplete: () => void;
};

export const PasswordIntro = (props: PasswordIntroProps) => {
  const { onComplete } = props;
  const [dialogIndex, setDialogIndex] = useState(0);
  // Localization hook for translating text
  const { localize } = useTranslation();
  const { gameState } = useGameState();

  // Intro, localized for the current language
  const introDialogs: StoryDialog[] = [
    {
      type: "dialog",
      messageType: MessageType.SPEECH,
      text: localize.scenes.password.intro.herrMueller1,
      avatarUrl: IMAGES.npcAvatars.csProfessor,
    },
    {
      type: "dialog",
      messageType: MessageType.SPEECH,
      text: localize.scenes.password.intro.herrMueller2,
      avatarUrl: IMAGES.npcAvatars.csProfessor,
    },
    {
      type: "dialog",
      messageType: MessageType.SPEECH,
      text: localize.scenes.password.intro.herrMueller3,
      avatarUrl: IMAGES.npcAvatars.csProfessor,
    },
    {
      type: "dialog",
      messageType: MessageType.SPEECH,
      text: localize.scenes.password.intro.player1,
      avatarUrl: IMAGES.getAvatar(gameState.avatar),
    },
  ];

  /**
   * Advances the prologue to the next dialog or step if at the end.
   */
  const proceedPrologue = () => {
    if (dialogIndex < introDialogs.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="scene-intro">
      <Dialog element={introDialogs[dialogIndex]} onClick={proceedPrologue} />
    </div>
  );
};
