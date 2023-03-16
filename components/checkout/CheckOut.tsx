"use client";

import React, { useState } from "react";
import useStore from "@/store/store";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { getError } from "@/utils/error";
import LoadingSpinner from "../LoadingSpinner";

interface AddressInputs {
  fullName: string;
  address: string;
  city: string;
}

function CheckOut() {
  const router = useRouter();
  const cart = useStore((state) => state.cartItems);
  const clearCart = useStore((state) => state.clearCart);

  const total: number = cart.reduce((a, c) => a + c.quantity * c.price, 0);

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressInputs>();

  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async ({ fullName, address, city }: AddressInputs) => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          fullName,
          address,
          city,
          total,
        }),
      });

      const data = await res.json();
      setLoading(false);
      router.push(`/order/${data.id}`);
      clearCart();
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <form
      className='mt-4 sm:mt-8  flex flex-col lg:flex-row'
      onSubmit={handleSubmit(submitHandler)}
    >
      {/**Address*/}
      <div className='sm:w-full lg:w-2/3'>
        <div className='bg-white  space-y-4 rounded-md pt-8 pb-12 px-3 sm:px-8 shadow-md'>
          <p className='text-lg font-medium'>Shipping Address</p>

          <div>
            <label htmlFor='fullName' className='text-sm font-medium'>
              Full Name
            </label>

            <div className='relative mt-1'>
              <input
                {...register("fullName", {
                  required: "Please enter your full name",
                })}
                className='w-full rounded-lg border border-gray-200 p-3 sm:p-4 pr-12 text-sm focus:outline-indigo-500'
                placeholder='Enter full name'
              />
              {errors.fullName && (
                <span className='text-red-500 pt-1 text-sm'>
                  {errors.fullName.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor='email' className='text-sm font-medium'>
              Address
            </label>

            <div className='relative mt-1'>
              <input
                {...register("address", {
                  required: "Please enter your address",
                })}
                className='w-full rounded-lg border border-gray-200 p-3 sm:p-4 pr-12 text-sm focus:outline-indigo-500'
                placeholder='Enter address'
              />
              {errors.address && (
                <span className='text-red-500 pt-1 text-sm'>
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor='city' className='text-sm font-medium'>
              Town/City
            </label>

            <div className='relative mt-1'>
              <input
                {...register("city", {
                  required: "Please enter your Town or City",
                })}
                className='w-full rounded-lg border border-gray-200 p-3 sm:p-4 pr-12 text-sm focus:outline-indigo-500'
                placeholder='Enter town or city'
              />
              {errors.city && (
                <span className='text-red-500 pt-1'>{errors.city.message}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/**Order summary */}

      <div className='w-full lg:w-1/2 mt-6 lg:mt-0 rounded-md bg-white shadow-md px-3 py-4'>
        <div className='flex justify-between border-b pt-1 pb-4'>
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
                    <div className='h-[40px] w-[40px]'>
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
        </table>
        <div className='w-full flex font-semibold justify-between py-2 uppercase'>
          <span className='text-sm'>Total cost</span>
          <span className='text-base'>${total}</span>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <button
            type='submit'
            className=' bg-indigo-500 rounded font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full'
          >
            Place Order
          </button>
        )}
      </div>
    </form>
  );
}
export default dynamic(() => Promise.resolve(CheckOut), { ssr: false });
