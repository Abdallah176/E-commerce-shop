import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

export default function ContactForm() {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const initialValues = {
        name: "",
        email: "",
        message: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().min(2, "Name is too short").max(50, "Name is too long").required("Please enter your name"),
        email: Yup.string().email("Invalid email address").required("Please enter your email"),
        message: Yup.string().min(10, "Message should be at least 10 characters").max(1000, "Message too long").required("Please enter a message"),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const payload = {
            name: values.name,
            email: user?.email || values.email,
            message: values.message,
        };

        try {
            await axios.post( "http://localhost:1337/api/contact-messages",
                { 
                    data: payload 
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${useAuthStore.getState().jwt}`,
                    },
                }
            );

            toast.success("Message sent successfully!");
            resetForm();
            setTimeout(() => navigate("/thank-you"), 1500);
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error("Contact form error:", error);
        }
    };

    return (
        <motion.div
            className="max-w-3xl mx-auto mt-16 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-8">
                        {/* Name Field */}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
                                Your Name
                            </label>
                            <Field
                                aria-label="Your Name"
                                type="text"
                                name="name"
                                className="border-2 border-gray-300 dark:border-gray-700 rounded-md px-6 py-4 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
                                Your Email
                            </label>
                            <Field
                                aria-label="Your Email"
                                type="email"
                                name="email"
                                className="border-2 border-gray-300 dark:border-gray-700 rounded-md px-6 py-4 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                        </div>

                        {/* Message Field */}
                        <div className="flex flex-col">
                            <label htmlFor="message" className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
                                Your Message
                            </label>
                            <Field
                                aria-label="Your Message"
                                as="textarea"
                                name="message"
                                rows="5"
                                className="resize-none border-2 border-gray-300 dark:border-gray-700 rounded-md px-6 py-4 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="message" component="div" className="text-red-400 text-sm mt-1" />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isSubmitting}
                            className="bg-orange-600 text-white py-4 px-8 rounded-full self-center transition-all hover:bg-orange-700 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                        >
                            {isSubmitting && (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            )}
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </motion.button>
                    </Form>
                )}
            </Formik>
        </motion.div>
    );
}
