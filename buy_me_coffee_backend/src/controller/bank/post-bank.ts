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

export const postBank = async (req: Request, res: Response) => {
  try {
    const userId = req.userid
    const data = bankCardSchema.parse(req.body);
    if (userId) {
      if (data) {
        const { cardNumber, country, lastName, firstName, expiryDate } = data;
        const id = parseInt(userId);
        const expiry = expiryDate.split("/");
        const month = parseInt(expiry[0]);
        const year = parseInt(
          expiry[1].length === 2 ? `20${expiry[1]}` : expiry[1]
        );
        const newBank = await prisma.bankCard.create({
          data: {
            cardNumber,
            country,
            lastName,
            firstName,
            expiryDate: new Date(year, month, 1).toISOString(),
            user: {
              connect: {
                id
              },
            },
          },
        });

        res.status(201).json({
          success: true,
          message: "Bank data successfully",
          data: newBank,
        });
      }else{
        res.status(405).json({error: "type error"})
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "an error occured while adding bank data",
    });
  }
};
