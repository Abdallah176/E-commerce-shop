import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from '../../assets/success-animation.json';
import { useEffect, useState } from "react";
// import useShopStore from "../../store/useShopStore";
import useProductStore from "../../store/useProductStore";

export default function ThankYouu() {
    const { state } = useLocation(); 
    const { getProductById , fetchProducts, products } = useProductStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("✅ ThankYou page loaded");
        console.log("✅ Order ID from Strapi:", state?.orderId);
        console.log("✅ Full state:", state);
        if (products.length === 0) {
            fetchProducts();
          }
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const Skeleton = () => (
        <div className="w-full max-w-md bg-gray-200 rounded-md h-24 mb-4 animate-pulse"></div>
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-12 mb-10">
            <div className="w-72 mb-6">
                <Lottie animationData={successAnimation} loop={true} />
            </div>
            <h2 className="text-3xl font-semibold text-blue-600 mb-2">Thank You for Your Order!</h2>
            <p className="text-gray-500 text-center max-w-md mb-6">
                Your order has been received and is being reviewed. We’ll contact you soon!
            </p>

            {loading ? (
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
            ) : (
                <>
                    {state && (
                        <div className="w-full max-w-md bg-white border rounded-md shadow p-5 text-sm text-gray-700 mb-6">
                            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                            <div className="mb-2"><strong>Order ID:</strong> #{state.orderId}</div>
                            <div className="mb-2"><strong>Name:</strong> {state.firstName} {state.lastName}</div>
                            <div className="mb-2"><strong>Email:</strong> {state.email}</div>
                            <div className="mb-2"><strong>Address:</strong> {state.street}, {state.city}, {state.state}, {state.zipcode}, {state.country}</div>
                            <div className="mb-2"><strong>Phone:</strong> {state.phone}</div>
                            <div className="mb-2"><strong>Payment Method:</strong> {state.paymentMethod}</div>
                            <div className="mb-2"><strong>Total:</strong> ${state.total}</div>
                            <div className="mb-2"><strong>Status:</strong> 
                                <span className={`ml-2 font-medium ${state.statuss === "pending" ? "text-yellow-500" : "text-green-600"}`}>
                                    {state.statuss}
                                </span>
                            </div>
                        </div>
                    )}

                    {state?.cartItems && (
                        <div className="w-full max-w-md bg-white border rounded-md shadow p-5 text-sm text-gray-700">
                            <h3 className="text-lg font-semibold mb-4">Items Ordered</h3>
                            {Object.entries(state.cartItems).map(([productId, sizes]) => {
                               const product = getProductById(Number(productId));

                                return (
                                    <div key={productId} className="mb-4">
                                        {product ? (
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product.image}
                                                    // alt={product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div>
                                                    <div className="font-semibold text-gray-800">{product.name}</div>
                                                    {Object.entries(sizes).map(([size, quantity]) => (
                                                        <div key={size} className="text-gray-600">
                                                            Size: {size} - Quantity: {quantity}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>Product not found for ID: {productId}</div>
                                        )}
                                    </div>
                                    
                                );
                            })}
                        </div>
                    )}
                    <div className="mt-8">
                        <button
                            onClick={() => window.location.href = "/"}
                            className="px-6 py-2 bg-black text-white text-sm font-medium rounded hover:bg-blue-800 transition cursor-pointer"
                        >
                            Back to Home
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}


