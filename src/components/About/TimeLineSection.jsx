import { motion } from "framer-motion";
import Title from "../Title";

export default function TimelineSection() {
    const timeline = [
        { year: "2018", text: "The idea was born and research began." },
        { year: "2019", text: "The company was founded and first MVP was launched." },
        { year: "2020", text: "We onboarded our first 1,000 customers." },
        { year: "2022", text: "Major UI overhaul and app release on mobile." },
        { year: "2023", text: "Reached 1 million happy customers globally." }
    ];

    return (
        <div className="my-20">
        <Title text1={"OUR"} text2={"JOURNEY"} />
        <div className="relative border-l-2 border-gray-300 ml-4 mt-10 space-y-12">
            {timeline.map((event, index) => (
            <motion.div
                key={index}
                className="ml-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
            >
                <div className="absolute -left-3 top-1 w-6 h-6 bg-black rounded-full"></div>
                <h3 className="text-lg font-semibold">{event.year}</h3>
                <p className="text-sm text-gray-500">{event.text}</p>
            </motion.div>
            ))}
        </div>
        </div>
    );
}