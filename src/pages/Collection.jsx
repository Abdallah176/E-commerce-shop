import { useEffect, useState } from "react"
import dropdownImg from '../assets/dropdown_icon.png'
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import useShopStore from "../store/useShopStore";
import axios from 'axios';

export default function Collection() {
    const { products , search , showSearch ,fetchProducts} = useShopStore();
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');
    
    const [allCategories, setAllCategories] = useState([]);
    const [allSubCategories, setAllSubCategories] = useState([]);

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    }

    const subtoggleCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();
    
        console.log("🔍 Before Filter:", productsCopy);
    
        if (showSearch && search) {
            productsCopy = productsCopy.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }
    
        if (category.length > 0) {
            productsCopy = productsCopy.filter(item =>
                category.includes(item.category?.name || item.category)
            );
        }
    
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item =>
                subCategory.includes(item.subCategory?.name || item.subCategory)
            );
            console.log("🔍 After SubCategory Filter:", productsCopy);
        }
    
        setFilterProducts(productsCopy);
        console.log("✅ Final Filtered Products:", productsCopy);
        console.log("Active Category Filters:", category);
        console.log("Active SubCategory Filters:", subCategory);
    };
    const sortProduct = () => {
        let fpCopy = [...filterProducts];
        switch (sortType) {
            case 'low-high':
                fpCopy.sort((a, b) => a.price - b.price);
                break;
            case 'high-low':
                fpCopy.sort((a, b) => b.price - a.price);
                break;
            default:
                applyFilter();
                return;
        }
        setFilterProducts(fpCopy);
    }

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    useEffect(() => {
        fetchProducts(); // ✅ مهم عشان نجيب الداتا من Strapi
    }, []);


    useEffect(() => {
        // Get dynamic categories and subcategories from Strapi
        const fetchFilters = async () => {
            try {
                const categoryRes = await axios.get('http://localhost:1337/api/categories');
                const subCategoryRes = await axios.get('http://localhost:1337/api/sub-categories');

                setAllCategories(categoryRes.data.data.map(cat => cat.name));
                setAllSubCategories(subCategoryRes.data.data.map(sub => sub.name));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchFilters();
    }, []);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Filter Options */}
            <div className="min-w-60">
                <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={dropdownImg} />
                </p>

                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {
                            allCategories.map((cat, index) => (
                                <label key={index} className="flex gap-2">
                                    <input type="checkbox" value={cat} onChange={toggleCategory} /> {cat}
                                </label>
                            ))
                        }
                    </div>
                </div>

                {/* SubCategory Filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {
                            allSubCategories.map((sub, index) => (
                                <label key={index} className="flex gap-2">
                                    <input type="checkbox" value={sub} onChange={subtoggleCategory} /> {sub}
                                </label>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Products Display */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTION'} />
                    {/* Product Sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
                        <option value="relavent">Sort by: Relevance</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem key={index} name={item.name} id={item.id} price={item.price} image={item.image} />
                        ))
                    }
                </div>
            </div>
        </div>
    )


}
