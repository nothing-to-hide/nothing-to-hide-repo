import "./dialog.css";
import { StoryDialog } from "../../../types/game/Story";
import { useDialog } from "../../../utils/hooks/useDialog";
import { DialogContent } from "./DialogContent";
import { DialogButton } from "./DialogButton";

type DialogProps = {
  element: string | StoryDialog;
  onClick?: () => void;
};

export function Narration({ element, onClick }: DialogProps) {
  const { parts, typewriterIndex, animatedText, showButton } = useDialog(element);

  return (
    <div
      className="narrator-container"
      onClick={showButton ? onClick : undefined}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="narrator-content">
        <DialogContent
          parts={parts}
          typewriterIndex={typewriterIndex}
          animatedText={animatedText}
          variant="narrator"
        />
      </div>
      <DialogButton
        showButton={showButton}
        onClick={onClick}
      />
    </div>
  );
}