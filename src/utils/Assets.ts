/**
 * Utility function to extract image paths from an object.
 * This function recursively traverses the object and collects all string values,
 * which are assumed to be image paths.
 * @param obj - The object to extract image paths from.
 * @returns An array of image paths.
 */
export const extractPaths = (obj: any): string[] => {
  const paths: string[] = [];

  const recurse = (value: any) => {
    if (typeof value === "string") {
      paths.push(value);
    } else if (Array.isArray(value)) {
      value.forEach(recurse);
    } else if (typeof value === "object" && value !== null) {
      Object.values(value).forEach(recurse);
    }
  };

  recurse(obj);
  return paths;
};
