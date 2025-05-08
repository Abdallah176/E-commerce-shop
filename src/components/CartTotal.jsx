import { motion } from "framer-motion";
import Title from './Title';
import useProductStore from "../store/useProductStore";
import useCartStore from "../store/useCartStore";

export default function CartTotal() {
  const { currency, products } = useProductStore();
  const { delivery_fee, getFormattedCartItems } = useCartStore();
  const formattedItems = getFormattedCartItems(products);
  const subtotal = formattedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <motion.div
      className="w-full p-6 bg-gradient-to-r from-orange-600 to-purple-600 text-white rounded-3xl shadow-xl border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-3xl font-bold mb-6 text-center md:text-left">
        <Title text1={'YOUR'} text2={'TOTAL'} />
      </div>

      <div className="flex flex-col gap-4 text-sm sm:text-base md:text-lg">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{subtotal}.00</p>
        </div>
        <hr className="border-t border-gray-300" />

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr className="border-t border-gray-300" />

        <div className="flex justify-between font-semibold text-lg">
          <p>Total</p>
          <p>{currency}{total}.00</p>
        </div>
      </div>
    </motion.div>
  );
}
