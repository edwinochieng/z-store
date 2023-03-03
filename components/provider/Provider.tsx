"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Provider({ children }: { children: React.ReactNode }) {
  return;
  <>
    <Toaster position='top-center' />
    <SessionProvider>{children}</SessionProvider>
  </>;
}
