// components/Contact/ContactForm.jsx
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
            className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-xl shadow-md"
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
                <Form className="flex flex-col gap-6">
                    <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-semibold mb-1">
                        Name
                    </label>
                    <Field
                        type="text"
                        name="name"
                        className="border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-semibold mb-1">
                        Email
                    </label>
                    <Field
                        type="email"
                        name="email"
                        className="border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="flex flex-col">
                    <label htmlFor="message" className="text-sm font-semibold mb-1">
                        Message
                    </label>
                    <Field
                        as="textarea"
                        name="message"
                        rows="5"
                        className="border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                    className="bg-black text-white py-3 px-6 rounded-md self-end transition disabled:opacity-50 flex items-center gap-2"
                    >
                    {isSubmitting && (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                    </motion.button>
                </Form>
                )}
            </Formik>
        </motion.div>
    );
}