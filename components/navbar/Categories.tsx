"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { categories } from "@/utils/data";
import Image from "next/image";

export const Categories = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger className='outline-none font-medium text-base hover:text-gray-400'>
      Categories
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content className='bg-white w-[200px] p-1 rounded shadow-lg '>
        {categories.map((category) => (
          <DropdownMenu.Item
            key={category.name}
            className='outline-none flex items-center font-medium text-sm h-[40px] mt-0.5 px-1 rounded cursor-pointer hover:bg-gray-100'
          >
            <Image
              src={category.image}
              height={40}
              width={40}
              alt={category.name}
              className='pr-0.5 h-full'
            />
            {category.name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);
