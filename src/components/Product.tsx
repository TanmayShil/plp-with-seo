"use client";

import { useProduct } from "@/hooks/useProducts";
import Image from "next/image";

export default function Product({ id }: { id: string }) {
  console.log("product", id);
  const { data, isLoading } = useProduct(id);
  console.log("data", data);

  if (isLoading) return <p>Loading...</p>;

  return (
   <section className="grid md:grid-cols-2 gap-6">
      {/* ✅ Product Image */}
      <Image
        src={data.thumbnail}
        alt={`${data.title} image`}
        width={400}
        height={400}
        className="rounded-xl"
        priority
      />

      {/* ✅ Product Info */}
      <div>
        {/* Title */}
        <h1 className="text-2xl font-bold">{data.title}</h1>

        {/* Description */}
        <p className="mt-2 text-gray-600">{data.description}</p>

        {/* Category */}
        <p className="mt-2 text-sm text-gray-500">
          Category: {data.category}
        </p>

        {/* Price */}
        <h2 className="mt-4 text-xl font-semibold text-green-600">
          ₹{data.price}
        </h2>

        {/* Brand */}
        <p className="text-sm">Brand: {data.brand}</p>

        {/* Stock Urgency (Marketing) */}
        <p className="text-red-500 text-sm mt-1">
          Only {data.stock} items left!
        </p>

        {/* Availability */}
        <p className="text-sm mt-1">
          Availability: {data.availabilityStatus}
        </p>

        {/* Rating */}
        <p className="text-sm mt-1">
          ⭐ {data.rating} ({data.reviews?.length} reviews)
        </p>

        {/* Shipping */}
        <p className="text-sm mt-2">
          🚚 {data.shippingInformation}
        </p>

        {/* Warranty */}
        <p className="text-sm text-gray-500">
          {data.warrantyInformation}
        </p>

        {/* Return Policy */}
        <p className="text-sm text-gray-500">
          {data.returnPolicy}
        </p>
      </div>
    </section>
  );
}
