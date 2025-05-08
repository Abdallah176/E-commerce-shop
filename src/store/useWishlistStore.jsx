import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (product) => {
        const { wishlist } = get();
        if (!wishlist.some((item) => item.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
          toast.success(`${product.name} added to your wishlist!`);
        } else {
          toast.info(`${product.name} is already in your wishlist.`);
        }
      },

      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter((item) => item.id !== productId) });
        toast.info("Product removed from wishlist");
      },

      getWishlistCount: () => get().wishlist.length,

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "wishlist-store",
      partialize: (state) => ({ wishlist: state.wishlist }),
    }
  )
);

export default useWishlistStore;
