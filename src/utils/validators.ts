export function isValidCoordinates(coords: number[][]): boolean {
    const isValid =
      Array.isArray(coords) &&
      coords.every(
        (point) =>
          Array.isArray(point) && point.length === 2 && point.every((num) => typeof num === "number")
      );
    return isValid;
  }