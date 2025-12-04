export type PhishingMessage = {
  type: MessageType;
  sender: string;
  text: string;
  isPhishing: boolean;
};

export type MessageType = "email" | "sms" | "chat";

export type Coordinates = {
  x: number;
  y: number;
};

export type Bait = {
  id: number;
  xPos: number;
  yPos: number;
  message: PhishingMessage;
  correctAnswer?: boolean;
  paused?: boolean;
};

export type Direction = "left" | "right";

export type DiverAction = "idle" | "swimming";
