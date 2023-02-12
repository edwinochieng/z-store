import Banner from "@/components/Banner";
import ProductsList from "@/components/pagination/ProductsList";

const getProducts = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/products`);

  if (!res.ok) {
    throw new Error("Data not fetched");
  }

  return res.json();
};

export default async function Home() {
  const data = await getProducts();
  console.log(data);

  return <div>Hello</div>;
}
