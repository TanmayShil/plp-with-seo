export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  width: number;
  height: number;
  depth: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  images: string[];
  thumbnail: string;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  returnPolicy: string;
};

export type FilterState = {
  category: string;
  priceRange: number;
  search: string;
};

export type Action =
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_PRICE"; payload: number }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "RESET" };
