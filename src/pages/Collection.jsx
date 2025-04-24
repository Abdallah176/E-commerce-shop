import { useEffect, useState } from "react";
import Title from "../components/Title";
import ProductList from "../components/Collection/ProductList";
import SortDropdown from "../components/Collection/SortDropdown";
import useShopStore from "../store/useShopStore";
import axios from 'axios';

function FilterTabs({ allItems, selectedItems, toggleItem, title }) {
  return (
    <div className="my-6">
      <p className="text-sm font-medium mb-3">{title}</p>
      <div className="flex flex-wrap gap-3">
        {allItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => toggleItem(item)}
            className={`px-4 py-2 rounded-full border transition text-sm
              ${selectedItems.includes(item)
                ? "bg-orange-600 text-white border-orange-600 cursor-pointer"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100 cursor-pointer"}`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Collection() {
  const { products, search, showSearch, fetchProducts } = useShopStore();
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);

  const toggleCategory = (value) => {
    setCategory(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const toggleSubCategory = (value) => {
    setSubCategory(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const applyFilter = () => {
    let filtered = [...products];
    if (showSearch && search) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category?.name || item.category));
    }
    if (subCategory.length > 0) {
        filtered = filtered.filter(item => subCategory.includes(item.sub_category?.name));
      }
    setFilterProducts(filtered);
  };

  const sortProduct = () => {
    let sorted = [...filterProducts];
    if (sortType === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      applyFilter();
      return;
    }
    setFilterProducts(sorted);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [products, category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoryRes, subCategoryRes] = await Promise.all([
          axios.get('http://localhost:1337/api/categories?populate=*'),
          axios.get('http://localhost:1337/api/sub-categories?populate=*'),
        ]);
        
        console.log("Categories response:", categoryRes.data.data);
        console.log("Sub-categories response:", subCategoryRes.data.data);
        
        setAllCategories(categoryRes.data.data.map(cat => cat.name));
        setAllSubCategories(subCategoryRes.data.data.map(sub => sub.name));
  
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);
  





  return (
    <div className="pt-10 pb-10 px-4 sm:px-10 border-t space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 text-base sm:text-xl mb-4">
        <Title text1={'ALL'} text2={'COLLECTION'} />
        <SortDropdown sortType={sortType} setSortType={setSortType} />
      </div>

      <FilterTabs
        title="Categories"
        allItems={allCategories}
        selectedItems={category}
        toggleItem={toggleCategory}
      />

      <FilterTabs
        title="Type"
        allItems={allSubCategories}
        selectedItems={subCategory}
        toggleItem={toggleSubCategory}
      />

      <ProductList products={filterProducts} />
    </div>
  );
}
