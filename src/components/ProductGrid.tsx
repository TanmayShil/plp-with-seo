"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import { Product } from "@/type/global.type";

export default function ProductGrid() {
  const { data, isLoading } = useProducts();
  console.log("product grid", data);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data?.products?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
