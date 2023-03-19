import OrderDetails from "@/components/checkout/OrderDetails";
import React from "react";

const getOrder = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/orders/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Data is not fetched");
  }

  return res.json();
};
export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getOrder(params.id);
  console.log(data);
  return (
    <div>
      <OrderDetails />
    </div>
  );
}
