"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import LoadingSpinner from "../LoadingSpinner";
import { getError } from "@/utils/error";
import { toast } from "react-hot-toast";
import axios from "axios";

type Items = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};
type Order = {
  id: string;
  createdAt: string;
  fullName: string;
  address: string;
  city: string;
  total: number;
  userId: string;
  status: string;
  updatedAt: string;
  items: Items[];
};

interface OrderDetails {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetails) {
  const { id, fullName, address, city, total, status, updatedAt, items } =
    order;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const loadPaypalScript = async () => {
      const clientId = process.env.PAYPAL_CLIENT_ID;
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": clientId,
          currency: "USD",
        },
      });
    };
    paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    loadPaypalScript();
  }, [paypalDispatch]);

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: { total },
          },
        },
      ],
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async function (details: any) {
      try {
        const { data } = await axios.put(
          `/api/orders/${order.id}/pay`,
          details
        );
        toast.success("Order paid successfully");
      } catch (err) {
        throw new Error(getError(err));
      }
    });
  };

  const onError = (err: any) => {
    toast.error(getError(err));
  };

  return (
    <div className='max-w-screen-xl w-full mx-auto '>
      <h1 className='font-medium text-[18px] py-4'>Order {id}</h1>
      <div className='grid md:grid-cols-2 gap-5'>
        <div className='w-full'>
          <div className=' rounded-md shadow-md mt-4 p-3'>
            <h1 className='font-semibold text-[16px]'>Shipping Address</h1>
            <div className='py-2 text-[16px] font-medium'>
              {fullName},{address},{city}
            </div>
          </div>
          <div className=' rounded-md shadow-lg mt-6 p-3'>
            <h1 className='font-semibold text-[16px] mb-1'>Status</h1>

            {status === "NotPaid" && (
              <div className='p-2 bg-red-400 rounded text-red-900 text-[14px]'>
                Not Paid
              </div>
            )}
            {status === "Paid" && (
              <div className='p-2 bg-green-400 text-green-900 rounded'>
                Paid at {updatedAt}
              </div>
            )}
          </div>
          <div className='w-full rounded-md shadow-md mt-6 p-3'>
            <h1 className='font-semibold text-lg py-2'>Order Items</h1>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='text-left'>Item</th>
                  <th className='text-center px-2'>Quantity</th>
                  <th className='text-center px-2'>Price</th>
                  <th className='text-center'>Subtotal</th>
                </tr>
              </thead>
              <tbody className='py-1'>
                {items.map((item) => (
                  <tr key={item.id} className='border-b'>
                    <td className='py-2 flex items-center gap-2'>
                      <div className='h-[40px] w-[40px]'>
                        <Image
                          src={item.image}
                          height='50'
                          width='50'
                          alt={item.name}
                          className='w-full h-full'
                        />
                      </div>
                      &nbsp;{item.name}
                    </td>
                    <td className='text-center'>{item.quantity}</td>
                    <td className='text-center'>${item.price}</td>
                    <td className='text-center'>
                      ${item.quantity * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/**Order Summary */}

        <div>
          <ul>
            <li className='flex justify-between'>
              <div>Total</div>
              <div>{total}</div>
            </li>
            {status === "NotPaid" && (
              <li>
                {isPending ? (
                  <LoadingSpinner />
                ) : (
                  <div className='w-full'>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
