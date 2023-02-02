import React from "react";

interface Props {
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  previousPage: () => void;
  nextPage: () => void;
}

export default function Pagination({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
  previousPage,
  nextPage,
}: Props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='my-6 text-sm'>
      <ul className='inline-flex -space-x-px'>
        {currentPage > 1 && (
          <li>
            <a
              href='#products'
              onClick={() => previousPage()}
              className='bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 '
            >
              Prev
            </a>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              href='#products'
              onClick={() => paginate(number)}
              className='bg-white border border-gray-300 text-gray-500 focus:bg-slate-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 '
            >
              {number}
            </a>
          </li>
        ))}

        {currentPage < Math.ceil(totalProducts / productsPerPage) && (
          <li>
            <a
              href='#products'
              onClick={() => nextPage()}
              className='bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 '
            >
              Next
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
