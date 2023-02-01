import { Products } from "@/utils/data";
import Image from "next/image";
import React from "react";

interface Data {
  data: Products;
}

export default function Product({ data }: Data) {
  return (
    <div className='w-[160px] sm:w-[180px] shadow-lg rounded-md cursor-pointer'>
      <Image
        src={data?.image}
        alt='shirt'
        width={200}
        height={100}
        className='h-[150px] sm:h-[170px] rounded-t-md'
      />
      <div className='px-1'>
        <div className='pt-0.5 flex justify-between font-semibold text-xs sm:text-sm'>
          <h1>{data?.name}</h1>
          <h1>{data?.price}</h1>
        </div>
        <div className='pb-1.5'>
          <button className='py-0.5 px-1 text-xs border rounded-lg'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
