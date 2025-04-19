// components/Banner.jsx
import { motion } from 'framer-motion';
import React from 'react';

export default function Banner() {
    return (
        <section className="relative mt-12 mx-6 sm:mx-12 bg-black text-white py-12 px-6 rounded-3xl overflow-hidden shadow-2xl">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-4"
            >
                <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">Limited Time Offer — 20% Off All New Arrivals!</h2>
                <p className="text-sm sm:text-base text-gray-300">
                    Refresh your closet with our exclusive deals. Premium styles. Unbeatable prices.
                </p>
                <a href="/collection" className="mt-4 inline-block px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all">Explore Deals</a>
            </motion.div>

            {/* Decorative circle */}
            <div className="absolute top-[-30px] left-[-30px] w-60 h-60 bg-white opacity-5 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-[-40px] right-[-40px] w-80 h-80 bg-white opacity-5 rounded-full blur-3xl z-0" />
        </section>
        );
    }
