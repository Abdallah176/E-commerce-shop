import { useEffect, useState } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import useShopStore from "../store/useShopStore";
import axios from 'axios';
import FilterSidebar from "../components/Collection/FilterSidebar";
import ProductList from "../components/Collection/ProductList";
import SortDropdown from "../components/Collection/SortDropdown";

export default function Collection() {
    const { products, search, showSearch, fetchProducts } = useShopStore();
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');
    const [allCategories, setAllCategories] = useState([]);
    const [allSubCategories, setAllSubCategories] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

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
        filtered = filtered.filter(item => subCategory.includes(item.subCategory?.name || item.subCategory));
        console.log("👀 Product SubCategory:", products.map(p => p.subCategory));
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
            axios.get('http://localhost:1337/api/categories'),
            axios.get('http://localhost:1337/api/sub-categories'),
            ]);
            setAllCategories(categoryRes.data.data.map(cat => cat.name));
            setAllSubCategories(subCategoryRes.data.data.map(sub => sub.name));
        } catch (error) {
            console.error("Error fetching filters:", error);
        }
        };
        fetchFilters();
    }, []);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            <FilterSidebar
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                allCategories={allCategories}
                allSubCategories={allSubCategories}
                category={category}
                subCategory={subCategory}
                toggleCategory={toggleCategory}
                toggleSubCategory={toggleSubCategory}
            />

            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                <Title text1={'ALL'} text2={'COLLECTION'} />
                <SortDropdown sortType={sortType} setSortType={setSortType} />
                </div>
                <ProductList products={filterProducts} />
            </div>
        </div>
    );
}
