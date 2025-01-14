"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddleware = void 0;
const tokenManager_1 = require("./tokenManager");
const tokenMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract the token from the header
    if (!token) {
        return res.status(401).json({ success: false, message: "Token is missing" });
    }
    const isValid = (0, tokenManager_1.validateDynamicToken)(token);
    if (!isValid) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
    next(); // Valid token, proceed with the request
};
exports.tokenMiddleware = tokenMiddleware;
