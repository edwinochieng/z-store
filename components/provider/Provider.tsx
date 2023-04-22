"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster position='top-center' />
      {children}
    </SessionProvider>
  );
}
