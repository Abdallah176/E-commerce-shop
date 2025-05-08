// src/components/Collection/BestSeller.jsx
import { useEffect, useState } from "react";
import Title from "../../Title";
import ProductItem from "../LatestCollection/ProductItem";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getBestSellerProducts } from "../../../repo/ProductsRepo";

export default function BestSeller() {
  const [bestSeller, setBestSeller] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    const fetchData = async () => {
      const products = await getBestSellerProducts();
      setBestSeller(products);
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="py-16 bg-gray-50" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 px-4"
      >
        <Title text1="BEST" text2="SELLER" />
        <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Step into the spotlight with the newest fashion arrivals curated just for you.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {bestSeller.map((el) => (
          <motion.div key={el.id} variants={itemVariants}>
            <div className="bg-white rounded-xl shadow-md hover:scale-105 transition-all duration-300 p-2">
              <ProductItem
                id={el.documentId}
                image={`http://localhost:1337${el.image.url}`}
                name={el.name}
                price={el.price}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}