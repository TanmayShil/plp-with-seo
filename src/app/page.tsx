import { getQueryClient } from "@/lib/queryClient";
import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "Product Listing",
  description: "Premium product listing page",
  openGraph: {
    title: "Product Listing",
    description: "Premium product listing page",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Product Listing",
      },
    ],
    
  },
};

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Discover Products</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductGrid />
      </HydrationBoundary>
    </main>
  );
}
