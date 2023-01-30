"use client";

import React from "react";
import { Categories } from "./Categories";
import { BiUser } from "react-icons/bi";
import { IoBagHandle } from "react-icons/io5";

export default function Navbar() {
  return (
    <div>
      <div className='flex justify-between w-full py-2 z-10'>
        <div className='flex items-center'>
          <h1 className='font-bold'>Z-Store</h1>
          <div className='pl-4'>
            <Categories />
          </div>
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
