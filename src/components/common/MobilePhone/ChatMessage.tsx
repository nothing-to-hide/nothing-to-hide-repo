import { IMAGES } from "../../../constants/Images";
import { MessageType, StoryDialog } from "../../../types/game/Story";
import { getCurrentTime } from "../../../utils/GetCurrentTime";

// msg helper
const nameColorMap: Record<string, string> = {};

const predefinedColors = [
  "#3cb44b",
  "#46f0f0",
  "#ff9844ff",
  "#bcf60c",
];

function generateRandomColor(): string {
  const index = Math.floor(Math.random() * predefinedColors.length);
  const color = predefinedColors.splice(index, 1);
  return String(color);
}

function nameColor(name: string): React.CSSProperties {
  if (!(name in nameColorMap)) {
    nameColorMap[name] = generateRandomColor();
  }
  return { color: nameColorMap[name] };
}

// new ChatMessage component
export const ChatMessage = ({
  dialog,
  displayName,
}: {
  dialog: StoryDialog;
  displayName?: string;
}) => {
  const isNPC = dialog.messageType === MessageType.NPC_MSG;

  return (
    <div className={`chat-message ${isNPC ? "npc-message" : "player-message"}`}>
      <div className="message-avatar">
        <img
          src={dialog.avatarUrl ? dialog.avatarUrl : IMAGES.npcAvatars.defaultUserProfile}
          alt={displayName || "Avatar"}
        />
      </div>
      <div className="message-bubble">
        <div className="message-contact" style={nameColor(String(displayName))}>{displayName}</div>
        <div className="message-text">{dialog.text}</div>
        <div className="message-time">{getCurrentTime()}</div>
      </div>
    </div>
  );
};
