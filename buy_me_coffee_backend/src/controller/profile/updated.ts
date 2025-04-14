import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

const accountProfile = z.object({
  avatarImage: z.string().min(1, "avartarImage required"),
  name: z.string(),
  about: z.string(),
  socialMediaURL: z.string(),
});

export const putProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userid;
    const data = accountProfile.parse(req.body);
    if (userId) {
      if (data) {
        const id = Number(userId);
        const { avatarImage, name, about, socialMediaURL } = data;
        const updated = await prisma.profile.update({
          where: {
            userId: id,
          },
          data: {
            avatarImage,
            name,
            about,
            socialMediaURL,
            user: {
              connect: {
                id,
              },
            },
          },
        });
        res.status(200).send({
          success: true,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Profile not updated found",
    });
  }
};
