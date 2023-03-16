import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send({ message: "Sign in required!" });
  }

  const { cart, address, city, total, fullName } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        fullName,
        address,
        city,
        total,
        userId: session.user.id,
      },
    });

    for (const item of cart) {
      const { id } = item;
      console.log(id);

      await prisma.orderItem.create({
        data: {
          productId: id,
          orderId: newOrder.id,
        },
      });
    }

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
}
