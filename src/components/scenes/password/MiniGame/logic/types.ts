import React from "react";

export type Password = {
  value: string;
  valid: boolean;
};

export type FallingPassword = {
  id: number;
  x: number;
  y: number;
  speed: number;
  ref: React.RefObject<HTMLDivElement | null>;
} & Password;
