import { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import useShopStore from "../store/useShopStore";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const {products,currency,cartItems,updateQuantity,fetchProducts} = useShopStore();
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from Strapi when the cart page mounts
        if (products.length === 0) {
            fetchProducts(); // لازم المنتجات تبقى متاحة قبل render الكارت
        }
    }, []);

    useEffect(() => {
        // Build local cart data from cartItems
        const tempData = [];
        for (const documentId in cartItems) {
        for (const size in cartItems[documentId]) {
            if (cartItems[documentId][size] > 0) {
            tempData.push({
                id: Number(documentId),
                size: size,
                quantity: cartItems[documentId][size]
            });
            }
        }
        }
        setCartData(tempData);
        console.log( 'data' , tempData)
    }, [cartItems, products]);

    return (
        <div className="border-t pt-14">
        <div className="text-2xl mb-3">
            <Title text1={"YOUR"} text2={"CART"} />
        </div>
        {/* Cart Items */}
        <div>
            {cartData.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 flex flex-col items-center gap-4">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                    alt="Empty cart"
                    className="w-24 h-24 opacity-50"
                />
                <p>Your cart is empty.</p>
            </div>
            ) : (
            cartData.map((item, index) => {
                
                const productData = products.find((product) => product.id === Number(item.id));
                console.log("ahaaa", productData)
                if (!productData) return null; // Avoid error if product isn't loaded yet
                return (
                <div
                    key={index}
                    className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
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
                            Price : {productData.price*item.quantity}<br></br> Quantity : {item.quantity}
                        </p>
                        <p className="px-2 sm:py-1 border bg-slate-50">{item.size}</p>
                        </div>
                    </div>
                    </div>

                    {/* Quantity Input */}
                    <input
                    onChange={(e) =>
                        e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item.id,
                            item.size,
                            Number(e.target.value)
                            )
                    }
                    className="border max-w-10 sm:max-w-20 px-1 py-1"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    />

                    {/* Delete Icon */}
                    <img
                    onClick={() => updateQuantity(item.id, item.size, 0)}
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt="delete"
                    />
                </div>
                );
            })
            )}
        </div>

        {/* Total + Button */}
        {cartData.length > 0 && (
            <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
                <CartTotal />
                <div className="w-full text-end">
                <button
                    onClick={() => navigate("/place-order")}
                    className="bg-black text-white text-sm my-8 px-8 py-3"
                >
                    PROCEED TO CHECKOUT
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    





}

