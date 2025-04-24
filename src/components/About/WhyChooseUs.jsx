import { motion } from "framer-motion";
import { FaCheckCircle, FaTruck, FaHeadset } from "react-icons/fa";
import Title from "../Title";

export default function WhyChooseUs() {
    const reasons = [
        {
            icon: <FaCheckCircle className="text-orange-500 text-4xl" />,
            title: "Top-Quality Products",
            desc: "Handpicked items that meet our highest standards for quality and style."
        },
        {
            icon: <FaTruck className="text-orange-500 text-4xl" />,
            title: "Fast & Free Delivery",
            desc: "Enjoy quick, reliable shipping with no extra cost on all your orders."
        },
        {
            icon: <FaHeadset className="text-orange-500 text-4xl" />,
            title: "24/7 Support",
            desc: "We’re always here to help — anytime, anywhere, with any issue."
        }
    ];

    return (
        <div className="my-20 px-4 sm:px-10">
            <div className="text-xl py-10 text-center">
                <Title text1="WHY" text2="CHOOSE US" />
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                {reasons.map((item, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 text-center flex flex-col items-center"
                        whileHover={{ scale: 1.03 }}
                    >
                        <div className="mb-4 flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full">
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mt-2">{item.title}</h3>
                        <p className="text-gray-500 mt-2 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
