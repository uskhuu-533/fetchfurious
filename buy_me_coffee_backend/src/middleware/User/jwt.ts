import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
declare global {
  namespace Express {
    interface Request {
      userid?: string;
    }
  }
}
type Token = { userId: string; email: string; username: string };
export const authenticationJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded: string | jsonwebtoken.JwtPayload = jsonwebtoken.verify(
        token,
        "1234"
      );

      if (decoded) {
        const decoded1 = decoded as Token;
        req.userid = decoded1.userId;
        next();
      }
    } catch (error) {
      res.status(401).send({ error: "Invalid token" });
    }
  }
};
