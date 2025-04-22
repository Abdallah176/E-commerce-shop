import { useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import useShopStore from "../store/useShopStore";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/Cart/CartItem";
import EmptyCart from "../components/Cart/EmptyCart";

export default function Cart() {
    const { products, currency, cartItems, fetchProducts } = useShopStore();
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, []);

    useEffect(() => {
        const tempData = [];
        for (const documentId in cartItems) {
            for (const size in cartItems[documentId]) {
                if (cartItems[documentId][size] > 0) {
                    tempData.push({
                        id: Number(documentId),
                        size: size,
                        quantity: cartItems[documentId][size],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems, products]);

    return (
        <section className="min-h-screen bg-gray-50 pt-16 pb-24 px-4 sm:px-8">
            {/* Title */}
            <div className="text-center mb-12">
                <Title text1="YOUR" text2="CART" />
                <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
                    Review your items before proceeding to checkout.
                </p>
            </div>

            {/* Cart Content */}
            {cartData.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Side: Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartData.map((item, index) => {
                            const productData = products.find(p => p.id === Number(item.id));
                            if (!productData) return null;
                            return (
                                <div
                                    key={index}
                                    className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                                >
                                    <CartItem
                                        item={item}
                                        productData={productData}
                                        currency={currency}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Side: Total + Button */}
                    <div className="sticky top-24 bg-white rounded-xl shadow-md p-6 space-y-6 h-fit">
                        <CartTotal />
                        <button
                            onClick={() => navigate("/place-order")}
                            className="w-full px-8 py-3 rounded-full bg-black text-white font-semibold tracking-wide text-sm sm:text-base hover:bg-gray-800 transition-all duration-300 cursor-pointer"
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}


