import { TextPart } from "../../../utils/Dialogs";

type DialogContentProps = {
  parts: TextPart[];
  typewriterIndex: number | null;
  animatedText: string;
  variant: "dialog" | "narrator" | "thought" | "speech";
};

export function DialogContent({
  parts, 
  animatedText,
  variant
}: DialogContentProps) {
  return (
    <>
      {parts.map((part, index) => {
        // typewriter animated text
        if (part.type === "typewriter") {
          if (variant === "narrator") {
            return <span key={index} className="narrator-text">{animatedText}</span>;
          } else if (variant === "thought") {
            return <span key={index} className="thought-text">{animatedText}</span>;
          } else {
            return <span key={index}>{animatedText}</span>;
          }
        }
        
        // bold text
        if (part.type === "bold") {
          // remove brackets if needed
          const content = part.content.replace(/^\s*\[(.*)\]\s*$/, "$1");
          
          if (variant === "narrator") {
            return <span key={index} className="narrator-emphasis">{content}</span>;
          } else if (variant === "thought") {
            return <div key={index} className="thought-action">{content}</div>;
          } else {
            return <strong key={index}>{content}</strong>;
          }
        }
        
        // normal text
        if (variant === "narrator") {
          return <span key={index} className="narrator-text">{part.content}</span>;
        } else {
          return <span key={index}>{part.content}</span>;
        }
      })}
    </>
  );
}