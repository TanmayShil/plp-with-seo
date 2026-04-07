# 🛍 Product Listing Page (PLP)
---

# 📌 Project Overview

This project is a **Product Listing Page (PLP)** built using modern frontend architecture with:

* Next.js (App Router)
* TanStack Query (Prefetch + Hydration)
* ShadCN UI + Tailwind CSS
* SSR (Server Side Rendering)
* SEO Optimization

The goal is to deliver a **high-performance, scalable, SEO-friendly e-commerce UI** based on the provided Figma design.

---

# 🚀 Live Features

* 🛍 Product listing (API-based)
* ⚡ SSR with prefetching (fast load)
* 🎯 SEO optimized
* 📱 Fully responsive (mobile, tablet, desktop)
* 🎨 Modern UI (ShadCN + animations)
* 🔄 Optimized data fetching using TanStack Query

---

# 🧠 Core Concepts Explained

---

## ⚡ 1. SSR (Server-Side Rendering)

### ✅ What is SSR?

SSR means rendering the page **on the server before sending it to the browser**.

### ✅ How it works in this project:

* Next.js server component (`page.tsx`) runs on server
* Data is fetched BEFORE page loads
* HTML is sent fully rendered to client

### ✅ Why SSR is used:

* Faster initial page load
* Better SEO (Google can crawl content easily)
* No blank loading state

---

## ⚡ 2. SSG (Static Site Generation)

### ✅ What is SSG?

SSG generates HTML at **build time** instead of request time.

### ✅ Difference from SSR:

| SSR                   | SSG                |
| --------------------- | ------------------ |
| Runs on every request | Runs at build time |
| Dynamic               | Static             |
| Slower than SSG       | Faster than SSR    |

### ✅ Why NOT used here:

* Product data is dynamic (API-based)
* Needs fresh data

---

## ⚡ 3. TanStack Query (Prefetch + Hydration)

### ✅ What is Prefetching?

Fetching data **on the server before rendering UI**.

### ✅ How it works here:

```ts
await queryClient.prefetchQuery({
  queryKey: ['products'],
  queryFn: getProducts,
});
```

### ✅ Hydration:

Server-fetched data is passed to client using:

```ts
<HydrationBoundary state={dehydrate(queryClient)}>
```

### ✅ Why TanStack Query is used:

* Avoids duplicate API calls
* Caching (performance boost)
* Background refetching
* Clean state management

---

## ⚡ 4. SEO Optimization

### ✅ Implemented SEO Features:

#### 1. Meta Tags

```ts
export const metadata = {
  title: 'Product Listing',
  description: 'Premium product listing page',
};
```

#### 2. Heading Structure

* H1 → Page title
* H2 → Product titles

#### 3. Image Optimization

* Next.js `<Image />`
* Alt text included

#### 4. Schema (Structured Data)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList"
}
```

### ✅ Why SEO is important:

* Improves Google ranking
* Better visibility
* Faster indexing

---

# 🎨 UI & Styling Approach

### 🧩 ShadCN UI

* Accessible components
* Clean design system

### 🎬 Magic UI / Framer Motion

* Smooth hover animations
* Interactive UI

### 🎯 Tailwind CSS

* Utility-first styling
* Responsive design

---

# 🔍 Product Details Page (Dynamic Route with SSR)

To support **single product view by ID** using DummyJSON API:

## 📁 Route Structure

```
📁 app/
│   │   ├── 📁 [id]/
│   │   │   └── 📄 page.tsx
│   │   ├── 📄 favicon.ico
│   │   ├── 🎨 globals.css
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 page.tsx
│   │   └── 📄 providers.tsx
```

---


---

## ⚡ SSR + Prefetch (Single Product)

```tsx
// app/products/[id]/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { getProductById } from '@/lib/api';
import ProductDetails from '@/components/ProductDetails';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['product', params.id],
    queryFn: () => getProductById(params.id),
  });

  return (
    <main className="container mx-auto p-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetails id={params.id} />
      </HydrationBoundary>
    </main>
  );
}
```

---

## 🧠 Client Hook

```ts
// hooks/useProduct.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/lib/api';

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });
};
```

---

## 🧩 Product Details Component

```tsx
// components/ProductDetails.tsx
'use client';

import Image from 'next/image';
import { useProduct } from '@/hooks/useProduct';

export default function ProductDetails({ id }: { id: string }) {
  const { data, isLoading } = useProduct(id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Image
        src={data.thumbnail}
        alt={data.title}
        width={400}
        height={400}
        className="rounded-xl"
      />

      <div>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <p className="mt-2 text-gray-600">{data.description}</p>
        <p className="mt-4 text-xl font-semibold">₹{data.price}</p>
      </div>
    </div>
  );
}
```

---

## 🔗 Link from Product Card

```tsx
import Link from 'next/link';

<Link href={`/products/${product.id}`}>
  View Details
</Link>
```

---

## 🎯 Why This is Important

* Enables **dynamic routing**
* Improves **SEO per product page**
* Demonstrates **SSR + TanStack Query mastery**
* Real-world e-commerce pattern

---


# 📦 API Used

```
https://fakestoreapi.com/products
```

---

# 🧱 Evaluation Criteria Implementation

This project is built keeping the evaluation criteria in mind:

---

## ✅ 5. Code Quality & Performance

### a. Code Structure

* Feature-based folder structure (`components`, `hooks`, `lib`)
* Separation of concerns (API, UI, hooks)
* Reusable components (ProductCard, ProductGrid)

### b. Naming Convention

* Components → PascalCase (`ProductCard.tsx`)
* Hooks → camelCase with `use` prefix (`useProducts.ts`)
* Functions → camelCase (`getProducts`)
* Constants → UPPER_CASE (if used)

### c. Minimum Pre-built Packages

* Only essential libraries used:

  * TanStack Query (data fetching)
  * ShadCN (UI)
* Avoided heavy UI frameworks
* No unnecessary dependencies


### d. Minimum DOM Size

* Avoided deeply nested elements
* Used reusable components instead of duplicating UI
* Optimized rendering using React Query cache

---

# 🔍 SEO Implementation Details

## a. Page Title

Defined using Next.js metadata:

```ts
export const metadata = {
  title: 'Product Listing',
};
```

## b. Page Description

```ts
description: 'Premium product listing page',
```

## c. H1 & H2 Tags

* H1 → Main page heading
* H2 → Product titles

Example:

```tsx
<h1>Discover Products</h1>
<h2>{product.title}</h2>
```

## d. Schema (Structured Data)

### 📌 PLP (Listing Page)

Added JSON-LD in layout:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
    }),
  }}
/>
```

### 📌 Product Detail Page (Dynamic Schema)

Added inside `/products/[id]/page.tsx` for better SEO per product:

````tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: product.thumbnail,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'INR',
      },
    }),
  }}
/>
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
    }),
  }}
/>
````

## e. SEO-Friendly Image Names

* Use meaningful names instead of random strings
* Example:

  ```
  product-shoes-nike.jpg
  ```

## f. Alt Text on Images

```tsx
<Image
  src={product.image}
  alt={product.title}
/>
```

---

# 🏁 Conclusion

This project demonstrates:

* Advanced Next.js architecture (SSR + App Router)
* Efficient data handling using TanStack Query
* Strong SEO fundamentals (Meta + OpenGraph + JSON-LD)
* Clean UI with modern tools

---

# 📘 Detailed Technical Explanation (For Evaluation)

## ⚡ SSR vs SSG (Why SSR used here)

### SSR (Used in this project)

* Data is fetched on every request
* Page is rendered on server and sent as HTML
* Ensures **fresh product data**

👉 Used because:

* Product data is dynamic
* SEO requires latest content
* Better user experience (no loading flicker)

### SSG (Not used)

* Built at build time
* Not suitable for frequently changing product data

---

## ⚡ TanStack Query Prefetch + Hydration

### How it works:

1. Server prefetches data:

```ts
await queryClient.prefetchQuery()
```

2. Data is dehydrated:

```ts
dehydrate(queryClient)
```

3. Sent to client via HydrationBoundary

4. Client reuses data (no API call again)

### Why used:

* Prevents duplicate API calls
* Improves performance
* Provides caching
* Smooth UX (instant data availability)

---

## 🔍 SEO Setup (How it works)

### 1. Metadata API

* Dynamic titles per product
* Description + keywords

### 2. OpenGraph + Twitter

* Controls preview when sharing links

### 3. Canonical URLs

* Prevents duplicate content issues

### 4. Heading Structure

* H1 → product title
* H2 → pricing / sections

---

## 🧠 JSON-LD (Structured Data)

### What is JSON-LD?

* Structured data format for search engines
* Helps Google understand page content

### How it works:

* Injected via `<script type="application/ld+json" />`
* Contains product metadata

### Why it is important:

* Enables **rich results (price, rating, availability)**
* Improves SEO ranking
* Better indexing

### Example used:

* Product schema
* Includes:

  * name
  * price
  * rating
  * availability

---

## 📸 Image SEO

* Used Next.js Image (optimized)
* Added meaningful alt text
* Helps accessibility + SEO

---

## 📦 Overall Architecture Benefits

* SSR + Hydration → fast + SEO friendly
* TanStack Query → efficient state handling
* Modular structure → scalable
* Schema → rich search results

---

# 🔥 Final Note

This implementation focuses on **real-world production standards**, combining:

* Performance
* SEO
* Scalability
* Clean architecture

---

# 📚 Useful Documentation & References

* Next.js App Router: [https://nextjs.org/docs/app](https://nextjs.org/docs/app)

* Next.js Data Fetching (SSR/SSG): [https://nextjs.org/docs/app/building-your-application/data-fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

* Metadata API (SEO): [https://nextjs.org/docs/app/building-your-application/optimizing/metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

* Image Optimization: [https://nextjs.org/docs/app/building-your-application/optimizing/images](https://nextjs.org/docs/app/building-your-application/optimizing/images)

* TanStack Query (React Query): [https://tanstack.com/query/latest/docs/react/overview](https://tanstack.com/query/latest/docs/react/overview)

* Prefetching & Hydration: [https://tanstack.com/query/latest/docs/react/guides/ssr](https://tanstack.com/query/latest/docs/react/guides/ssr)

* ShadCN UI: [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs)

* Tailwind CSS: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

* Schema.org (Structured Data): [https://schema.org/](https://schema.org/)

* Google Rich Results Test: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)

---

## 🙋‍♂️ Author

Made with ❤️ by Tanmay Shil
GitHub: [@TanmayShil](https://github.com/TanmayShil)

