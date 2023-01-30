"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const Categories = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger className='outline-none'>
      Categories
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content className='bg-white w-[180px] p-1 rounded shadow-lg '>
        <DropdownMenu.Item className='pl-4 rounded hover:bg-cyan-200 hover:outline-none'>
          Shirts
        </DropdownMenu.Item>
        <DropdownMenu.Item className='pl-4 rounded hover:bg-cyan-200 hover:outline-none'>
          Watches
        </DropdownMenu.Item>
        <DropdownMenu.Item className='pl-4 rounded hover:bg-cyan-200 hover:outline-none'>
          Bags
        </DropdownMenu.Item>
        <DropdownMenu.Item className='pl-4 rounded hover:bg-cyan-200 hover:outline-none'>
          Jackets
        </DropdownMenu.Item>
        <DropdownMenu.Item className='pl-4 rounded hover:bg-cyan-200 hover:outline-none'>
          Shoes
        </DropdownMenu.Item>
        <DropdownMenu.Item className='pl-4 rounded hover:bg-cyan-200 hover:outline-none'>
          Accessories
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);
