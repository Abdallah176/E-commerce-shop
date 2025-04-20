import { assets } from "../../assets/assets";

export default function PaymentMethods({ method, setMethod }) {
    return (
        <div className="mt-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">PAYMENT <span className="text-orange-600">METHOD</span></h2>

            <div className="flex gap-3 flex-col lg:flex-row">
                <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                    <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
                </div>
                <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                    <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
                </div>
                <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                    <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                </div>
            </div>
        </div>
    );
}