"use client";

import React from "react";
import useStore from "@/store/store";
import EmptyCart from "./EmptyCart";
import Image from "next/image";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function Cart() {
  const { data: session } = useSession();
  const router = useRouter();
  const cart = useStore((state) => state.cartItems);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  const checkOutHandler = (): void => {
    if (session?.user) {
      router.push("/checkout");
    } else {
      toast.error("Log in to proceed to Checkout");
      router.push("login?redirect=/checkout");
    }
  };

  if (cart.length == 0) {
    return <EmptyCart />;
  }

  return (
    <div className='mt-6 max-w-screen-sm md:max-w-[700px] w-full mx-auto'>
      <div className=' rounded-md bg-white shadow-md px-3 py-4'>
        <div className='flex justify-between border-b pt-3 pb-5'>
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
                <td className='py-2 mr-2'>
                  <div className='flex items-center '>
                    <div className='h-[50px] w-[50px]'>
                      <Link href={`/products/${item.id}`}>
                        <Image
                          src={item.image}
                          height='50'
                          width='50'
                          alt={item.name}
                          className='w-full h-full'
                        />
                      </Link>
                    </div>
                    &nbsp;
                    <div className='pl-1 flex flex-col justify-between max-h-[50px] h-full'>
                      <span className='truncate overflow-hidden max-w-[70px] sm:max-w-[300px] w-full text-[13px]'>
                        {item.name}
                      </span>
                      <span
                        onClick={() => removeFromCart(item)}
                        className='cursor-pointer font-semibold hover:text-red-500 text-gray-500 text-xs'
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </td>
                <td className='text-center'>
                  <div className='flex items-center justify-center'>
                    <AiOutlineMinus
                      onClick={() => updateQuantity(item, "decrease")}
                      className='fill-current text-gray-600 w-3 cursor-pointer'
                    />

                    <div className='mx-2 border text-center w-8'>
                      {item.quantity}
                    </div>

                    <AiOutlinePlus
                      onClick={() => updateQuantity(item, "increase")}
                      className='fill-current text-gray-600 w-3 cursor-pointer'
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
        <div className=' py-2'>
          <div className=''>
            <div className='flex font-semibold justify-between py-2 uppercase'>
              <span className='text-sm'>Total cost</span>
              <span className='text-base'>
                ${cart.reduce((a, c) => a + c.quantity * c.price, 0)}
              </span>
            </div>
            <button
              onClick={checkOutHandler}
              className='bg-indigo-500 rounded font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
