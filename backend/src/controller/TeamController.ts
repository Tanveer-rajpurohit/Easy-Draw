import { v4 as uuidv4 } from 'uuid'; // For generating a unique invite link
import { Team, User } from "../model/DbModel";
import redis from '../config/redis';

const createTeam = async (req: any, res: any): Promise<any> => {
  const { name, description } = req.body;
  const userId = req.user?.userId;

  try {
    const existingTeam = await Team.findOne({ name: name, createdBy: userId });

    if (existingTeam) {
      return res.status(409).json({ message: "Team already exists" });
    }

    // Generate a unique invite link for the team
    const inviteLink = uuidv4(); // Unique invite link using uuid

    // Create a new team with the invite link
    const newTeam = await Team.create({
      name,
      description,
      createdBy: userId,
      members: [userId],
      inviteLink, // Save the invite link in the team
    });

    await newTeam.save();

    // Add the team to the user's `teams` field
    await User.findByIdAndUpdate(
      userId, // ID of the user
      { $push: { teams: newTeam._id } }, // Push the new team ID into the teams array
      { new: true }
    );

    const cacheKey = `dashboard:${userId}`;
    await redis.del(cacheKey);

    return res.status(201).json({
      message: "Team created successfully",
      team: newTeam,
      inviteLink: newTeam.inviteLink // Return the invite link to the user
    });
  } catch (error) {
    console.error("Error creating team:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const joinTeam = async (req: any, res: any) => {
  const { inviteLink } = req.body;
  const userId = req.user?.userId; // Ensure userId is set correctly

  
  if (!userId) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  try {
    // Find the team with the given invite link
    const team = await Team.findOne({ inviteLink });

    if (!team) {
      return res.status(404).json({ message: "Invalid invite link or team not found" });
    }

    // Check if the user is already a member of the team
    if (team.members.includes(userId)) {
      return res.status(400).json({ message: "You are already a member of this team" });
    }

    // Add the user to the team
    team.members.push(userId); // Ensure userId is valid
    await team.save();

    // Add the team to the user's teams list
    await User.findByIdAndUpdate(userId, { $push: { teams: team._id } });

    const cacheKey = `dashboard:${userId}`;
    await redis.del(cacheKey);

    return res.status(200).json({ message: "Successfully joined the team", team });
  } catch (error) {
    console.error("Error joining team:", error);
    return res.status(500).json({ message: "Error joining team" });
  }
};


export { createTeam,joinTeam };
