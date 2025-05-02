import { assets } from "../../assets/assets";
import { BadgeCheck, HandCoins, RotateCcw } from "lucide-react";

export default function ProductInfo({ productData, size, setSize, currency, addToCart }) {
    return (
        <div className="flex-1 space-y-6">
            <h1 className="font-semibold text-3xl text-gray-800">{productData.name}</h1>

            <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(4)].map((_, i) => (
                    <img src={assets.star_icon} key={i} alt="" className="w-4" />
                ))}
                <img src={assets.star_dull_icon} alt="" className="w-4" />
                <p className="pl-2 text-gray-600 text-sm">(5 reviews)</p>
            </div>

            <p className="text-4xl font-bold text-gray-900">
                {currency}{productData.price}
            </p>

            <p className="text-gray-600 text-sm md:w-4/5">
                {productData.description}
            </p>

            {/* Size selection */}
            <div className="space-y-3">
                <p className="font-medium">Select Size</p>
                <div className="flex gap-3 flex-wrap">
                    {productData.sizes?.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setSize(item.value)}
                            className={`px-4 py-2 rounded border 
                            ${item.value === size
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-orange-400'}`}
                        >
                            {item.value}
                        </button>
                    ))}
                </div>
            </div>

            {/* Size Chart */}
            <div className="overflow-x-auto mt-6">
                <p className="font-medium mb-2">Size Chart</p>
                <table className="min-w-[300px] text-sm border text-left border-gray-200 rounded-md">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-2">Size</th>
                            <th className="p-2">Chest (cm)</th>
                            <th className="p-2">Waist (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="p-2">S</td>
                            <td className="p-2">86–91</td>
                            <td className="p-2">71–76</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-2">M</td>
                            <td className="p-2">91–97</td>
                            <td className="p-2">76–81</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-2">L</td>
                            <td className="p-2">97–102</td>
                            <td className="p-2">81–86</td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-2">XL</td>
                            <td className="p-2">102–107</td>
                            <td className="p-2">86–91</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button
                onClick={() => addToCart(productData.id, size, productData.name)}
                className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition duration-200"
            >
                ADD TO CART
            </button>

            <div className="text-sm text-gray-600 mt-6 space-y-3">
                <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-green-600" />
                    <p>100% Original product</p>
                </div>
                <div className="flex items-center gap-2">
                    <HandCoins className="w-4 h-4 text-yellow-600" />
                    <p>Cash on delivery available</p>
                </div>
                <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-blue-600" />
                    <p>Easy returns within 7 days</p>
                </div>
            </div>

        </div>
    );
}
