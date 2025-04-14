import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userid;
    if (userId) {
      const userid = parseInt(userId);

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
