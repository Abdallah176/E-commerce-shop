import React from 'react'
import { motion } from 'framer-motion';

export default function BannerText() {
  return (
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
      href="/bestseller"
      className="inline-block mt-2 px-7 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-300"
    >
      Shop Now
    </a>
  </motion.div>
  )
}
