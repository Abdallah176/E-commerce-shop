// components/Contact/ContactTitle.jsx
import { motion } from "framer-motion";
import Title from "../Title";

export default function ContactTitle() {
    return (
        <motion.div
            className="text-center text-3xl pt-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            >
            <Title text1="GET IN" text2="TOUCH" />
            <p className="text-gray-500 text-sm mt-2">
                We’d love to hear from you! Fill out the form below to get in touch.
            </p>
        </motion.div>
    );
}
