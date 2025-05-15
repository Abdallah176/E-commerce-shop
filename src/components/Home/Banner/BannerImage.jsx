import React from 'react'
import BannerImg from '../../../assets/bann.png';
import { motion } from 'framer-motion';

export default function BannerImage() {
  return (
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
  )
}
