"use client";

import React, { useState } from "react";
import { products } from "@/utils/data";
import Product from "../Product";
import Pagination from "./Pagination";

export default function ProductsList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(12);

  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
        <div className='pt-2 flex flex-wrap gap-3 justify-center'>
          {currentProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>
        <div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.length}
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
