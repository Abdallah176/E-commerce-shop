import { motion } from "framer-motion";
import { assets } from "../../assets/assets";

export default function AboutSection() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="backdrop-blur-md bg-white/60 rounded-3xl p-8 shadow-lg border border-orange-100">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                At <span className="font-semibold text-orange-600">Forever</span>, we
                believe that shopping should be more than just buying — it should be
                an experience.
              </p>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                We started with a dream to connect people to quality products with
                just a few clicks. From fashion to tech, every item is curated with
                care.
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
                <p className="text-gray-700">
                  To redefine convenience, deliver excellence, and create a seamless
                  online shopping journey for everyone.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={assets.about_img}
              alt="about"
              className="w-full rounded-3xl shadow-xl border border-orange-100"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
