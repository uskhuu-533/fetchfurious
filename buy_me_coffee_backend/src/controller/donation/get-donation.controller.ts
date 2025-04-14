import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getDontion = async (req: Request, res: Response):Promise<void> => {
  try {
    const { userId } = req.params;
    const { amount, date } = req.query;

    if (!userId) {
      res.status(400).send({ error: "User ID is required" });
    }

    const whereClause: any = {
      recipientId: parseInt(userId),
    };

    if (date) {
      whereClause.createdAt = {
        gte: new Date(String(date)),
      };
    }

    if (amount) {
      whereClause.amount = Number(amount);
    }

    const donations = await prisma.donation.findMany({
      where: whereClause,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalAmount = donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );

    const donationsWithTime = donations.map((donation) => ({
      ...donation,
      displayTime: dayjs(donation.createdAt).fromNow(),
    }));

    res.status(200).send({ data: donationsWithTime, totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};
