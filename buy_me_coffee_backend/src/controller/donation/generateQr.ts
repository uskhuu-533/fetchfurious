import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import qr from "qr-image";
const donationSchema = z.object({
  amount: z.number(),
  specialMessage: z.string().optional(),
  socialURLOrBuyMeACoffee: z.string().min(1),
});
export const generateQrCode = async (req: Request, res: Response) => {
  const data = donationSchema.parse(req.body);  
  const userId = req.params.userId;
  try {
    if (data) {
      const { socialURLOrBuyMeACoffee, amount, specialMessage } = data;
      const user = await prisma.profile.findFirst({
        where: {
          socialMediaURL: socialURLOrBuyMeACoffee,
        },
      });      
      const qrData = `http://localhost:3000/payment/?donorid=${user?.userId}&userid=${userId}&speacialmessage=${specialMessage}&amount=${amount}`;
      const qrCode = qr.imageSync(qrData, { type: 'svg' });
      res.status(200).json({ data: qrCode, link : qrData });
    } else {
      res.status(405).json({ error: "type error" });
    }
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};
