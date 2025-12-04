import "./dialog.css";
import { MessageType, StoryDialog } from "../../../types/game/Story";
import { useDialog } from "../../../utils/hooks/useDialog";
import { DialogContent } from "./DialogContent";
import { DialogButton } from "./DialogButton";
import { Thought } from "./Thought";
import { Narration } from "./Narration";
import { Speech } from "./Speech";
import { ReactElement } from "react";

type DialogProps = {
  element: string | StoryDialog;
  children?: ReactElement;
  onClick?: () => void;
};

export function Dialog({ element, children, onClick }: DialogProps) {
  const { parts, typewriterIndex, animatedText, showButton, avatarUrl, messageType } =
    useDialog(element);

  if (messageType === MessageType.NARRATOR) return <Narration element={element} onClick={onClick} />;
  if (messageType === MessageType.THOUGHT) return <Thought element={element} onClick={onClick} />;
  if (messageType === MessageType.SPEECH) return <Speech element={element} onClick={onClick} />;
  return (
    <div
      className="dialog-container"
      onClick={showButton ? onClick : undefined}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {avatarUrl && (
        <div className="dialog-avatar">
          <img src={avatarUrl} alt="Avatar" />
        </div>
      )}
      <div className="dialog-content">
        <DialogContent
          parts={parts}
          typewriterIndex={typewriterIndex}
          animatedText={animatedText}
          variant="dialog"
        />
        {children && children}
      </div>
      <DialogButton showButton={showButton} onClick={onClick} />
    </div>
  );
}
