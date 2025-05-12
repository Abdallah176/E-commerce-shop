import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function ProductImage({ image, name, liked, handleAddToWishlist }) {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <img
        className="w-full h-90 object-cover transition-transform duration-500 group-hover:scale-110"
        src={image}
        alt={name}
      />
      <button
        onClick={handleAddToWishlist}
        className="absolute top-2 right-2 text-lg text-black bg-white rounded-full p-2 shadow"
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
}
