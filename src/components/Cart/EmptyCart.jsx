import React from "react";

export default function EmptyCart() {
    return (
        <div className="text-center text-gray-500 mt-10 flex flex-col items-center gap-4">
            <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="Empty cart"
                className="w-24 h-24 opacity-50"
            />
            <p>Your cart is empty.</p>
        </div>
    );
}
