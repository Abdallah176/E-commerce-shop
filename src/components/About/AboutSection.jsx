// components/About/AboutSection.jsx
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";

export default function AboutSection() {
    return (
        <div className="my-14 flex flex-col md:flex-row gap-16 items-center">
            <motion.img
                className="w-full md:max-w-[450px] rounded-xl shadow-lg"
                src={assets.about_img}
                alt="about"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
            />
            <motion.div
                className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
                <p>
                Forever was born out of a passion for innovation and a desire to
                revolutionize the way people shop online. Our journey began with a
                simple idea: to provide a platform where customers can easily
                discover, explore, and purchase a wide range of products from the
                comfort of their homes.
                </p>
                <p>
                Since our inception, we've worked tirelessly to curate a diverse
                selection of high-quality products that cater to every taste and
                preference. From fashion and beauty to electronics and home
                essentials, we offer an extensive collection sourced from trusted
                brands and suppliers.
                </p>
                <b className="text-gray-800">Our Mission</b>
                <p>
                Our mission at Forever is to empower customers with choice,
                convenience, and confidence. We're dedicated to providing a seamless
                shopping experience that exceeds expectations, from browsing and
                ordering to delivery and beyond.
                </p>
            </motion.div>
        </div>
    );
}