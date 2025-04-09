"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileController_1 = require("../controller/fileController");
const isLoggedIn_1 = __importDefault(require("../middleware/isLoggedIn"));
const fileRouter = (0, express_1.Router)();
fileRouter.post('/create', isLoggedIn_1.default, fileController_1.createFile);
fileRouter.post('/edit', isLoggedIn_1.default, fileController_1.editFile);
fileRouter.delete('/delete', isLoggedIn_1.default, fileController_1.deleteFile);
fileRouter.get('/alldata', isLoggedIn_1.default, fileController_1.getalldata);
exports.default = fileRouter;
