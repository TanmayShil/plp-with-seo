import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/queryClient";
import Product from "@/components/Product";
import { getProduct } from "@/lib/api";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.thumbnail,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      url: `https://yourdomain.com/product/${id}`,
      type: "website",
      siteName: "Product Listing",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.thumbnail],
      site: "@yourtwitterhandle",
      creator: "@yourtwitterhandle",
      url: `https://yourdomain.com/product/${id}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  console.log("-----", id);
  const queryClient = getQueryClient();

  // ONLY ONE FETCH
  await queryClient.prefetchQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  // Reuse cached data (NO extra API call)
  const product = queryClient.getQueryData<any>(["product", id]);
  console.log("product----", product);

  return (
    <main className="container mx-auto p-4">
      {/* Structured Data (SEO GOLD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.thumbnail,
            description: product.description,
            sku: product.sku,
            brand: {
              "@type": "Brand",
              name: product.brand,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability:
                product.availabilityStatus === "In Stock"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              url: `https://yourdomain.com/product/${id}`,

              //Shipping Details
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: {
                  "@type": "MonetaryAmount",
                  value: 0, // change if you have shipping cost
                  currency: "INR",
                },
                shippingDestination: {
                  "@type": "DefinedRegion",
                  addressCountry: "IN",
                },
                deliveryTime: {
                  "@type": "ShippingDeliveryTime",
                  handlingTime: {
                    "@type": "QuantitativeValue",
                    minValue: 0,
                    maxValue: 1,
                    unitCode: "DAY",
                  },
                  transitTime: {
                    "@type": "QuantitativeValue",
                    minValue: 2,
                    maxValue: 5,
                    unitCode: "DAY",
                  },
                },
              },

              //Return Policy
              hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                applicableCountry: "IN",
                returnPolicyCategory:
                  "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 7,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/FreeReturn",
              },
            },

            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews?.length || 0,
            },
          }),
        }}
      />

      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        ← Back
      </Link>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Product id={id} />
      </HydrationBoundary>
    </main>
  );
}
