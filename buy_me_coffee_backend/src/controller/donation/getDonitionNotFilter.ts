import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
export const getDontionNotFilter = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (userId) {
      const donations = await prisma.donation.findMany({
        where: {
          recipientId: parseInt(userId),
        },
        include: {
          donor: {
            select: {
              id: true,
              profile: {
                select: {
                  name: true,
                  avatarImage: true,
                },
              },
            },
          },
        },
      });
      res.status(200).send({ data: donations });
    }
  } catch (error) {
    res.status(500).send({ error: "server error" });
  }
};
