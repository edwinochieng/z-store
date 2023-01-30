"use client";

import React from "react";
import { BiUser } from "react-icons/bi";
import { IoBagHandle } from "react-icons/io5";

export default function Navbar() {
  return (
    <div>
      <div className='flex justify-between w-full py-2'>
        <div className='flex items-center'>
          <h1 className='font-bold'>Z-Store</h1>
          <h1 className='pl-4'>Categories</h1>
        </div>
        <div className='flex items-center'>
          <div>
            <BiUser />
          </div>
          <div className='pl-4'>
            <IoBagHandle />
          </div>
        </div>
      </div>
    </div>
  );
}
