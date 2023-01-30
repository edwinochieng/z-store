"use client";

import React from "react";
import { Categories } from "./Categories";
import { Account } from "./Account";
import { IoBagHandle } from "react-icons/io5";

export default function Navbar() {
  return (
    <div>
      <div className='flex justify-between w-full py-2 z-10'>
        <div className='flex items-center'>
          <h1 className='font-bold'>Z-Store</h1>
          <div className='pl-5'>
            <Categories />
          </div>
        </div>
        <div className='flex'>
          <div>
            <Account />
          </div>
          <div className='pl-5'>
            <IoBagHandle size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
