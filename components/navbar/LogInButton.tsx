"use client";

import Link from "next/link";
import React from "react";

export default function LogInButton() {
  return (
    <div className='px-2 py-[5px] rounded-md bg-gray-700 text-xs md:text-sm text-gray-100'>
      <Link href='/login'>Sign In</Link>
    </div>
  );
}
