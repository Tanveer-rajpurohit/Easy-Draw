import jwt, { JwtPayload } from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const isAuthorized = async (req: any, res: any, next: any) => {
  let token;

  const secret = process.env.JWT_SECRET as string;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, secret) as JwtPayload;
      req.user = { userId: decoded.userId };
      next();
    } catch (error) {
      console.log(error);

      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
};

export default isAuthorized;