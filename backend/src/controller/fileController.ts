import redis from "../config/redis";
import { File, Team, User } from "../model/DbModel";

const createFile = async (req: any, res: any) => {
  const { name, team } = req.body;
  const userId = req.user?.userId;

  try {
    // Check if the file already exists for the team
    const isFileExist = await File.findOne({ name, team });
    if (isFileExist) {
      return res
        .status(400)
        .json({ message: "File with the same name already exists" });
    }

    // Create the new file
    const newFile = new File({
      name,
      team,
      canvasData: {},
      editorData: {},
      createdBy: userId,
    });

    await newFile.save();

    // Add the file to the team's `files` field
    await Team.findByIdAndUpdate(
      team,
      { $push: { files: newFile._id } },
      { new: true }
    );

    const cacheKey = `dashboard:${userId}`;
    await redis.del(cacheKey);

    return res.status(201).json({
      message: "File created successfully",
      newFile,
    });
  } catch (error) {
    console.error("Error creating file:", error);
    return res.status(500).json({ message: "Error creating file" });
  }
};


const editFile = async (req: any, res: any) => {
  const { editorData, canvasData, fileId } = req.body;
  const userId = req.user?.userId;

  try {
    // Ensure that the data is parsed if it's a stringified object
    const parsedEditorData =
      typeof editorData === "string" ? JSON.parse(editorData) : editorData;
    const parsedCanvasData =
      typeof canvasData === "string" ? JSON.parse(canvasData) : canvasData;

    // Find the file by its ID
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Update file fields
    file.editorData = parsedEditorData;
    file.canvasData = parsedCanvasData;

    // Save the updated file document
    await file.save();
    console.log("File updated successfully:", file);
    

    return res.status(200).json({ message: "File edited successfully", file });
  } catch (error) {
    console.error("Error editing file:", error);
    return res.status(500).json({ message: "Error editing file" });
  }
};


const deleteFile = async (req: any, res: any) => {
  const { fileId } = req.body;
  const userId = req.user?.userId;

  try {
    // Step 1: Find the file to delete
    const file = await File.findById({ _id: fileId });

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
    const team = await Team.findById(file.team);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Remove the file ID from the team's 'files' array
    team.files = team.files.filter(
      (fileId: any) => fileId.toString() !== file._id
    );
    await team.save();

    // Step 4: Delete the file from the File collection
    await file.deleteOne();

    const cacheKey = `dashboard:${userId}`;
    await redis.del(cacheKey);

    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return res.status(500).json({ message: "Error deleting file" });
  }
};

const getalldata = async (req: any, res: any) => {
  const { file_id } = req.query;

  

  const userId = req.user.userId;

  try {
    const file = await File.findById(file_id)
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


    const team = await Team.findById(file.team);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    const user = await User.findById(
      team.members.find((member: any) => member._id.toString() === userId)
    );

    if (!user) {
      return res.status(404).json({ message: "you can't access the file" });
    }

    return res
      .status(200)
      .json({ message: "Data fetched successfully", file, team });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ message: "Error fetching data" });
  }
};

export { createFile, editFile, deleteFile, getalldata };
