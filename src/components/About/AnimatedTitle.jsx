// components/About/AnimatedTitle.jsx
import { motion } from "framer-motion";
import Title from "../Title";

export default function AnimatedTitle() {
    return (
        <motion.div
            className="text-3xl text-center pt-12 border-t"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            >
            <Title text1={"ABOUT"} text2={"US"} />
        </motion.div>
    );
}
