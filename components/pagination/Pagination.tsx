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

  const goToPrevPage = (): void => {
    if (currentPage > 1) {
      previousPage();
    }
  };

  const goToNextPage = (): void => {
    if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
      nextPage();
    }
  };

  return (
    <div className='my-7 text-sm'>
      <ul className='inline-flex -space-x-px'>
        <li>
          <a
            href='#products'
            onClick={goToPrevPage}
            className={`${
              currentPage == 1
                ? "bg-gray-100 cursor-not-allowed border border-gray-300 text-gray-400"
                : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
            }border border-gray-300 ml-0 rounded-l-lg leading-tight py-2 px-3 `}
          >
            Prev
          </a>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              href='#products'
              onClick={() => paginate(number)}
              className='bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 '
            >
              {number}
            </a>
          </li>
        ))}

        <li>
          <a
            href='#products'
            onClick={goToNextPage}
            className={`${
              currentPage == Math.ceil(totalProducts / productsPerPage)
                ? "bg-gray-100 cursor-not-allowed border border-gray-300 text-gray-400"
                : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
            }border border-gray-300 ml-0 rounded-r-lg leading-tight py-2 px-3 `}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
}
