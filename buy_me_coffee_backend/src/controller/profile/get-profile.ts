import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;    
    const userid = parseInt(userId);
    if (typeof userid === "number") {
      const profile = await prisma.profile.findUnique({
        where: {
          userId: userid,
        },
      });
      res.status(200).json({ result: profile });
    }
  } catch (error) {
    res.status(500).json({ error: "sever error" });
  }
};
