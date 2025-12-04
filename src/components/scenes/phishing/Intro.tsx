import { useState } from "react";
import { useTranslation } from "../../../utils/hooks/useTranslation";
import { MessageType, StoryDialog } from "../../../types/game/Story";
import { Dialog } from "../../common/Dialogs/Dialog";
import { useGameState } from "../../../context/GameStateContext";
import { IMAGES } from "../../../constants/Images";
import { ChatRoom } from "../../common/MobilePhone/ChatRoom";

type PhishingIntroProps = {
  onComplete: () => void;
};

export const PhishingIntro = (props: PhishingIntroProps) => {
  const { onComplete } = props;
  const [dialogIndex, setDialogIndex] = useState(0);
  // Localization hook for translating text
  const { localize } = useTranslation();
  const { gameState } = useGameState();

  // Intro, localized for the current language
  const contactName = localize.scenes.phishing.intro.chat1.characterName;
  const introDialogs: StoryDialog[] = [
    {
      type: "dialog",
      messageType: MessageType.THOUGHT,
      text: localize.scenes.phishing.intro.player1.dialog,
      avatarUrl: IMAGES.getAvatar(gameState.avatar),
    },
    {
      type: "dialog",
      messageType: MessageType.NPC_MSG,
      text: localize.scenes.phishing.intro.chat1.dialog,
      avatarUrl: IMAGES.npcAvatars.defaultUserProfile,
      isChatMessage: true,
      chatGroup: contactName,
    },
    {
      type: "dialog",
      messageType: MessageType.THOUGHT,
      text: localize.scenes.phishing.intro.player2.dialog,
      avatarUrl: IMAGES.getAvatar(gameState.avatar),
    },
  ];

  const currentDialog = introDialogs[dialogIndex];

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
      {currentDialog.isChatMessage ? (
        <ChatRoom
          dialogs={[currentDialog]}
          onComplete={proceedPrologue}
          chatName={contactName}
          chatAvatar={IMAGES.npcAvatars.defaultUserProfile}
          isGroupChat={false}
          messageDelay={1000}
        />
      ) : (
        <Dialog element={currentDialog} onClick={proceedPrologue} />
      )}
    </div>
  );
};
