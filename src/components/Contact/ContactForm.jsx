import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ContactForm() {
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        message: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Please input Your Name"),
        email: Yup.string().email("Invalid email").required("Please input Your Email"),
        message: Yup.string().min(10, "Message too short").required("Message is required"),
    });

    const handleSubmit = (values, { resetForm }) => {
        setTimeout(() => {
            toast.success("Message sent successfully!");
            resetForm();
            navigate("/thank-you");
        }, 1000);
    };

    return (
        <motion.div
            className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg"
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
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-lg font-semibold mb-2 text-gray-700">
                                Your Name
                            </label>
                            <Field
                                type="text"
                                name="name"
                                className="border-2 border-gray-300 rounded-md px-6 py-4 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-lg font-semibold mb-2 text-gray-700">
                                Your Email
                            </label>
                            <Field
                                type="email"
                                name="email"
                                className="border-2 border-gray-300 rounded-md px-6 py-4 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="message" className="text-lg font-semibold mb-2 text-gray-700">
                                Your Message
                            </label>
                            <Field
                                as="textarea"
                                name="message"
                                rows="5"
                                className="border-2 border-gray-300 rounded-md px-6 py-4 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="message" component="div" className="text-red-400 text-sm mt-1" />
                        </div>

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
