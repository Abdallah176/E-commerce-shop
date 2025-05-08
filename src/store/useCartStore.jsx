import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: {},
      delivery_fee: 5,

      addToCart: (itemId, size, name) => {
        if (!size) {
          toast.error("Select Product Size");
          return;
        }
        const id = parseInt(itemId);
        if (isNaN(id)) {
          console.error("Invalid product ID:", itemId);
          return;
        }
        const cartData = structuredClone(get().cartItems);

        if (cartData[id]) {
          cartData[id][size] = (cartData[id][size] || 0) + 1;
        } else {
          cartData[id] = { [size]: 1 };
        }

        set({ cartItems: cartData });
        toast.success(`${name} (Size: ${size}) added to cart!`);
      },

      getCartCount: () => {
        const cartItems = get().cartItems;
        let totalCount = 0;
        for (const itemId in cartItems) {
          for (const size in cartItems[itemId]) {
            totalCount += cartItems[itemId][size];
          }
        }
        return totalCount;
      },

      updateQuantity: (itemId, size, quantity) => {
        const cartData = structuredClone(get().cartItems);
        if (cartData[itemId]) {
          if (quantity === 0) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
              delete cartData[itemId];
            }
            toast.info("Product removed from cart");
          } else {
            cartData[itemId][size] = quantity;
          }
          set({ cartItems: cartData });
        }
      },

      getCartAmount: (products) => {
        const cartItems = get().cartItems;
        let totalAmount = 0;
        for (const itemId in cartItems) {
          const product = products.find((p) => p.id == itemId);
          if (product) {
            for (const size in cartItems[itemId]) {
              totalAmount += product.price * cartItems[itemId][size];
            }
          }
        }
        return totalAmount;
      },

      getFormattedCartItems: (products) => {
        const cartItems = get().cartItems;
        const formatted = [];
        for (const itemId in cartItems) {
          const product = products.find((p) => p.id == itemId);
          if (!product) continue;

          for (const size in cartItems[itemId]) {
            formatted.push({
              id: product.id,
              product: itemId,
              size: size,
              quantity: cartItems[itemId][size],
              name: product.name,
              price: product.price,
              image: product.image,
            });
          }
        }
        return formatted;
      },

      getTotalPrice: (products) => {
        const cartItems = get().cartItems;
        let total = 0;
        for (const itemId in cartItems) {
          const product = products.find((p) => p.id == itemId);
          if (product) {
            for (const size in cartItems[itemId]) {
              total += product.price * cartItems[itemId][size];
            }
          }
        }
        return total;
      },

      clearCart: () => set({ cartItems: {} }),
    }),
    {
      name: "cart-store",
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);

export default useCartStore;
