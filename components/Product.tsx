"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import useStore from "@/store/store";
import { Products } from "@/pages/api/products";
import { MdOutlineShoppingCart } from "react-icons/md";

interface Data {
  data: Products;
}

export default function Product({ data }: Data) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className='w-[160px] sm:w-[190px] shadow-xl rounded-md cursor-pointer'>
      <Link href={`/products/${data.id}`}>
        <Image
          src={data.image}
          alt='shirt'
          width={200}
          height={100}
          className='h-[150px] sm:h-[170px] rounded-t-md'
        />
      </Link>
      <div className='px-0.5'>
        <div className='pt-0.5 pb-1 font-semibold'>
          <h1 className='truncate overflow-hidden text-gray-800 text-[13px]'>
            {data.name}
          </h1>
        </div>

        <div className='px-0.5 pb-1.5 flex justify-between items-center'>
          <span className='font-semibold text-gray-700 text-[16px]'>
            ${data.price}
          </span>
          <button
            onClick={() => addToCart({ ...data })}
            className='py-1 px-2 rounded-lg bg-gray-100 text-gray-800'
          >
            <MdOutlineShoppingCart size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
