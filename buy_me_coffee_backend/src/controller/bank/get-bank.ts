import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getBank = async (req: Request, res: Response) => {
  try {
    const userId = req.userid;
    if (userId) {
      const cardNumber = await prisma.bankCard.findFirst({
        where: {
          userId: parseInt(userId),
        },
      });
      if (!cardNumber) {
        res.status(404).send({ success: false, message: "Bank not found" });
      } else {
        res.status(200).json({
          success: true,
          data: cardNumber,
        });
      }
    }
  } catch (error) {
    console.error("Error fetching bank details:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while fetching bank details",
    });
  }
};
