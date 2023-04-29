"use client";

import { Products } from "@/pages/api/products";
import React, { useState } from "react";
import Product from "../Product";
import Pagination from "./Pagination";

interface Data {
  data: Products[];
}

export default function ProductsList({ data }: Data) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(12);

  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);

  //change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = (): void => {
    const next: number = currentPage + 1;

    setCurrentPage(next);
  };

  const previousPage = (): void => {
    const prev: number = currentPage - 1;

    if (currentPage > 1) {
      setCurrentPage(prev);
    }
  };

  return (
    <div id='products'>
      <div className='flex flex-col items-center'>
        <h1 className='font-semibold text-xl text-gray-800 pt-4 lg:pt-6 pb-2'>
          Featured Products
        </h1>
        <div className='pt-2 flex flex-wrap gap-3 justify-center'>
          {currentProducts?.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>
        <div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={data?.length}
            paginate={paginate}
            currentPage={currentPage}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </div>
      </div>
    </div>
  );
}
