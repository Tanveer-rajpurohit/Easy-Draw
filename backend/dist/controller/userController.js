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
exports.getDashboardData = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const DbModel_1 = require("../model/DbModel");
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const cacheKey = `dashboard:${userId}`;
    try {
        const cacheValue = yield redis_1.default.get(cacheKey);
        if (cacheValue) {
            return res.json(JSON.parse(cacheValue));
        }
        // Fetch the user by ID and populate teams, members, createdBy, and files inside each team
        const data = yield DbModel_1.User.findById(userId)
            .populate({
            path: 'teams', // Populate the teams array
            populate: [
                {
                    path: 'members', // Populate the members field inside each team
                    model: 'User' // Reference to the User model
                },
                {
                    path: 'createdBy', // Populate the createdBy field inside each team
                    model: 'User' // Reference to the User model
                },
                {
                    path: 'files', // Populate the files array inside each team
                    model: 'File', // Reference to the File model
                    select: {
                        _id: true,
                        name: true,
                        createdAt: true,
                        createdBy: true,
                        team: true,
                        __v: true,
                    },
                    populate: {
                        path: 'createdBy', // Populate the team field inside each file
                        model: 'User' // Reference to the Team model
                    }
                }
            ]
        });
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield redis_1.default.set(cacheKey, JSON.stringify(data), "EX", 200); //40 sec to expire
        // await redis.expire(cacheKey, 10);
        // Send the populated data as response
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getDashboardData = getDashboardData;
