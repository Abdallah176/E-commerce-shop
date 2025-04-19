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
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1={"YOUR"} text2={"CART"} />
            </div>

            <div>
                {cartData.length === 0 ? (
                    <EmptyCart />
                ) : (
                    cartData.map((item, index) => {
                        const productData = products.find(p => p.id === Number(item.id));
                        if (!productData) return null;
                        return (
                            <CartItem
                                key={index}
                                item={item}
                                productData={productData}
                                currency={currency}
                            />
                        );
                    })
                )}
            </div>

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


