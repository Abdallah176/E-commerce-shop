import { motion } from "framer-motion";
import Title from "../Title";

export default function WhyChooseUs() {
    const reasons = [
        {
        title: "Quality Assurance",
        desc: "We meticulously select and vet each product to ensure it meets our stringent quality standards."
        },
        {
        title: "Convenience",
        desc: "With our user-friendly interface and hassle-free ordering process, shopping has never been easier."
        },
        {
        title: "Exceptional Customer Service",
        desc: "Our team of dedicated professionals is here to assist you every step of the way."
        }
    ];

    return (
        <div className="mb-24">
        <div className="text-xl py-10">
            <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
        <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            {reasons.map((item, index) => (
            <div
                key={index}
                className="border p-6 rounded-lg shadow hover:shadow-lg transition-all"
            >
                <b>{item.title}</b>
                <p className="text-gray-500 mt-2 text-sm">{item.desc}</p>
            </div>
            ))}
        </motion.div>
        </div>
    );
}
