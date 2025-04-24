export default function SortDropdown({ sortType, setSortType }) {
    return (
    <select onChange={(e) => setSortType(e.target.value)} value={sortType} className="w-full sm:w-auto border-2 border-gray-300 text-sm px-2">
        <option value="relavent">Sort by: Relevance</option>
        <option value="low-high">Sort by: Low to High</option>
        <option value="high-low">Sort by: High to Low</option>
    </select>
    );
}