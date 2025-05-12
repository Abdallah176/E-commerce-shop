// components/Product/ProductAlert.jsx
import { IoClose } from 'react-icons/io5';

export default function ProductAlert({ onClose }) {
  return (
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[90%] bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mt-3 shadow-lg z-20 flex items-center justify-between text-sm animate-fade-in">
      <span>Please click the product image to select a size before adding to cart.</span>
      <button onClick={onClose}>
        <IoClose className="text-lg ml-4" />
      </button>
    </div>
  );
}
