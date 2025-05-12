export default function FilterTabs({ allItems, selectedItems, toggleItem, title }) {
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
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }
  