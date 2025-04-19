import React from "react";
import { assets } from "../../assets/assets";
import useShopStore from "../../store/useShopStore";

export default function CartItem({ item, productData, currency }) {
    const { updateQuantity } = useShopStore();

    return (
        <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
            <div className="flex items-start gap-6">
                <img
                    className="w-16 sm:w-20 object-cover rounded"
                    src={productData.image}
                    alt={productData.name}
                />
                <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                        <p>
                            {currency}
                            Price : {productData.price * item.quantity}
                            <br /> Quantity : {item.quantity}
                        </p>
                        <p className="px-2 sm:py-1 border bg-slate-50">{item.size}</p>
                    </div>
                </div>
            </div>

            <input
                onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(item.id, item.size, Number(e.target.value))
                }
                className="border max-w-10 sm:max-w-20 px-1 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
            />

            <img
                onClick={() => updateQuantity(item.id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="delete"
            />
        </div>
    );
}
