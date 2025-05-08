import { create } from "zustand";
import axios from "axios";

const domain = "http://localhost:1337";

const useProductStore = create((set, get) => ({
  domain,
  products: [],
  currency: "$",
  search: "",
  showSearch: false,
  selectedCategory: "",
  selectedType: "",

  setSearch: (searchValue) => set({ search: searchValue }),
  setShowSearch: (value) => set({ showSearch: value }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedType: (type) => set({ selectedType: type }),
  setProducts: (products) => set({ products }),

  clearShopState: () => {
    set({
      cartItems: {},
      wishlist: [],
      selectedCategory: "",
      selectedType: "",
    });
    localStorage.removeItem("shop-store");
  },
  
  getProductById: (id) => get().products.find((product) => product.id === Number(id)),

  fetchProducts: async () => {
    try {
      const res = await axios.get(`${domain}/api/products`, {
        params: { populate: "*" },
      });

      const data = res.data.data.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image?.url ? `${domain}${item.image.url}` : "",
        description: item.description,
        category: item.category,
        sub_category: item.sub_category,
      }));

      set({ products: data });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

  getFilteredProducts: () => {
    const { products, selectedCategory, selectedType } = get();
    return products.filter((product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      (!selectedType || product.sub_category === selectedType)
    );
  },
}));

export default useProductStore;
