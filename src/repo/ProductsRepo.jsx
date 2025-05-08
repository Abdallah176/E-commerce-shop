import { fetchBestSellerProducts, fetchLatestProducts } from "../api/ProuctsApi";

export const getLatestProducts = async () => {
  try {
    const products = await fetchLatestProducts();
    return products;

  } catch (error) {
    console.error("Failed to fetch latest products:", error);
    return [];
  }
};

export const getBestSellerProducts = async () => {
    try {
      return await fetchBestSellerProducts();

    } catch (error) {
      console.error("Error fetching bestseller products:", error);
      return [];
    }
};

