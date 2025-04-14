import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export const getManyProfiles = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const name = (req.query.name as string) || undefined;
    const limit = 10;
    const skip = (page - 1) * limit;
    const filter: Prisma.ProfileWhereInput = name
      ? {
          name: {
            contains: name,
            mode: "insensitive",
          },
        }
      : {};
    const totalResults = await prisma.profile.count({ where: filter });
    const results = await prisma.profile.findMany({
      where: filter,
      skip,
      take: limit,
    });
    const totalPages = Math.ceil(totalResults / limit);
    res.status(200).json({
      totalResults,
      results,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "server error sss" });
  }
};
