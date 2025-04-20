import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import 'react-toastify/dist/ReactToastify.css'; 
import { toast } from 'react-toastify';
import axios from 'axios';

const domain = "http://localhost:1337";
const useShopStore = create(
    persist(
        (set, get) => ({
            products: [],
            currency: '$',
            delivery_fee: 10,
            search: '',
            showSearch: false,
            cartItems: {},
            selectedCategory: '',
            wishlist: [], 

            setSearch: (search) => set({ search }),
            setShowSearch: (value) => set({ showSearch: value }),
            setSelectedCategory: (category) => set({ selectedCategory: category }),
            setProducts: (products) => set({ products }),


            getProductById: (id) => {
                return get().products.find(product => product.id === parseInt(id));
            },

            fetchProducts: async () => {
                try {
                    const res = await axios.get(`${domain}/api/products`, {
                        params: { populate: '*' }
                    });
                    const data = res.data.data.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image?.url ? `${domain}${item.image.url}` : '',
                        description: item.description,
                        category: item.category, 
                        subCategory: item.subCategory
                    }));
                    set({ products: data });
                } catch (err) {
                    console.error("Failed to fetch products:", err);
                }
            },

            getFilteredProducts: () => {
                const { products, selectedCategory } = get();
                if (!selectedCategory) return products;
                return products.filter(product => product.category === selectedCategory);
            },

            addToWishlist: (product) => {
                const { wishlist } = get();
                if (!wishlist.some(item => item.id === product.id)) {
                    set({ wishlist: [...wishlist, product] });
                    toast.success(`${product.name} added to your wishlist!`);
                } else {
                    toast.info(`${product.name} is already in your wishlist.`);
                }
            },

            removeFromWishlist: (productId) => {
                const { wishlist } = get();
                set({ wishlist: wishlist.filter(item => item.id !== productId) });
                toast.info('Product removed from wishlist');
            },

            getWishlistCount: () => {
                return get().wishlist.length;
            },

            addToCart: (itemId, size, name) => {
                if (!size) {
                    toast.error('Select Product Size');
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
                        toast.info('Product removed from cart');
                    } else {
                        cartData[itemId][size] = quantity;
                    }

                    set({ cartItems: cartData });
                }
            },

            getCartAmount: () => {
                const cartItems = get().cartItems;
                const products = get().products;
                let totalAmount = 0;

                for (const itemId in cartItems) {
                    const product = products.find(p => p.id == itemId);
                    if (product) {
                        for (const size in cartItems[itemId]) {
                            totalAmount += product.price * cartItems[itemId][size];
                        }
                    }
                }

                return totalAmount;
            },
            
            getFormattedCartItems: () => {
                const { cartItems, products } = get();
                const formatted = [];
            
                for (const itemId in cartItems) {
                    const product = products.find(p => p.id == itemId);
                    if (!product) continue;
            
                    for (const size in cartItems[itemId]) {
                        formatted.push({
                            product: itemId,
                            size: size,
                            quantity: cartItems[itemId][size],
                            name: product.name,
                            price: product.price
                        });
                    }
                }
            
                return formatted;
            },
            
            getTotalPrice: () => {
                const cartItems = get().cartItems;
                const products = get().products;
                let total = 0;
            
                for (const itemId in cartItems) {
                    const product = products.find(p => p.id == itemId);
                    if (product) {
                        for (const size in cartItems[itemId]) {
                            total += product.price * cartItems[itemId][size];
                        }
                    }
                }
            
                return total;
            },
            
        })
    )
);

export default useShopStore;

