export default function ProductSizeSelector({ productData, size, setSize }) {
    return (
      <div className="space-y-3">
        <p className="font-medium">Select Size</p>
        <div className="flex gap-3 flex-wrap">
          {productData.sizes?.map((item, index) => (
            <button
              key={index}
              onClick={() => setSize(item.value)}
              className={`px-4 py-2 rounded border ${
                item.value === size
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-orange-400'
              }`}
            >
              {item.value}
            </button>
          ))}
        </div>
      </div>
    );
  }
  