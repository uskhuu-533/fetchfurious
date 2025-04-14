import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
const donationSchema = z.object({
  amount: z.number(),
  specialMessage: z.string().optional(),
});
export const postDonation = async (req: Request, res: Response) => {
  try {
    const redirectId = req.query.recipientId;
    const userId = req.query.donorId;
    const data = donationSchema.parse(req.body);
    if (data && userId && redirectId) {
      const { amount, specialMessage } = data;
      const profile = await prisma.profile.findUnique({
        where : {
          userId : Number(userId)
        }
      })
      const donation = await prisma.donation.create({
        data: {
          amount,
          socialURLOrBuyMeACoffee :profile?.socialMediaURL || null,
          specialMessage,
          donorId: Number(userId),
          recipientId: Number(redirectId),
        },
      });
      res.status(200).json({ succes: true, createdDonation: donation });
    }
  } catch (error) {
    res.status(500).json({ error: "server error" });
  } finally {
    prisma.$disconnect();
  }
};
