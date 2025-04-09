"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const getJwtToken_1 = require("../utils/getJwtToken");
const authRouter = (0, express_1.Router)();
authRouter.get("/google", passport_1.default.authenticate("google", {
    scope: ["email"],
}));
authRouter.get('/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login', session: false
}), (req, res) => {
    if (req.user) {
        const user = req.user;
        const token = (0, getJwtToken_1.generateToken)(user._id, user.email);
        res.redirect(`http://localhost:5173/login?token=${token}`);
    }
    else {
        res.status(401).json({ message: 'Authentication failed' });
    }
});
exports.default = authRouter;
