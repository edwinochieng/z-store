import Banner from "@/components/Banner";
import ProductsList from "@/components/pagination/ProductsList";

export default function Home() {
  return (
    <div>
      <div>
        <Banner />
      </div>
      <div>
        <ProductsList />
      </div>
    </div>
  );
}
