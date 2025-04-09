"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const isLoggedIn_1 = __importDefault(require("../middleware/isLoggedIn"));
const userRouter = (0, express_1.Router)();
userRouter.get('/dashboard', isLoggedIn_1.default, userController_1.getDashboardData);
exports.default = userRouter;
