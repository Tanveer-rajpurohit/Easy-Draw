"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = exports.Team = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    googleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    teams: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Team" }], // Use mongoose.Schema.Types.ObjectId
});
const TeamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }], // Use mongoose.Schema.Types.ObjectId
    files: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "File" }], // Use mongoose.Schema.Types.ObjectId
    createdAt: { type: Date, default: Date.now },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    inviteLink: { type: String, required: true, unique: true }
});
const FileSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    team: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Team", required: true }, // Use mongoose.Schema.Types.ObjectId
    canvasData: { type: Object, required: true }, // JSON format
    editorData: { type: Object, required: true }, // JSON format
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, // Use mongoose.Schema.Types.ObjectId
    updatedAt: { type: Date, default: Date.now },
});
// Exporting Models
exports.User = mongoose_1.default.model("User", UserSchema);
exports.Team = mongoose_1.default.model("Team", TeamSchema);
exports.File = mongoose_1.default.model("File", FileSchema);
