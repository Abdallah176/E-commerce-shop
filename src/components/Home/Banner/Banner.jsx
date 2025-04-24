import { motion } from 'framer-motion';
import React from 'react';
import BannerImg from '../../../assets/Banner.png';

export default function Banner() {
  return (
    <section className="relative mt-20 px-6 sm:px-16 py-12 bg-white rounded-3xl overflow-hidden shadow-xl">
      <div className="grid md:grid-cols-2 items-center gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 space-y-6"
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 font-medium">Limited Time</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Get <span className="text-orange-500">20% Off</span> On All New Arrivals!
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Shop our newest collection and enjoy exclusive discounts on premium styles.
          </p>
          <a
            href="/collection"
            className="inline-block mt-2 px-7 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-300"
          >
            Shop Now
          </a>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <img
            src={BannerImg}
            alt="Offer"
            className="w-full h-auto max-h-[400px] max-w-[700px] object-contain"
          />
        </motion.div>
      </div>

      {/* Decorative background shapes */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-orange-100 rounded-full blur-3xl z-0 opacity-30" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-indigo-100 rounded-full blur-3xl z-0 opacity-30" />
    </section>
  );
}
