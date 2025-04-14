import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
const bankCardSchema = z.object({
  country: z.string().min(1, "country required"),
  firstName: z.string().min(1, "firsname required"),
  lastName: z.string().min(1, "firsname required"),
  cardNumber: z.string().min(1, "firsname required"),
  expiryDate: z.string(),
});
export const putBank = async (req: Request, res: Response) => {
  try {
    const userId = req.userid;
    const data = bankCardSchema.parse(req.body);
    if (userId) {
      if (data) {
        const id = parseInt(userId);
        const { firstName, lastName, cardNumber, expiryDate, country } = data;
        const expiry = expiryDate.split("/");
        const month = parseInt(expiry[0]);
        const year = parseInt(
          expiry[1].length === 2 ? `20${expiry[1]}` : expiry[1]
        );
        const bank = await prisma.bankCard.update({
          where: {
            userId: id,
          },
          data: {
            firstName,
            lastName,
            cardNumber,
            country,
            expiryDate: new Date(year, month, 1).toISOString(),
          },
        });
        res.status(200).json({ succes: true });
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "type error",
    });
  }
};
