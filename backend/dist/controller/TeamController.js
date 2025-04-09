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
exports.joinTeam = exports.createTeam = void 0;
const uuid_1 = require("uuid"); // For generating a unique invite link
const DbModel_1 = require("../model/DbModel");
const redis_1 = __importDefault(require("../config/redis"));
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, description } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const existingTeam = yield DbModel_1.Team.findOne({ name: name, createdBy: userId });
        if (existingTeam) {
            return res.status(409).json({ message: "Team already exists" });
        }
        // Generate a unique invite link for the team
        const inviteLink = (0, uuid_1.v4)(); // Unique invite link using uuid
        // Create a new team with the invite link
        const newTeam = yield DbModel_1.Team.create({
            name,
            description,
            createdBy: userId,
            members: [userId],
            inviteLink, // Save the invite link in the team
        });
        yield newTeam.save();
        // Add the team to the user's `teams` field
        yield DbModel_1.User.findByIdAndUpdate(userId, // ID of the user
        { $push: { teams: newTeam._id } }, // Push the new team ID into the teams array
        { new: true });
        const cacheKey = `dashboard:${userId}`;
        yield redis_1.default.del(cacheKey);
        return res.status(201).json({
            message: "Team created successfully",
            team: newTeam,
            inviteLink: newTeam.inviteLink // Return the invite link to the user
        });
    }
    catch (error) {
        console.error("Error creating team:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createTeam = createTeam;
const joinTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { inviteLink } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Ensure userId is set correctly
    if (!userId) {
        return res.status(400).json({ message: "User is not authenticated" });
    }
    try {
        // Find the team with the given invite link
        const team = yield DbModel_1.Team.findOne({ inviteLink });
        if (!team) {
            return res.status(404).json({ message: "Invalid invite link or team not found" });
        }
        // Check if the user is already a member of the team
        if (team.members.includes(userId)) {
            return res.status(400).json({ message: "You are already a member of this team" });
        }
        // Add the user to the team
        team.members.push(userId); // Ensure userId is valid
        yield team.save();
        // Add the team to the user's teams list
        yield DbModel_1.User.findByIdAndUpdate(userId, { $push: { teams: team._id } });
        const cacheKey = `dashboard:${userId}`;
        yield redis_1.default.del(cacheKey);
        return res.status(200).json({ message: "Successfully joined the team", team });
    }
    catch (error) {
        console.error("Error joining team:", error);
        return res.status(500).json({ message: "Error joining team" });
    }
});
exports.joinTeam = joinTeam;
