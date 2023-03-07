import React from "react";

export default function UnauthorizedPage() {
  return (
    <div className='max-w-[700px] mx-auto w-full'>
      <div className='mt-24 flex flex-col items-center'>
        <h1 className='text-xl text-gray-700 font-semibold'>Access Denied</h1>
        <p className='text-base text-red-400 font-medium'>Log in required</p>
      </div>
    </div>
  );
}
