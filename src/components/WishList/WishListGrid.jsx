import { FaTrashAlt } from 'react-icons/fa'; 
// import useShopStore from "../../store/useShopStore";
import useWishlistStore from '../../store/useWishlistStore';

export default function WishlistGrid() {
    const { wishlist, removeFromWishlist } = useWishlistStore();

    if (wishlist.length === 0) {
        return <p className="text-center text-lg text-gray-500">Your wishlist is empty.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-10">
            {wishlist.map((product) => (
                <div key={product.id} className="wishlist-item border-2 border-gray-200 rounded-lg p-8 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-101">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-80 object-cover rounded-lg mb-6"
                    />
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-lg text-gray-800">{product.name}</p>
                            <p className="text-gray-500 mt-1">{product.currency}{product.price}</p> 
                        </div>
                        <button 
                            onClick={() => removeFromWishlist(product.id)} 
                            className="text-orange-600 hover:text-orange-800 transition-colors duration-200 cursor-pointer"
                        >
                            <FaTrashAlt className="text-2xl" />  
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
