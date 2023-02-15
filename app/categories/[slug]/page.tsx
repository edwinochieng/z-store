import ProductsList from "@/components/pagination/ProductsList";
import React from "react";

const getCategory = async (category: string) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/categories/${category}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Data not fetched");
  }

  return res.json();
};
export default async function CategoriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getCategory(params.slug);

  return (
    <div>
      <ProductsList data={data} />
    </div>
  );
}
