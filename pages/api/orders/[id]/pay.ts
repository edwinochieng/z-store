import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).send("Error: Signin is required");
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: req.query.id },
    });

    if (order) {
      if (order.status === "Paid") {
        return res
          .status(400)
          .send({ message: "Error: Order is already paid" });
      }

      const updatedOrder = await prisma.order.update({
        where: { id: order?.id },
        data: {
          status: "Paid",
          updatedAt: new Date(),
        },
      });

      res.status(200).json(updatedOrder);
    }
  } catch (err) {
    res.status(404).send({ message: "Error: Order not found!" });
  }
}
