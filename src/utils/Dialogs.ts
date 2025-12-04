export type TextPart = {
  type: "normal" | "bold" | "typewriter";
  content: string;
};

/**
 * Parses the full text and identifies typewriter and bold segments.
 * Ensures that even empty or no-match inputs return at least one normal part.
 */
export const parseText = (
  text: string,
): {
  parts: TextPart[];
  typewriterIndex: number | null;
} => {
  const parts: TextPart[] = [];
  let typewriterIndex: number | null = null;

  // Helper: Extract bold segments and ensure at least one normal segment for empty input
  const addParts = (segment: string) => {
    const segments = extractBoldSegments(segment);
    if (segments.length === 0) {
      parts.push({ type: "normal", content: "" });
    } else {
      parts.push(...segments);
    }
  };

  const typewriterMatch = /<T>([\s\S]*?)<\/T>/.exec(text);
  if (typewriterMatch) {
    const before = text.slice(0, typewriterMatch.index);
    const typewriterContent = typewriterMatch[1];
    const after = text.slice(typewriterMatch.index + typewriterMatch[0].length);

    addParts(before);
    typewriterIndex = parts.length;
    parts.push({ type: "typewriter", content: typewriterContent });
    addParts(after);
  } else {
    addParts(text);
  }

  return { parts, typewriterIndex };
};

/**
 * Extracts <B>bold</B> segments from a text block,
 * splitting normal and bold parts accordingly.
 * Returns at least one normal part even if input is empty.
 */
const extractBoldSegments = (text: string): TextPart[] => {
  const parts: TextPart[] = [];
  const regex = /<B>([\s\S]*?)<\/B>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "normal",
        content: text.slice(lastIndex, match.index),
      });
    }
    parts.push({ type: "bold", content: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "normal", content: text.slice(lastIndex) });
  }

  // Fallback for empty input string: return one empty normal segment
  if (parts.length === 0) {
    parts.push({ type: "normal", content: "" });
  }

  return parts;
};
