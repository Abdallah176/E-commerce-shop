import { useState } from "react";
import useShopStore from "../store/useShopStore";
import CartTotal from "../components/CartTotal";
import DeliveryForm from "../components/PlaceOrder/DeliveryForm";
import PaymentMethods from "../components/PlaceOrder/PaymentMethods";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PlaceOrder() {
    const [method, setMethod] = useState('cod');
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const [loading, setLoading] = useState(false);

    const { cartItems, getCartAmount } = useShopStore();
    const navigate = useNavigate();
    const total = getCartAmount();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const isFormValid = () => {
        return Object.values(form).every(field => field.trim() !== "");
    };

    const handlePlaceOrder = async () => {
        if (!isFormValid()) {
            toast.error("Please fill out all fields correctly");
            return;
        }

        setLoading(true);

        const orderData = {
            ...form,
            paymentMethod: method,
            cartItems,
            total,
            statuss: "pending"
        };

        try {
            const res = await axios.post("http://localhost:1337/api/orders", {
                data: orderData,
            });

            const createdOrder = res.data?.data;

            toast.success("Order placed successfully!");

            setTimeout(() => {
                navigate("/thank-youu", {
                    state: {
                        ...orderData,
                        orderId: createdOrder.id,
                    },
                });
            }, 1500);

        } catch (error) {
            console.error("Failed to place order", error);
            toast.error("Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            <ToastContainer position="top-right" autoClose={3000} />
            <DeliveryForm form={form} handleInputChange={handleInputChange} />
            <div className="mt-8">
                <div className="mt-8 min-w-60">
                    <CartTotal />
                </div>
                <PaymentMethods method={method} setMethod={setMethod} />
                <div className="w-full text-end mt-8">
                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="bg-black text-sm text-white px-16 py-3 disabled:opacity-50"
                    >
                        {loading ? "Placing Order..." : "PLACE ORDER"}
                    </button>
                </div>
            </div>
        </div>
    );
}
