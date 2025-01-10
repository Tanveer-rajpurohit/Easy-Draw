import mongoose, { Schema, Document, Model } from "mongoose";

// User Schema
interface IUser extends Document {
  googleId: string; // Unique Google ID for the user
  name: string;
  email: string;
  profilePicture?: string;
  teams: mongoose.Types.ObjectId[]; // References to teams the user belongs to
}

// Team Schema
interface ITeam extends Document {
  name: string;
  description?: string;
  members: mongoose.Types.ObjectId[]; // References to User documents
  files: mongoose.Types.ObjectId[]; // References to File documents
  createdAt: Date;
  createdBy: mongoose.Types.ObjectId; // Reference to the user who created the team
  inviteLink: string;
}

// File Schema
interface IFile extends Document {
  name: string;
  team: mongoose.Types.ObjectId; // Reference to the Team document
  canvasData: object; // Stores canvas content as JSON
  editorData: object; // Stores Editor.js content as JSON
  createdBy: mongoose.Types.ObjectId; // Reference to the user who created the file
  updatedAt: Date;
}




const UserSchema = new Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }], // Use mongoose.Schema.Types.ObjectId
});


const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Use mongoose.Schema.Types.ObjectId
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }], // Use mongoose.Schema.Types.ObjectId
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, 
  inviteLink: { type: String, required: true, unique: true }
});


const FileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }, // Use mongoose.Schema.Types.ObjectId
  canvasData: { type: Object, required: true }, // JSON format
  editorData: { type: Object, required: true }, // JSON format
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Use mongoose.Schema.Types.ObjectId
  updatedAt: { type: Date, default: Date.now },
});

// Exporting Models
export const User: Model<IUser> = mongoose.model("User", UserSchema);
export const Team: Model<ITeam> = mongoose.model("Team", TeamSchema);
export const File: Model<IFile> = mongoose.model("File", FileSchema);
