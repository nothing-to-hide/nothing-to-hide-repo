import { useState } from "react";
import { MessageType, StoryDialog } from "../../../types/game/Story";
import { useTranslation } from "../../../utils/hooks/useTranslation";
import { Dialog } from "../../common/Dialogs/Dialog";
import { ChatRoom } from "../../common/MobilePhone/ChatRoom";
import { useGameState } from "../../../context/GameStateContext";
import { IMAGES } from "../../../constants/Images";

type SocialMediaIntroProps = {
  onComplete: () => void;
};

export const SocialMediaIntro = (props: SocialMediaIntroProps) => {
  const { onComplete } = props;
  const [dialogIndex, setDialogIndex] = useState(0);
  const { localize } = useTranslation();
  const { gameState } = useGameState();
  const CHAT_MESSAGE_DELAY_MS = 2000;

  // Intro, localized for the current language
  const chatGroupName = localize.scenes.socialMedia.intro.chatGroupName;
  const introDialogs: StoryDialog[] = [
    {
      type: "dialog",
      messageType: MessageType.NPC_MSG,
      text: localize.scenes.socialMedia.intro.chat1.dialog,
      avatarUrl: IMAGES.npcAvatars.max,
      characterName: localize.scenes.socialMedia.intro.chat1.characterName,
      isChatMessage: true,
    },
    {
      type: "dialog",
      messageType: MessageType.NPC_MSG,
      text: localize.scenes.socialMedia.intro.chat2.dialog,
      characterName: localize.scenes.socialMedia.intro.chat2.characterName,
      isChatMessage: true,
    },
    {
      type: "dialog",
      messageType: MessageType.NPC_MSG,
      text: localize.scenes.socialMedia.intro.chat3.dialog,
      characterName: localize.scenes.socialMedia.intro.chat3.characterName,
      isChatMessage: true,
    },
    {
      type: "dialog",
      messageType: MessageType.NPC_MSG,
      text: localize.scenes.socialMedia.intro.chat4.dialog,
      avatarUrl: IMAGES.npcAvatars.max,
      characterName: localize.scenes.socialMedia.intro.chat4.characterName,
      isChatMessage: true,
    },
    {
      type: "dialog",
      messageType: MessageType.THOUGHT,
      text: localize.scenes.socialMedia.intro.player1.dialog,
      avatarUrl: IMAGES.getAvatar(gameState.avatar),
      characterName: gameState.playerName,
    },
    {
      type: "dialog",
      messageType: MessageType.THOUGHT,
      text: localize.scenes.socialMedia.intro.player2.dialog,
      avatarUrl: IMAGES.getAvatar(gameState.avatar),
      characterName: gameState.playerName,
    },
  ];

  const currentDialog = introDialogs[dialogIndex];

  /**
   * Advances the prologue:
   * – if in a chat group, skips ahead to the next non‐chat or new group turn
   * – otherwise just steps to the next dialog
   */
  const proceedPrologue = () => {
    const nextIndex = currentDialog.isChatMessage
      ? introDialogs.findIndex(
          (dialog, idx) =>
            idx > dialogIndex &&
            (dialog.chatGroup !== currentDialog.chatGroup || !dialog.isChatMessage)
        )
      : dialogIndex + 1;

    if (nextIndex >= 0 && nextIndex < introDialogs.length) {
      setDialogIndex(nextIndex);
    } else {
      onComplete();
    }
  };

  return (
    <>
      {currentDialog.isChatMessage ? (
        <ChatRoom
          dialogs={introDialogs.filter(
            (d) => d.isChatMessage && d.chatGroup === currentDialog.chatGroup,
          )}
          onComplete={proceedPrologue}
          chatName={chatGroupName}
          chatAvatar={IMAGES.chatRoomIcons.schoolChatRoom}
          isGroupChat={true}
          messageDelay={CHAT_MESSAGE_DELAY_MS}
        />
      ) : (
        <Dialog element={currentDialog} onClick={proceedPrologue} />
      )}
    </>
  );
};
