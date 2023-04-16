"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": process.env.PAYPAL_CLIENT_ID,
  currency: "USD",
};

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider options={initialOptions} deferLoading={true}>
      <SessionProvider>
        <Toaster position='top-center' />
        {children}
      </SessionProvider>
    </PayPalScriptProvider>
  );
}
