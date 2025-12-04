import { useState } from "react";
import { MessageType, StoryElement } from "../../../../types/game/Story";
import { useTranslation } from "../../../../utils/hooks/useTranslation";
import { Dialog } from "../../../common/Dialogs/Dialog";
import { IMAGES } from "../../../../constants/Images";
import { useGameState } from "../../../../context/GameStateContext";
import { CookieSettings } from "./CookieSettings";
import { CookieOverview } from "./CookieOverview";

type CookieIntroProps = {
  onComplete: () => void;
};

export const CookieIntro = ({ onComplete }: CookieIntroProps) => {
  const [dialogIndex, setDialogIndex] = useState(0);

  const { localize } = useTranslation();
  const { gameState } = useGameState();

  const proceedIntroElement = () => {
    if (dialogIndex < introElements.length - 1) {
      setDialogIndex(dialogIndex + 1);
    } else {
      onComplete();
    }
  };

  const introElements: StoryElement[] = [
    {
      type: "custom",
      component: <CookieOverview onNext={() => proceedIntroElement()} />,
    },
    {
      type: "dialog",
      messageType: MessageType.THOUGHT,
      text: localize.scenes.cookie.intro.player1.dialog,
      avatarUrl: IMAGES.getAvatar(gameState.avatar),
    },
    {
      type: "custom",
      component: <CookieSettings onComplete={() => onComplete()} />,
    },
  ];

  const currentDialog = introElements[dialogIndex];

  return (
    <div>
      {currentDialog.type === "dialog" && (
        <Dialog element={currentDialog} onClick={proceedIntroElement} />
      )}
      {currentDialog.type === "custom" && currentDialog.component}
    </div>
  );
};
