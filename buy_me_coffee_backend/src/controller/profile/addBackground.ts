import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addBackground = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { backgroundImage } = req.body;
    if (userId) {
      const id = parseInt(userId);
      const profile = await prisma.profile.update({
        where: {
          userId: id,
        },
        data: {
          backgroundImage: backgroundImage,
        },
      });
    }
    res.status(200).json({ succes: true });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};
