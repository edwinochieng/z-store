import React from "react";
import Details from "@/components/product details/Details";

const getProductDetails = async (productId: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/products/${productId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Data not fetched");
  }

  return res.json();
};
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getProductDetails(params.id);

  return <Details product={data} />;
}
