import { StoryDialog } from "../../../types/game/Story";
import { useDialog } from "../../../utils/hooks/useDialog";
import { DialogContent } from "./DialogContent";
import { DialogButton } from "./DialogButton";

type ThoughtProps = {
  element: string | StoryDialog;
  onClick?: () => void;
};

export function Speech({ element, onClick }: ThoughtProps) {
  const { parts, typewriterIndex, animatedText, showButton, avatarUrl, characterName } =
    useDialog(element);

  return (
    <div
      className="speech-container"
      onClick={showButton ? onClick : undefined}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="speech-bubble">
        <DialogContent
          parts={parts}
          typewriterIndex={typewriterIndex}
          animatedText={animatedText} variant={"narrator"}        />
      </div>
      {avatarUrl && (
        <div className="speech-avatar">
          <img src={avatarUrl} alt={characterName || "Character"} />
        </div>
      )}
      <DialogButton showButton={showButton} onClick={onClick} />
    </div>
  );
}
