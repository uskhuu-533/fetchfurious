import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { boolean, z } from "zod";

const profileSchema = z.object({
  avatarImage: z.string().min(1, "Please enter image"),
  name: z
    .string()
    .min(1, "please enter name")
    .min(3, "Username must be at least 3 characters"),
  about: z.string().min(1, "Please enter info about yourself"),
  socialMediaURL: z.string().min(1, "Please enter a social link"),
});
export const postProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userid;
    if (userId) {
      const id = parseInt(userId);
      const validatedData = profileSchema.parse(req.body);
      if (!validatedData) {
        res.status(400).json({ error: "error" });
      }
      const { avatarImage, name, about, socialMediaURL } = validatedData;
      const user = await prisma.profile.create({
        data: {
          avatarImage: avatarImage,
          about: about,
          name: name,
          socialMediaURL: socialMediaURL,
          backgroundImage: null,
          successMessage: null,
          user: {
            connect: { id: id },
          },
        },
      });
      res.status(200).json({ succes: true });
    }
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};
