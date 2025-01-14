import jwt from "jsonwebtoken";

// Variable to store the dynamic token
let dynamicToken: string | null = null;

// Generates a dynamic token based on the seed from .env
export const generateDynamicToken = () => {
  const secret = process.env.JWT_SECRET || "default_secret"; // Token seed
  dynamicToken = jwt.sign(
    { role: "dynamic_user" }, // Token payload
    secret,
    { expiresIn: "1d" } // Expiration time
  );
};

// Returns the current dynamic token
export const getDynamicToken = () => {
  if (!dynamicToken) {
    generateDynamicToken(); // Generate a token if it doesn't exist
  }
  return dynamicToken;
};

// Validates if a token matches the current dynamic token
export const validateDynamicToken = (token: string): boolean => {
  return token === dynamicToken;
};