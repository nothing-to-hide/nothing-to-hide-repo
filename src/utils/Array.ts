/**
 * Shuffles the elements of an array randomly.
 * @param array The array to shuffle.
 * @returns A new array with the elements shuffled.
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/**
 * Returns a specified number of random elements from an array.
 * @param array The array to select elements from.
 * @param count The number of elements to select (default: 3).
 * @returns An array containing the randomly selected elements.
 */
export const getRandomElements = <T>(array: T[], count = 3): T[] => {
  return shuffleArray(array).slice(0, count);
};
