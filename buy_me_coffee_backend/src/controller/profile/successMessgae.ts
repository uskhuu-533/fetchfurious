import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

const messgae = z.object({
  successMessage: z.string().min(1, "successMessage required"),
});

export const putMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.userid;
    const data = messgae.parse(req.body);

    if (userId) {
      if (data) {
        const id = Number(userId);
        const { successMessage } = data;
        const putsuccess = await prisma.profile.update({
          where: {
            userId: id,
          },
          data: {
            successMessage,
          },
        });
        res.status(200).send({
          success: true,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Not updated",
    });
  }
};
