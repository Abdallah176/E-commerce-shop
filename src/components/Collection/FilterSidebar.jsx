import { useState } from "react";

export default function FilterSidebar({
    allCategories,
    allSubCategories,
    category,
    subCategory,
    toggleCategory,
    toggleSubCategory
}) {
    const [activeTab, setActiveTab] = useState("categories");

    return (
        <div className="min-w-60">
            {/* Tabs Header */}
            <div className="flex justify-between">
                <p 
                    className={`cursor-pointer text-lg font-medium ${activeTab === "categories" ? 'text-indigo-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab("categories")}
                >
                    Categories
                </p>
                <p 
                    className={`cursor-pointer text-lg font-medium ${activeTab === "type" ? 'text-indigo-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab("type")}
                >
                    Type
                </p>
            </div>

            {/* Categories Tab */}
            {activeTab === "categories" && (
                <div className="mt-4">
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {allCategories.map((cat, index) => (
                            <label key={index} className="flex gap-2">
                                <input 
                                    type="checkbox" 
                                    value={cat} 
                                    checked={category.includes(cat)} 
                                    onChange={() => toggleCategory(cat)} 
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Type Tab */}
            {activeTab === "type" && (
                <div className="mt-4">
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {allSubCategories.map((sub, index) => (
                            <label key={index} className="flex gap-2">
                                <input 
                                    type="checkbox" 
                                    value={sub} 
                                    checked={subCategory.includes(sub)} 
                                    onChange={() => toggleSubCategory(sub)} 
                                />
                                {sub}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
