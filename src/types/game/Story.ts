import { JSX } from "react";

/**
 * Represents a story element within the application. A story element can be
 * either a dialog or a quiz, providing flexibility for interactive storytelling.
 */
export type StoryElement = StoryDialog | StoryQuiz | StoryCustom;

export type StoryCustom = {
  type: "custom";
  component: JSX.Element;
};

/**
 * Represents a dialog element in the story. This type is used to display
 * narrative text or character dialogue to the user.
 *
 * @property type - A fixed string literal `"dialog"` identifying this as a dialog element.
 * @property messageType? - A styling help to display different styles depending on the msgType.
 * @property text - The content of the dialog, typically displayed to the user.
 * @property characterName? - Name the user has typed in.
 * @property isChatMessage - Indicates whether this dialog should be displayed in a chat interface.
 * @property chatGroup? - Optional identifier for which chat group this message belongs to.
 */
export type StoryDialog = {
  type: "dialog";
  messageType?: MessageType;
  text: string;
  avatarUrl?: string; // optional avatar that can be displayed with the dialog
  characterName?: string; // typed username to make the game more  'interactive'
  isChatMessage?: boolean; // indicates if the message should be displayed in chat interface
  chatGroup?: string; // optional identifier for different chat groups
};

/**
 * Represents a quiz element in the story. This type is used to present
 * interactive questions to the user, with multiple possible answers.
 *
 * @property type - A fixed string literal `"quiz"` identifying this as a quiz element.
 * @property text - The question or prompt text for the quiz.
 * @property answers - An array of possible answers for the quiz.
 * @property timeLimit - The time limit (in seconds) for answering the quiz.
 */
export type StoryQuiz = {
  type: "quiz";
  question: string;
  answers: { text: string; isCorrect?: boolean; description: string }[];
  timeLimit?: number;
};

/**
 * Represents the various types of messages that can appear in the story dialog system.
 * Used to determine the appropriate styling, positioning, and behavior of dialog elements.
 *
 * @enum {string}
 * @example
 * // Using MessageType in a StoryDialog
 * const narrationDialog: StoryDialog = {
 *   type: "dialog",
 *   messageType: MessageType.narrator,
 *   text: "It was a dark and stormy night..."
 * };
 */
export enum MessageType {
  NARRATOR,
  NPC_MSG,
  PLAYER_MESSAGE,
  THOUGHT,
  SPEECH,
}
