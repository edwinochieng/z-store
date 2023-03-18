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

    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: order?.id },
      include: { product: true },
    });

    // map OrderItem records into a new array of objects with only relevant fields
    const items = orderItems.map(({ id, quantity, product }) => ({
      id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
    }));

    // merge order and orderItem data into one object
    const orderDetails = {
      id: order?.id,
      fullName: order?.fullName,
      address: order?.address,
      city: order?.city,
      total: order?.total,
      status: order?.status,
      userId: order?.userId,
      updatedAt: order?.updatedAt,
      createdAt: order?.createdAt,
      items,
    };

    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
}
