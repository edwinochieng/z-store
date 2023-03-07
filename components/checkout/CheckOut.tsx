"use client";

import React from "react";
import useStore from "@/store/store";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function CheckOut() {
  const router = useRouter();
  const cart = useStore((state) => state.cartItems);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized");
    },
  });

  return (
    <div className=' rounded-md bg-white shadow-md px-3 py-4'>
      <div className='flex justify-between border-b pt-3 pb-5'>
        <h1 className='font-semibold text-lg'>Order Items</h1>
        <h2 className='font-semibold text-lg'>
          {cart.reduce((a, c) => a + c.quantity, 0)} Items
        </h2>
      </div>
      <table className='mt-4 w-full'>
        <thead className='text-sm'>
          <tr>
            <th className='text-left'>Item</th>
            <th className='text-center px-2'>Quantity</th>
            <th className='text-center px-2'>Price</th>
            <th className='text-center'>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className='border-b'>
              <td className='py-2 mr-2'>
                <div className='flex items-center '>
                  <div className='h-[50px] w-[50px]'>
                    <Image
                      src={item.image}
                      height='50'
                      width='50'
                      alt={item.name}
                      className='w-full h-full'
                    />
                  </div>
                  &nbsp;
                  <div className='pl-1 flex flex-col justify-between max-h-[50px] h-full'>
                    <span className='truncate overflow-hidden max-w-[70px] sm:max-w-[300px] w-full text-[13px]'>
                      {item.name}
                    </span>
                  </div>
                </div>
              </td>
              <td className='text-center'>{item.quantity}</td>
              <td className='text-center'>${item.price}</td>
              <td className='text-center'>${item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
        <div className='flex font-semibold justify-between py-2 uppercase'>
          <span className='text-sm'>Total cost</span>
          <span className='text-base'>
            ${cart.reduce((a, c) => a + c.quantity * c.price, 0)}
          </span>
        </div>
      </table>
    </div>
  );
}
export default dynamic(() => Promise.resolve(CheckOut), { ssr: false });
