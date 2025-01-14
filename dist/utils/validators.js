"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCoordinates = isValidCoordinates;
function isValidCoordinates(coords) {
    const isValid = Array.isArray(coords) &&
        coords.every((point) => Array.isArray(point) && point.length === 2 && point.every((num) => typeof num === "number"));
    return isValid;
}
