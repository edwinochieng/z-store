"use client";

import React from "react";
import useStore from "@/store/store";
import EmptyCart from "./EmptyCart";
import Image from "next/image";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import dynamic from "next/dynamic";

function Cart() {
  const cart = useStore((state) => state.cartItems);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  if (cart.length == 0) {
    return <EmptyCart />;
  }

  return (
    <div className='mt-6 flex flex-col items-center'>
      <div className='max-w-[700px] bg-white shadow-md px-2 py-4'>
        <div className='flex justify-between border-b pb-5'>
          <h1 className='font-semibold text-lg'>Shopping Cart</h1>
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
                <td className='py-2'>
                  <Link
                    href={`/products/${item.id}`}
                    className='flex items-center gap-2'
                  >
                    <Image
                      src={item.image}
                      height='50'
                      width='50'
                      alt={item.name}
                    />
                    &nbsp;
                    <div className='flex flex-col justify-between'>
                      <span className='text-[14px]'>{item.name}</span>
                      <span
                        onClick={() => removeFromCart(item)}
                        className='font-semibold hover:text-red-500 text-gray-500 text-xs'
                      >
                        Remove
                      </span>
                    </div>
                  </Link>
                </td>
                <td className='text-center'>
                  <div className='flex items-center justify-center'>
                    <AiOutlineMinus
                      onClick={() => updateQuantity(item, "decrease")}
                      className='fill-current text-gray-600 w-3'
                    />

                    <div className='mx-2 border text-center w-8'>
                      {item.quantity}
                    </div>

                    <AiOutlinePlus
                      onClick={() => updateQuantity(item, "increase")}
                      className='fill-current text-gray-600 w-3'
                    />
                  </div>
                </td>
                <td className='text-center'>${item.price}</td>
                <td className='text-center'>${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <Link
            href='/'
            className='flex items-center font-semibold text-indigo-600 text-sm mt-3'
          >
            <FaLongArrowAltLeft className='fill-current mr-1 text-indigo-600 w-4' />
            Continue Shopping
          </Link>
        </div>

        {/**Order Summary */}
        <div className=' px-3 py-2'>
          <div className=''>
            <div className='flex font-semibold justify-between py-4 text-sm uppercase'>
              <span>Total cost</span>
              <span>${cart.reduce((a, c) => a + c.quantity * c.price, 0)}</span>
            </div>
            <button className='bg-indigo-500 rounded-md font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
