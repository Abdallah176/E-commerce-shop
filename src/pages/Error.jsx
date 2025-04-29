import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react"; 
import imgUrl from "../assets/crashed-error.svg";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">
      {/* Background Icon */}
      <AlertTriangle
        className="hidden sm:block absolute text-orange-600 opacity-30 w-72 h-72 top-10 -left-10 rotate-12"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-md z-10"
      >
        {/* Illustration Image */}
        <motion.img
          src={imgUrl}
          alt="404 illustration"
          className="w-64 mx-auto"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        
        <motion.h1
          className="text-5xl font-bold text-orange-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-2xl font-semibold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Oops! Page not found
        </motion.p>

        <motion.p
          className="text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          The page you’re looking for doesn’t exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link to="/" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full shadow-lg">
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
