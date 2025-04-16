import { motion } from "framer-motion";
import Title from './Title';
import useShopStore from '../store/useShopStore';

export default function CartTotal() {
    const { currency, delivery_fee, getCartAmount } = useShopStore();
    const subtotal = getCartAmount();
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

    return (
        <motion.div 
            className="w-full p-4 rounded-2xl shadow-lg border"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-2xl mb-4">
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className="flex flex-col gap-3 text-sm text-gray-700">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{subtotal}.00</p>
                </div>
                <hr />

                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>{currency}{delivery_fee}.00</p>
                </div>
                <hr />

                <div className="flex justify-between font-semibold text-base">
                    <b>Total</b>
                    <b>{currency}{total}.00</b>
                </div>
            </div>
        </motion.div>
    );
}
