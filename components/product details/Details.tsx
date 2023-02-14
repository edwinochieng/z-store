"use client";

import Image from "next/image";
import React from "react";
import useStore from "@/store/store";
import { Products } from "@/pages/api/products";
import { useRouter } from "next/navigation";

interface Details {
  product: Products | undefined;
}

export default function Details({ product }: Details) {
  const addToCart = useStore((state) => state.addToCart);

  const router = useRouter();

  const addProduct = () => {
    addToCart(product!);
    router.push("/cart");
  };

  return (
    <div className='flex flex-col items-center sm:flex-row sm:items-start justify-center gap-1 lg:gap-5'>
      <div className='w-full sm:w-[300px]'>
        <Image
          src={product?.image!}
          alt={product?.name!}
          height={300}
          width={500}
        />
      </div>
      <div className='pt-2 md:pt-0 md:pl-4 max-w-[500px]'>
        <div className='text-gray-800'>
          <h1 className='font-bold text-2xl'>{product?.name}</h1>
          <h1 className='font-semibold text-xl pt-1'>${product?.price}</h1>
        </div>
        <div className='pt-3'>
          <button
            onClick={addProduct}
            className='p-2 font-semibold bg-gray-700 text-white text-sm rounded hover:bg-gray-50 hover:text-gray-800 hover:border border-gray-100'
          >
            Add to Cart
          </button>
        </div>
        <div className='pt-4'>
          <h1 className='text-lg font-semibold text-gray-700'>
            Product Details
          </h1>
          <p className=' w-full text-sm text-gray-700'>
            {product?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
