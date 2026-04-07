import axios from "axios";
// https://fake-store-api.mock.beeceptor.com/api/products

export const getProducts = async () => {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data;
};

export const getProduct = async (id: string) => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
};