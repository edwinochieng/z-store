"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": process.env.PAYPAL_CLIENT_ID as string,
  currency: "USD",
};

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <Toaster position='top-center' />
        <PayPalScriptProvider options={initialOptions} deferLoading={true}>    
          {children}
        </PayPalScriptProvider>
      </SessionProvider>
    </>
  );
}
