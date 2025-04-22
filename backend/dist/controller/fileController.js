"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getalldata = exports.deleteFile = exports.editFile = exports.createFile = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const DbModel_1 = require("../model/DbModel");
const createFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, team } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        // Check if the file already exists for the team
        const isFileExist = yield DbModel_1.File.findOne({ name, team });
        if (isFileExist) {
            return res
                .status(400)
                .json({ message: "File with the same name already exists" });
        }
        // Create the new file
        const newFile = new DbModel_1.File({
            name,
            team,
            canvasData: {}, // or whatever minimal data makes sense
            editorData: { blocks: [], time: Date.now() }, // mimicking typical structure
            createdBy: userId,
        });
        yield newFile.save();
        console.log(newFile);
        // Add the file to the team's `files` field
        yield DbModel_1.Team.findByIdAndUpdate(team, { $push: { files: newFile._id } }, { new: true });
        const cacheKey = `dashboard:${userId}`;
        yield redis_1.default.del(cacheKey);
        return res.status(201).json({
            message: "File created successfully",
            newFile,
        });
    }
    catch (error) {
        console.error("Error creating file:", error);
        return res.status(500).json({ message: "Error creating file" });
    }
});
exports.createFile = createFile;
const editFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { editorData, canvasData, fileId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        // Ensure that the data is parsed if it's a stringified object
        const parsedEditorData = typeof editorData === "string" ? JSON.parse(editorData) : editorData;
        const parsedCanvasData = typeof canvasData === "string" ? JSON.parse(canvasData) : canvasData;
        // Find the file by its ID
        const file = yield DbModel_1.File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        // Update file fields
        file.editorData = parsedEditorData;
        file.canvasData = parsedCanvasData;
        // Save the updated file document
        yield file.save();
        console.log("File updated successfully:", file);
        return res.status(200).json({ message: "File edited successfully", file });
    }
    catch (error) {
        console.error("Error editing file:", error);
        return res.status(500).json({ message: "Error editing file" });
    }
});
exports.editFile = editFile;
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { fileId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        // Step 1: Find the file to delete
        const file = yield DbModel_1.File.findById({ _id: fileId });
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        // Step 2: Check if the user is the creator of the file
        if (file.createdBy.toString() !== userId) {
            return res
                .status(403)
                .json({ message: "You are not authorized to delete this file" });
        }
        // Step 3: Find the associated team and remove the file reference from the team's files array
        const team = yield DbModel_1.Team.findById(file.team);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        // Remove the file ID from the team's 'files' array
        team.files = team.files.filter((fileId) => fileId.toString() !== file._id);
        yield team.save();
        // Step 4: Delete the file from the File collection
        yield file.deleteOne();
        const cacheKey = `dashboard:${userId}`;
        yield redis_1.default.del(cacheKey);
        return res.status(200).json({ message: "File deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting file:", error);
        return res.status(500).json({ message: "Error deleting file" });
    }
});
exports.deleteFile = deleteFile;
const getalldata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { file_id } = req.query;
    const userId = req.user.userId;
    try {
        const file = yield DbModel_1.File.findById(file_id)
            .populate({
            path: "createdBy",
            select: {
                _id: true,
                name: true,
                profilePicture: true,
            },
        })
            .populate({
            path: "team",
            select: {
                _id: true,
                name: true,
            },
            populate: [{
                    path: 'members',
                    select: {
                        _id: true,
                        name: true,
                        profilePicture: true,
                    }
                }]
        });
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        const team = yield DbModel_1.Team.findById(file.team);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        const user = yield DbModel_1.User.findById(team.members.find((member) => member._id.toString() === userId));
        if (!user) {
            return res.status(404).json({ message: "you can't access the file" });
        }
        return res
            .status(200)
            .json({ message: "Data fetched successfully", file, team });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ message: "Error fetching data" });
    }
});
exports.getalldata = getalldata;
