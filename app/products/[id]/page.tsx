import React from "react";
import { Products, products } from "@/utils/data";
import Image from "next/image";

export default function ProductPage({ params }: { params: { id: number } }) {
  const product = products.find((item) => item.id == params.id);

  return (
    <div className='flex flex-col sm:flex-row justify-center gap-1 lg:gap-5'>
      <div>
        <Image
          src={product?.image!}
          alt={product?.name!}
          height={300}
          width={300}
        />
      </div>
      <div className='pt-2 md:pt-0 md:pl-4'>
        <div className='text-gray-800'>
          <h1 className='font-bold text-2xl'>{product?.name}</h1>
          <h1 className='font-semibold text-xl pt-1'>${product?.price}</h1>
        </div>
        <div className='pt-2'>
          <button className='p-2 font-semibold bg-gray-700 text-white text-sm rounded hover:bg-gray-50 hover:text-gray-800 hover:border border-gray-100'>
            Add to Cart
          </button>
        </div>
        <div className='pt-6'>
          <h1 className='text-lg font-semibold text-gray-700'>
            Product Details
          </h1>
          <p></p>
        </div>
      </div>
    </div>
  );
}
