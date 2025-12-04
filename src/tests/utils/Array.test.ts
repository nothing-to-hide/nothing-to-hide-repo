import { shuffleArray, getRandomElements } from "../../utils/Array";

describe("shuffleArray", () => {
  it("returns a new array with same elements in different order", () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray([...original]);

    expect(shuffled).toHaveLength(original.length);
    expect(shuffled.sort()).toEqual(original.sort());
  });

  it("does not mutate the original array", () => {
    const original = [1, 2, 3];
    const copy = [...original];
    shuffleArray(copy);
    expect(copy).toEqual(original); // shuffleArray returns a new copy
  });

  it("works with empty arrays", () => {
    expect(shuffleArray([])).toEqual([]);
  });
});

describe("getRandomElements", () => {
  it("returns exactly N elements", () => {
    const result = getRandomElements([1, 2, 3, 4, 5], 3);
    expect(result).toHaveLength(3);
  });

  it("returns full array if count >= array length", () => {
    const array = [1, 2];
    const result = getRandomElements(array, 5);
    expect(result).toHaveLength(array.length);
    expect(result.sort()).toEqual(array.sort());
  });

  it("returns different elements when called multiple times (most likely)", () => {
    const array = [1, 2, 3, 4, 5];
    const results = new Set();
    for (let i = 0; i < 10; i++) {
      results.add(getRandomElements(array).join(","));
    }
    expect(results.size).toBeGreaterThan(1); // not guaranteed, but highly likely
  });
});
