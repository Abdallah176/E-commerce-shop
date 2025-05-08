import React, { useEffect, useState } from "react";
import Title from "../../Title";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getLatestProducts } from "../../../repo/ProductsRepo";

export default function LatestCollection() {
  const [latestProducts, setLatestProducts] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    const fetchData = async () => {
      const products = await getLatestProducts();
      setLatestProducts(products);
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="py-16 bg-white" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 px-4"
      >
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Step into the spotlight with the newest fashion arrivals curated just for you
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {latestProducts.map((el) => (
          <motion.div key={el.id} variants={itemVariants}>
            <ProductItem
              id={el.documentId}
              image={`http://localhost:1337${el.image.url}`}
              name={el.name}
              price={el.price}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}