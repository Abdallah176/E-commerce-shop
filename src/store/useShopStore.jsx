import { create } from 'zustand';
import { toast } from 'react-toastify';
import { products } from '../assets/assets';

    const useShopStore = create((set, get) => ({
    products: products,
    currency: '$',
    delivery_fee: 10,
    search: '',
    showSearch: false,
    cartItems: {},
    
    setSearch: (search) => set({ search }),
    setShowSearch: (value) => set({ showSearch: value }),

    addToCart: (itemId, size) => {
        if (!size) {
        toast.error('Select Product Size');
        return;
        }
        
        const cartData = structuredClone(get().cartItems);

        if (cartData[itemId]) {
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
        cartData[itemId] = { [size]: 1 };
        }

        set({ cartItems: cartData });
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
        cartData[itemId][size] = quantity;
        }
        set({ cartItems: cartData });
    },

    getCartAmount: () => {
        const cartItems = get().cartItems;
        const products = get().products;
        let totalAmount = 0;

        for (const itemId in cartItems) {
        const product = products.find(p => p._id === itemId);
        if (product) {
            for (const size in cartItems[itemId]) {
            totalAmount += product.price * cartItems[itemId][size];
            }
        }
        }

        return totalAmount;
    }
    }));

export default useShopStore;