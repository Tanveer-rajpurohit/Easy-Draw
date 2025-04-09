"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isLoggedIn_1 = __importDefault(require("../middleware/isLoggedIn"));
const TeamController_1 = require("../controller/TeamController");
const teamRouter = (0, express_1.Router)();
teamRouter.post('/create', isLoggedIn_1.default, TeamController_1.createTeam);
teamRouter.post('/join', isLoggedIn_1.default, TeamController_1.joinTeam);
exports.default = teamRouter;
