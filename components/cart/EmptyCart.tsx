"use client";
import Link from "next/link";
import React from "react";
import { IoBagHandle } from "react-icons/io5";

export default function EmptyCart() {
  return (
    <div className='pt-40'>
      <div className='flex flex-col items-center'>
        <IoBagHandle size={86} className='text-slate-800' />
        <h1 className='font-semibold text-base text-slate-800'>
          Oops! Your Cart is empty
        </h1>
        <div className='pt-4'>
          <Link href='/'>
            <button className='px-4 py-2 bg-slate-800 rounded text-white text-sm font-semibold'>
              Go to Shop
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
