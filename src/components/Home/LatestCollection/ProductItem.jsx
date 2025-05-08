import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import useWishlistStore from '../../../store/useWishlistStore';
import useProductStore from '../../../store/useProductStore';

export default function ProductItem({ id, image, name, price }) {
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
    const {currency} = useProductStore(); 
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
        setTimeout(() => {
            setShowAlert(false);
        }, 4000); 
    };

    return (
        <div className="group relative border rounded-xl p-3 hover:shadow-lg transition duration-300 bg-white">
            {/* Product content */}
            <Link className='text-gray-700 cursor-pointer block' to={`/product/${id}`}>
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        className='w-full h-90 object-cover transition-transform duration-500 group-hover:scale-110'
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
                <div className='mt-4'>
                    <p className='text-sm font-medium'>{name}</p>
                    <p className='text-lg font-semibold text-black'>{currency}{price}</p>
                </div>
            </Link>

            <button
                onClick={handleAddToCart}
                className="mt-3 flex items-center justify-center gap-2 w-full py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-100 cursor-pointer"
            >
                <FiShoppingCart className="text-lg" />
                Add to Cart
            </button>

            {/* Alert */}
            {showAlert && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[90%] bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mt-3 shadow-lg z-20 flex items-center justify-between text-sm animate-fade-in">
                    <span>Please click the product image to select a size before adding to cart.</span>
                    <button onClick={() => setShowAlert(false)}>
                        <IoClose className="text-lg ml-4" />
                    </button>
                </div>
            )}
        </div>
    );
}

