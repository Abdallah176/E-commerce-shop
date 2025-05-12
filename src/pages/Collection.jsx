import { useEffect, useState } from "react";
import Title from "../components/Title";
import ProductList from "../components/Collection/ProductList";
import SortDropdown from "../components/Collection/SortDropdown";
import FilterTabs from "../components/Collection/FilterTabs";
import useProductStore from "../store/useProductStore";
import { fetchFilterData } from "../repo/FilterRepo";

export default function Collection() {
  const { products, search, showSearch, fetchProducts } = useProductStore();
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sub_category, setSubCategory] = useState([]);
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
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(item => {
        const priceStr = item.price?.toString();
        return (
          item.name.toLowerCase().includes(lowerSearch) ||
          item.description?.toLowerCase().includes(lowerSearch) ||
          item.category?.name?.toLowerCase() === (lowerSearch) ||
          item.sub_category?.name?.toLowerCase() === (lowerSearch) ||
          priceStr?.includes(lowerSearch)
        );
      });
    }

    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category?.name));
    }

    if (sub_category.length > 0) {
      filtered = filtered.filter(item => sub_category.includes(item.sub_category?.name));
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
  }, [products, category, sub_category, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    const fetch = async () => {
      const { categories, subCategories } = await fetchFilterData();
      setAllCategories(categories);
      setAllSubCategories(subCategories);
    };
    fetch();
  }, []);

  return (
    <div className="pt-10 pb-10 px-4 sm:px-10 border-t space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 text-base sm:text-xl mb-4">
        <Title text1={'ALL'} text2={'COLLECTION'} />
        <SortDropdown sortType={sortType} setSortType={setSortType} />
      </div>

      <FilterTabs title="Categories" allItems={allCategories} selectedItems={category} toggleItem={toggleCategory} />
      <FilterTabs title="Type" allItems={allSubCategories} selectedItems={sub_category} toggleItem={toggleSubCategory} />
      <ProductList products={filterProducts} />
    </div>
  );
}