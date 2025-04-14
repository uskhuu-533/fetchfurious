import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from 'bcrypt'
const userPassword = z.object({
  password: z.string().min(1, "password required"),
});

export const putPassword = async (req: Request, res: Response) => {
  try {
    const userId = req.userid;
    const data = userPassword.parse(req.body);
    const {password} = data
    const hashedPassword = await bcrypt.hash(password, 10)
    if (userId) {
      if (data) {
        const id = Number(userId);
        const { password } = data;
        const put = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            password : hashedPassword
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
      message: "password not found",
    });
  }
};
