import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import useWishlistStore from '../../../store/useWishlistStore';
import useProductStore from '../../../store/useProductStore';
import ProductImage from './ProductImage';
import ProductAlert from './ProductAlert';

export default function ProductItem({ id, image, name, price }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { currency } = useProductStore();
  const [liked, setLiked] = useState(wishlist.some(item => item.id === id));
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (liked) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, image, name, price, currency });
    }
    setLiked(!liked);
  };

  const handleAddToCart = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  return (
    <div className="group relative border rounded-xl p-3 hover:shadow-lg transition duration-300 bg-white">
      <Link className="text-gray-700 cursor-pointer block" to={`/product/${id}`}>
        <ProductImage
          image={image}
          name={name}
          liked={liked}
          handleAddToWishlist={handleAddToWishlist}
        />
        <div className="mt-4">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-lg font-semibold text-black">{currency}{price}</p>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className="mt-3 flex items-center justify-center gap-2 w-full py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-100 cursor-pointer"
      >
        <FiShoppingCart className="text-lg" />
        Add to Cart
      </button>

      {showAlert && <ProductAlert onClose={() => setShowAlert(false)} />}
    </div>
  );
}