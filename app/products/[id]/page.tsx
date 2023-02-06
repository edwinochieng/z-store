import React from "react";
import { products } from "@/utils/data";
import Details from "@/components/product details/Details";

export default function ProductPage({ params }: { params: { id: number } }) {
  const product = products.find((item) => item.id == params.id);

  return <Details product={product} />;
}
