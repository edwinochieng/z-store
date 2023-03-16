import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.query.id },
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
}
