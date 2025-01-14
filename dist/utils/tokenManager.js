"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDynamicToken = exports.getDynamicToken = exports.generateDynamicToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Variable to store the dynamic token
let dynamicToken = null;
// Generates a dynamic token based on the seed from .env
const generateDynamicToken = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined. Please configure it in the environment variables.");
    }
    dynamicToken = jsonwebtoken_1.default.sign({ role: "dynamic_user" }, // Token payload
    secret, { expiresIn: "1d" } // Expiration time
    );
};
exports.generateDynamicToken = generateDynamicToken;
// Returns the current dynamic token
const getDynamicToken = () => {
    if (!dynamicToken) {
        (0, exports.generateDynamicToken)(); // Generate a token if it doesn't exist
    }
    return dynamicToken;
};
exports.getDynamicToken = getDynamicToken;
// Validates if a token matches the current dynamic token
const validateDynamicToken = (token) => {
    return token === dynamicToken;
};
exports.validateDynamicToken = validateDynamicToken;
