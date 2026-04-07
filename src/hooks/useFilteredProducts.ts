
"use client";

import { useProducts } from "@/hooks/useProducts";
import { Action, FilterState, Product } from "@/type/global.type";
import { useMemo, useReducer } from "react";



const initialState: FilterState = {
  category: "all",
  priceRange: 2000,
  search: "",
};

function filterReducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_PRICE":
      return { ...state, priceRange: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export const useFilteredProducts = () => {
  const { data, isLoading } = useProducts();

  const [state, dispatch] = useReducer(filterReducer, initialState);

const categories = useMemo<string[]>(() => {
  if (!data?.products) return [];

  const unique = new Set<string>(
    data.products.map((p: Product) => p.category)
  );

  return ["all", ...Array.from(unique)];
}, [data]);

  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];

    return data.products.filter((product: Product) => {
      const matchCategory =
        state.category === "all" || product.category === state.category;

      const matchPrice = product.price <= state.priceRange;

      const matchSearch = product.title
        .toLowerCase()
        .includes(state.search.toLowerCase());

      return matchCategory && matchPrice && matchSearch;
    });
  }, [data, state]);

  return {
    state,
    dispatch,
    categories,
    filteredProducts,
    isLoading,
  };
};