"use client";

import React, { useEffect, useState } from "react";
import { Categories } from "./Categories";
import { Account } from "./Account";
import { IoBagHandle } from "react-icons/io5";
import Link from "next/link";
import useStore from "@/store/store";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const cart = useStore((state) => state.cartItems);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  useEffect(() => {
    setCartItemsCount(cart.reduce((a, c) => a + c.quantity, 0));
  }, [cart]);

  return (
    <div className='bg-transparent'>
      <div className='flex justify-between w-full py-3 z-10'>
        <div className='flex items-center'>
          <Link href='/'>
            <h1 className='font-bold text-xl'>Z-Store</h1>
          </Link>
          <div className='pl-5'>
            <Categories />
          </div>
        </div>
        <div className='flex items-center'>
          {session?.user ? (
            <Account />
          ) : (
            <div className='px-2 py-[5px] rounded-md bg-gray-700 text-xs md:text-sm text-gray-100'>
              <Link href='/login'>Sign In</Link>
            </div>
          )}

          <div className='pl-4'>
            <Link href='/cart' className='flex text-gray-800'>
              <span>
                <IoBagHandle size={24} />
              </span>

              {cartItemsCount > 0 && (
                <sup className=' bg-red-500 rounded-full h-[17px] py-[1px] px-[5px] text-white text-xs font-semibold'>
                  {cartItemsCount}
                </sup>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
