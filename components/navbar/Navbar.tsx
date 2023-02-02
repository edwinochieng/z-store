"use client";

import React from "react";
import { Categories } from "./Categories";
import { Account } from "./Account";
import { IoBagHandle } from "react-icons/io5";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className='bg-transparent'>
      <div className='flex justify-between w-full py-2 z-10'>
        <div className='flex items-center'>
          <Link href='/'>
            <h1 className='font-bold text-xl'>Z-Store</h1>
          </Link>
          <div className='pl-5'>
            <Categories />
          </div>
        </div>
        <div className='flex'>
          <div>
            <Account />
          </div>
          <div className='pl-5'>
            <Link href='/cart'>
              <IoBagHandle size={24} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
