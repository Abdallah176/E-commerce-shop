import { useState } from "react";
import useShopStore from "../store/useShopStore";
import CartTotal from "../components/CartTotal";
import PaymentMethods from "../components/PlaceOrder/PaymentMethods";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkedAlt, FaCity, FaFlag, FaGlobe, FaMapPin } from "react-icons/fa";

    const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    street: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zipcode: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    });

    export default function PlaceOrder() {
    const [method, setMethod] = useState("cod");
    const [loading, setLoading] = useState(false);
    const { cartItems, getCartAmount } = useShopStore();
    const navigate = useNavigate();
    const total = getCartAmount();

    const handlePlaceOrder = async (values) => {
        setLoading(true);
        const orderData = {
        ...values,
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
        } catch (err) {
        toast.error("Something went wrong, please try again.",err);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 pt-8 sm:pt-14 min-h-[80vh] border-t">
        <ToastContainer position="top-right" autoClose={3000} />
        
        <Formik
            initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            country: "",
            phone: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handlePlaceOrder}
        >
            {() => (
            <Form className="w-full sm:w-3/5 space-y-6">
                <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField name="firstName" icon={<FaUser />} placeholder="First Name" />
                <InputField name="lastName" icon={<FaUser />} placeholder="Last Name" />
                <InputField name="email" icon={<FaEnvelope />} placeholder="Email" />
                <InputField name="phone" icon={<FaPhone />} placeholder="Phone" />
                <InputField name="street" icon={<FaMapMarkedAlt />} placeholder="Street Address" />
                <InputField name="city" icon={<FaCity />} placeholder="City" />
                <InputField name="state" icon={<FaFlag />} placeholder="State" />
                <InputField name="zipcode" icon={<FaMapPin />} placeholder="Zip Code" />
                <InputField name="country" icon={<FaGlobe />} placeholder="Country" />
                </div>
            </Form>
            )}
        </Formik>

        <div className="w-full sm:w-2/5 mt-10 sm:mt-0">
            <CartTotal />
            <PaymentMethods method={method} setMethod={setMethod} />
            <div className="text-end mt-6">
            <button
                type="submit"
                onClick={() => document.querySelector("form").dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
                disabled={loading}
                className="bg-black text-white px-10 py-3 text-sm disabled:opacity-50"
            >
                {loading ? "Placing Order..." : "PLACE ORDER"}
            </button>
            </div>
        </div>
        </div>
    );
    }

    function InputField({ name, icon, placeholder }) {
    return (
        <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
        </div>
        <Field
            name={name}
            placeholder={placeholder}
            className="w-full py-3 pl-10 pr-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <ErrorMessage
            name={name}
            component="div"
            className="text-red-400 text-sm mt-1"
        />
        </div>
    );
}

