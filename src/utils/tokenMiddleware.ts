import { Request, Response, NextFunction } from "express";
import { validateDynamicToken } from "./tokenManager";

export const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the header

  if (!token) {
    return res.status(401).json({ success: false, message: "Token is missing" });
  }

  const isValid = validateDynamicToken(token);

  if (!isValid) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }

  next(); // Valid token, proceed with the request
};