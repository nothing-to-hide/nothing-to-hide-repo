import { useState, useEffect, useRef } from "react";
import { StoryDialog } from "../../../types/game/Story";
import "./chatRoom.css";
import { TypingIndicator } from "../../../utils/TypingIndicator";
import { ChatMessage } from "./ChatMessage";
import { useTranslation } from "../../../utils/hooks/useTranslation";

interface ChatRoomProps {
  dialogs: StoryDialog[];
  onComplete: () => void;
  chatName?: string;
  chatAvatar?: string;
  className?: string;
  isGroupChat?: boolean;
  messageDelay: number;
}

const DEFAULT_MESSAGE_DELAY_MS = 2000;


export const ChatRoom = ({
                           dialogs,
                           onComplete,
                           chatName = "Chat",
                           chatAvatar,
                           className = "",
                           isGroupChat = false,
                           messageDelay = DEFAULT_MESSAGE_DELAY_MS,
                         }: ChatRoomProps) => {
  const FRAME_APPEAR_DELAY_MS = 300;
  const MESSAGE_APPEAR_DELAY_MS = 500;

  const [visibleCount, setVisibleCount] = useState(0);
  const [showFrame, setShowFrame] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { localize } = useTranslation();

  // animate phone frame appearing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFrame(true);
    }, FRAME_APPEAR_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // auto-advance messages with typing indicators
  useEffect(() => {
    if (!showFrame) return;

    if (visibleCount < dialogs.length) {
      setIsTyping(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIsTyping(false);

        setTimeout(() => {
          setVisibleCount((prev) => prev + 1);
        }, MESSAGE_APPEAR_DELAY_MS);
      }, messageDelay);
    }

    // cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visibleCount, dialogs.length, showFrame, messageDelay]);

  // Scroll to bottom when new messages appear
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [visibleCount, isTyping]);

  if (!showFrame) return null;

  return (
    <div className="chat-room">
      <div className={`chat-room-background ${className}`}></div>
      <div className="chat-frame">
        <div className="chat-header">
          {chatAvatar && (
            <div className="chat-header-avatar">
              <img src={chatAvatar} alt={chatName} />
            </div>
          )}
          <div className="chat-header-info">
            <h3>{chatName}</h3>
            {/* load in the names of the participants */}
            <p>
              {isGroupChat
                ? `${dialogs
                  .map((dialog) => dialog.characterName)
                  .filter((name, idx, arr) => arr.indexOf(name) === idx)
                  .join(", ")}, ${localize.general.common.You}`
                : "Online"}
            </p>{" "}
          </div>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          <div className="chat-content">
            {dialogs.slice(0, visibleCount).map((dialog, idx) => (
              <ChatMessage key={idx} dialog={dialog} displayName={dialog.characterName} />
            ))}

            {isTyping && <TypingIndicator />}
          </div>

          {/* Continue button appears when all messages are shown */}
          {visibleCount === dialogs.length && !isTyping && (
            <div className="chat-continue">
              <button onClick={onComplete} className="button">
                {localize.commonGame.playerSetup.continueButton} →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};