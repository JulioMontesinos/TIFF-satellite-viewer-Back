"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenManager_1 = require("./tokenManager");
const authRouter = (0, express_1.Router)();
// Route to get the dynamic token
authRouter.get("/token", (req, res) => {
    const token = (0, tokenManager_1.getDynamicToken)();
    res.json({ success: true, token });
});
exports.default = authRouter;
