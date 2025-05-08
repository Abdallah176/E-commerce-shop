import { useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/Cart/CartItem";
import EmptyCart from "../components/Cart/EmptyCart";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import useProductStore from "../store/useProductStore";
import useCartStore from "../store/useCartStore";

export default function Cart() {
  const { products, currency, fetchProducts } = useProductStore();
  const { isLoggedIn } = useAuthStore();
  const { getFormattedCartItems , cartItems } = useCartStore();
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    setCartData(getFormattedCartItems(products));
  }, [products, cartItems , getFormattedCartItems]);

  return (
    <section className="min-h-screen bg-gray-50 pt-16 pb-24 px-6 sm:px-12">
      {/* Title */}
      <div className="text-center mb-16">
        <Title text1="YOUR" text2="CART" />
        <p className="mt-4 text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          Review your items before proceeding to checkout. Ensure your selections are correct.
        </p>
      </div>

      {/* Cart Content */}
      {cartData.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {/* Left Side: Cart Items */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-8">
            {cartData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
              >
                <CartItem
                  item={item}
                  productData={item} // `item` now already includes all product data
                  currency={currency}
                />
              </div>
            ))}
          </div>

          {/* Right Side: Total + Button */}
          <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-8 space-y-6 h-fit">
            <CartTotal products={products} />
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error("You must be logged in to place an order.");
                  setTimeout(() => {
                    navigate("/login");
                  }, 1000);
                  return;
                }
                navigate("/place-order");
              }}
              className="w-full px-8 py-4 rounded-full bg-black text-white font-semibold tracking-wide text-sm sm:text-base hover:bg-gray-900 transition-all duration-300 transform hover:scale-103 cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
