import { extractPaths } from "../../utils/Assets";

describe("extractPaths", () => {
  it("extracts all strings as paths", () => {
    const input = {
      img1: "path/to/image1.png",
      nested: {
        img2: "path/to/image2.jpg",
        arr: ["path/to/image3.svg", "not/a/path"],
      },
      arr2: [
        { img3: "path/to/image4.gif" },
        "path/to/image5.webp",
        123, // kein string, darf ignoriert werden
      ],
      nullValue: null,
      numberValue: 42,
    };

    const result = extractPaths(input);

    expect(result).toEqual([
      "path/to/image1.png",
      "path/to/image2.jpg",
      "path/to/image3.svg",
      "not/a/path",
      "path/to/image4.gif",
      "path/to/image5.webp",
    ]);
  });

  it("returns an empty array if no paths are found", () => {
    const input = {
      a: 1,
      b: null,
      c: { d: 2 },
      e: [3, 4],
    };

    const result = extractPaths(input);

    expect(result).toEqual([]);
  });

  it("returns paths directly if strings are provided", () => {
    expect(extractPaths("single/path.png")).toEqual(["single/path.png"]);
    expect(extractPaths(["a.png", "b.jpg"])).toEqual(["a.png", "b.jpg"]);
  });
});
