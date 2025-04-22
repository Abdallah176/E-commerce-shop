import dropdownImg from "../../assets/dropdown_icon.png";

export default function FilterSidebar({
    showFilter, setShowFilter,
    allCategories, allSubCategories,
    category, subCategory,
    toggleCategory, toggleSubCategory
    }) {
    return (
        <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
            FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={dropdownImg} />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {allCategories.map((cat, index) => (
                <label key={index} className="flex gap-2">
                <input type="checkbox" value={cat} checked={category.includes(cat)} onChange={() => toggleCategory(cat)} /> {cat}
                </label>
            ))}
            </div>
        </div>

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {allSubCategories.map((sub, index) => (
                <label key={index} className="flex gap-2">
                <input type="checkbox" value={sub} checked={subCategory.includes(sub)} onChange={() => toggleSubCategory(sub)} /> {sub}
                </label>
            ))}
            </div>
        </div>
        </div>
    );
}
