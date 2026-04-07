"use client";

import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { Product } from "@/type/global.type";

export default function ProductGrid() {
  const { isLoading, filteredProducts, categories, state, dispatch } =
    useFilteredProducts();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <FilterSidebar
          state={state}
          dispatch={dispatch}
          categories={categories}
        />
      </div>
      {/* Products */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
