import { Link } from "react-router-dom";

export default function ThankYou() {
    return (
        <div className="flex flex-col justify-center items-center h-[80vh] text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
            <p className="text-gray-600 mb-6">Your message has been sent. We’ll get back to you soon.</p>
            <Link to="/" className="text-white bg-black px-6 py-3 rounded-md hover:opacity-80 transition">
                Back to Home
            </Link>
        </div>
    );
}
