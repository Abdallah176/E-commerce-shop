import React from "react";
import { assets } from "../../assets/assets";
import useCartStore from "../../store/useCartStore";

export default function CartItem({ item, productData, currency }) {
  const { updateQuantity } = useCartStore();

  return (
    <div className="bg-white/60 rounded-xl shadow-md p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:shadow-lg">
      {/* Left: Product Info */}
      <div className="flex items-start gap-4 w-full sm:w-[60%]">
        <img
          className="w-20 h-20 object-cover rounded-lg"
          src={productData.image}
          alt={productData.name}
        />
        <div className="space-y-2">
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            {productData.name}
          </p>
          <div className="flex items-center gap-3 text-sm sm:text-base text-gray-600">
            <p>
              {currency}
              {(productData.price * item.quantity).toFixed(2)}
            </p>
            <span className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm border">
              Size: {item.size}
            </span>
            <span className="text-gray-500">Qty: {item.quantity}</span>
          </div>
        </div>
      </div>

      {/* Middle: Quantity Input */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          defaultValue={item.quantity}
          onChange={(e) =>
            e.target.value === "" || e.target.value === "0"
              ? null
              : updateQuantity(
                  productData.id,
                  item.size,
                  Number(e.target.value)
                )
          }
          className="w-14 sm:w-20 px-2 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Right: Delete Icon */}
      <div className="flex justify-end sm:justify-center">
        <img
          onClick={() => updateQuantity(productData.id, item.size, 0)}
          src={assets.bin_icon}
          alt="delete"
          className="w-5 sm:w-6 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
    </div>
  );
}

