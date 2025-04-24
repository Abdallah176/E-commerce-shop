import { motion } from "framer-motion";

export default function VideoSection() {
    return (
        <div className="my-20 px-4 sm:px-10">
            <motion.div
                className="text-2xl text-center font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                See Our Story in Motion
            </motion.div>

            <motion.div
                className="w-full overflow-hidden rounded-xl shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <video
                    className="w-full h-auto max-h-[500px] object-cover"
                    controls
                    poster="/images/video-poster.jpg" 
                >
                    <source src="/videos/story.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </motion.div>
        </div>
    );
}
