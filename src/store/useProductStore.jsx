import { create } from "zustand";
import { ProductRepository } from "../repo/ProductRepository";

export const useProductStore = create((set) => ({
    bestSeller: [],
    latestProducts: [],
    loading: false,
    error: null,
    
    fetchLatestProducts: async () => {
        set({ loading: true });
        try {
            const products = await ProductRepository.getLatestProducts();
            set({ latestProducts: products, loading: false });
            set({ bestSeller: products, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));
