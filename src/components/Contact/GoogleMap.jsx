import { motion } from "framer-motion";

export default function GoogleMap() {
    return (
        <motion.div
            className="mt-24 mb-10 overflow-hidden rounded-xl shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            >
            <iframe
                className="w-full h-[400px] border-none"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609850142!2d72.74110184622614!3d19.08219783959292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63fa2c1b7fd%3A0xa3f2e0bbcf34d1c5!2sForever%20Store!5e0!3m2!1sen!2sus!4v1618303761483!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Store Location"
            ></iframe>
        </motion.div>
    );
}
