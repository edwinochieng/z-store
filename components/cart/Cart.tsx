"use client";

import React from "react";
import useStore from "@/store/store";
import EmptyCart from "./EmptyCart";
import Image from "next/image";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

export default function Cart() {
  const cart = useStore((state) => state.cartItems);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  if (cart.length == 0) {
    return <EmptyCart />;
  }

  return (
    <div className='bg-gray-100'>
      <div className='container mx-auto mt-10'>
        <div className='flex shadow-md my-10'>
          <div className='w-3/4 bg-white px-10 py-10'>
            <div className='flex justify-between border-b pb-8'>
              <h1 className='font-semibold text-2xl'>Shopping Cart</h1>
              <h2 className='font-semibold text-2xl'>{cart.length} Items</h2>
            </div>
            <div className='flex mt-10 mb-5'>
              <h3 className='font-semibold text-gray-600 text-xs uppercase w-2/5'>
                Product Details
              </h3>
              <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5 '>
                Quantity
              </h3>
              <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5 '>
                Price
              </h3>
              <h3 className='font-semibold text-center text-gray-600 text-xs uppercase w-1/5 '>
                Total
              </h3>
            </div>

            {cart.map((item) => (
              <div
                key={item.id}
                className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'
              >
                <div className='flex w-2/5'>
                  <div className='w-[50px]'>
                    <Image
                      className='h-full'
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className='flex flex-col justify-between ml-4 flex-grow'>
                    <span className='font-bold text-sm'>{item.name}</span>

                    <span
                      onClick={() => removeFromCart(item)}
                      className='font-semibold hover:text-red-500 text-gray-500 text-xs'
                    >
                      Remove
                    </span>
                  </div>
                </div>

                <div className='flex items-center justify-center w-1/5'>
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

                <span className='text-center w-1/5 font-semibold text-sm'>
                  ${item.price}
                </span>
                <span className='text-center w-1/5 font-semibold text-sm'>
                  ${item.quantity * item.price}
                </span>
              </div>
            ))}

            <Link
              href='/'
              className='flex items-center font-semibold text-indigo-600 text-sm mt-10'
            >
              <FaLongArrowAltLeft className='fill-current mr-1 text-indigo-600 w-4' />
              Continue Shopping
            </Link>
          </div>

          <div id='summary' className='w-1/4 px-8 py-10'>
            <h1 className='font-semibold text-2xl border-b pb-8'>
              Order Summary
            </h1>
            <div className='flex justify-between mt-10 mb-5'>
              <span className='font-semibold text-sm uppercase'>Items 3</span>
              <span className='font-semibold text-sm'>
                ${cart.reduce((a, c) => a + c.quantity * c.price, 0)}
              </span>
            </div>

            <div className='border-t mt-8'>
              <div className='flex font-semibold justify-between py-6 text-sm uppercase'>
                <span>Total cost</span>
                <span>
                  ${cart.reduce((a, c) => a + c.quantity * c.price, 0)}
                </span>
              </div>
              <button className='bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
