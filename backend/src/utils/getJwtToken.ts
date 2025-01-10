import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId: string, email: string) => {
  try {
    const token = jwt.sign(
      { userId, email },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );
    return token;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
