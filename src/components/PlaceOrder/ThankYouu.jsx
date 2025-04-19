import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from '../../assets/success-animation.json';
import useShopStore from "../../store/useShopStore";
import axios from "axios";
import { useEffect } from "react";

export default function ThankYouu() {
    const domain = "http://localhost:1337";
    const { state } = useLocation();
    const navigate = useNavigate();
    const { products } = useShopStore();

    const getData = () => {
        let endPoint = "/api/products";
        let url = domain + endPoint;
        axios.get(url, {
            params : { populate: "*", }
        }).then((res) => {
            console.log(res.data.data);
        })
    }

    useEffect(() => {
        getData()
    },[])
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-12 bg-gray-50">
            <div className="w-72 mb-6">
                <Lottie animationData={successAnimation} loop={false} />
            </div>

            <h2 className="text-3xl font-semibold text-blue-600 mb-2">Thank You for Your Order!</h2>
            <p className="text-gray-500 text-center max-w-md mb-6">
                Your order has been received and is being reviewed. We’ll contact you soon!
            </p>

            {/* بيانات الطلب */}
            {state && (
                <div className="w-full max-w-md bg-white border rounded-lg shadow p-6 text-sm text-gray-600 mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>
                    <div className="mb-2">
                        <strong>Order ID: </strong> #{state.orderId}
                    </div>
                    
                    <p><strong>Name:</strong> {state.firstName} {state.lastName}</p>
                    <p><strong>Email:</strong> {state.email}</p>
                    <p><strong>Address:</strong> {state.street}, {state.city}, {state.state}, {state.zipcode}, {state.country}</p>
                    <p><strong>Phone:</strong> {state.phone}</p>
                    <p><strong>Payment Method:</strong> {state.paymentMethod}</p>
                    <p><strong>Total:</strong> ${state.total}</p>
                    <p>
                        <strong>Order Status: </strong>
                        <span className={
                            state.statuss === "pending" ? "text-yellow-400" :
                            state.statuss === "processing" ? "text-blue-600" :
                            state.statuss === "completed" ? "text-green-600" :
                            "text-gray-600"
                        }>
                            {state.statuss}
                        </span>
                        </p>
                </div>
            )}

            {/* محتويات السلة */}
            {state?.cartItems && (
                <div className="w-full max-w-md bg-white border rounded-lg shadow p-6 text-sm text-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Items Ordered</h3>
                    {Object.entries(state.cartItems).map(([productId, sizes]) => {
                        const product = products.find(p => p.id === parseInt(productId));
                        return (
                            <div key={productId} className="flex items-center gap-4 mb-4 border-b pb-2">
                                {/* صورة المنتج */}
                                {product?.image && (
                                    <img
                                        src={domain + product.image.url}
                                        alt={product.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                )}
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        {product ? product.title : `Product ID: ${productId}`}
                                    </div>
                                    {Object.entries(sizes).map(([size, quantity]) => (
                                        <div key={size} className="text-gray-600">
                                            Size: {size} — Quantity: {quantity}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* الأزرار */}
            <div className="flex gap-4 mt-10">
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

