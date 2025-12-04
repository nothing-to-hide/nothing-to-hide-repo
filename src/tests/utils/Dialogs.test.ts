import { parseText } from "../../utils/Dialogs";

describe("parseText", () => {
  it("parses text without special tags as normal", () => {
    const input = "This is a simple text.";
    const { parts, typewriterIndex } = parseText(input);

    expect(parts).toEqual([{ type: "normal", content: input }]);
    expect(typewriterIndex).toBeNull();
  });

  it("parses text with a typewriter segment", () => {
    const EXPECTED_TYPEWRITER_PART_INDEX = 1;
    const input = "Start <T>typed text</T> end.";
    const { parts, typewriterIndex } = parseText(input);

    expect(typewriterIndex).toBe(EXPECTED_TYPEWRITER_PART_INDEX);
    expect(parts).toEqual([
      { type: "normal", content: "Start " },
      { type: "typewriter", content: "typed text" },
      { type: "normal", content: " end." },
    ]);
  });

  it("parses bold segments correctly", () => {
    const input = "This is <B>bold</B> and normal.";
    const { parts, typewriterIndex } = parseText(input);

    expect(typewriterIndex).toBeNull();
    expect(parts).toEqual([
      { type: "normal", content: "This is " },
      { type: "bold", content: "bold" },
      { type: "normal", content: " and normal." },
    ]);
  });

  it("parses text with both typewriter and bold segments", () => {
    const EXPECTED_TYPEWRITER_PART_INDEX = 1;
    const input = "Before <T>typewriter <B>bold inside</B></T> after.";
    const { parts, typewriterIndex } = parseText(input);

    expect(typewriterIndex).toBe(EXPECTED_TYPEWRITER_PART_INDEX);
    expect(parts).toEqual([
      { type: "normal", content: "Before " },
      { type: "typewriter", content: "typewriter <B>bold inside</B>" },
      { type: "normal", content: " after." },
    ]);
  });

  it("parses multiple bold segments", () => {
    const input = "<B>Bold1</B> normal <B>Bold2</B>";
    const { parts, typewriterIndex } = parseText(input);

    expect(typewriterIndex).toBeNull();
    expect(parts).toEqual([
      { type: "bold", content: "Bold1" },
      { type: "normal", content: " normal " },
      { type: "bold", content: "Bold2" },
    ]);
  });

  it("handles empty string input", () => {
    const { parts, typewriterIndex } = parseText("");
    expect(parts).toEqual([{ type: "normal", content: "" }]);
    expect(typewriterIndex).toBeNull();
  });
});
