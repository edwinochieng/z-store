"use client";

import Image from "next/image";
import React from "react";
import { Quicksand } from "@next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function Banner() {
  return (
    <div className='relative h-[400px] md:h-[500px] rounded-lg'>
      <div className='absolute w-full h-full bg-gradient-to-r from-black' />
      <Image
        src={`/images/banner/banner1.jpg`}
        alt='banner'
        height={500}
        width={1920}
        className='h-full'
      />
      <div className='absolute top-[10%] p-4 md:p-8'>
        <h1 className={`text-3xl md:text-5xl font-bold text-white `}>
          We Bring Your <br />
          Essentials For The <br /> Modern Wardrobe.
        </h1>
        <p
          className={`pt-2 w-full md:max-w-[70%] lg:max-w-[45%] text-gray-100 font-semibold text-sm ${quicksand.className}`}
        >
          The power of great outfits is impossible to overstate. At its best,
          fashion has the ability to transform your mood, identity and, of
          course, your look. It can be fun, refreshing and purposeful.
        </p>
      </div>
    </div>
  );
}
