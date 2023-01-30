"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BiUser } from "react-icons/bi";

export const Account = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger className='outline-none'>
      <BiUser size={24} />
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content className='bg-white w-[150px] p-1 rounded shadow-lg '>
        <DropdownMenu.Item className='pl-4 rounded hover:bg-cyan-200 hover:outline-none'>
          Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item className='pl-4 rounded hover:bg-cyan-200 hover:outline-none'>
          My Orders
        </DropdownMenu.Item>
        <DropdownMenu.Item className='pl-4 rounded hover:bg-cyan-200 hover:outline-none'>
          Log Out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);
