'use client';

import { useQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '@/lib/api';

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
        // prevent refetch
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnMount: false,
    refetchOnWindowFocus: false,

  });
};