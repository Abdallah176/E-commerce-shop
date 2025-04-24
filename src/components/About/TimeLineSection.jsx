import { motion } from "framer-motion";
import { Clock, Rocket, Users, Smartphone, Globe, TrendingUp, Star } from "lucide-react";
import Title from "../Title";

export default function TimelineSection() {
    const timeline = [
        {
            year: "2018",
            text: "The idea was born and research began.",
            icon: <Clock className="w-6 h-6 text-white" />
        },
        {
            year: "2019",
            text: "The company was founded and first MVP was launched.",
            icon: <Rocket className="w-6 h-6 text-white" />
        },
        {
            year: "2020",
            text: "We onboarded our first 1,000 customers.",
            icon: <Users className="w-6 h-6 text-white" />
        },
        {
            year: "2022",
            text: "Major UI overhaul and app release on mobile.",
            icon: <Smartphone className="w-6 h-6 text-white" />
        },
        {
            year: "2023",
            text: "Reached 1 million happy customers globally.",
            icon: <Globe className="w-6 h-6 text-white" />
        },
        {
            year: "2024",
            text: "Expanded into new markets and launched AI-powered recommendations.",
            icon: <TrendingUp className="w-6 h-6 text-white" />
        },
        {
            year: "2025",
            text: "Launching our premium brand experience and loyalty program.",
            icon: <Star className="w-6 h-6 text-white" />
        }
    ];

    return (
        <div className="my-20 px-4">
            <Title text1={"OUR"} text2={"JOURNEY"} />

            <div className="overflow-x-auto mt-16">
                <div className="flex space-x-10 min-w-[900px] relative">

                    {timeline.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center text-center min-w-[160px] relative"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="bg-gradient-to-tr from-orange-500 to-yellow-400 w-14 h-14 flex items-center justify-center rounded-full shadow-lg ring-4 ring-white">
                                {item.icon}
                            </div>

                            {/* Gradient line between points */}
                            {index !== timeline.length - 1 && (
                                <div className="absolute top-7 left-full w-10 h-1 bg-gradient-to-r from-orange-400 to-yellow-300 hidden sm:block"></div>
                            )}

                            <div className="text-sm font-bold mt-3 text-orange-500">
                                {item.year}
                            </div>
                            <p className="mt-2 text-gray-600 text-sm w-44">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
