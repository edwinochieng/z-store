"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { categories } from "@/utils/data";

export const Categories = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger className='outline-none'>
      Categories
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content className='bg-white w-[180px] p-1 rounded shadow-lg '>
        {categories.map((category) => (
          <DropdownMenu.Item
            key={category.name}
            className='pl-4 rounded hover:bg-cyan-200 hover:outline-none'
          >
            {category.name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);
