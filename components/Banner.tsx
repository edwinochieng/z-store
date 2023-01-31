"use client";

import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className='h-[500px]'>
      <Image
        src={`/images/banner/banner1.jpg`}
        alt='banner'
        height={500}
        width={1920}
        className='h-full'
      />
    </div>
  );
}
