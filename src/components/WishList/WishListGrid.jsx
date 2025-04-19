import { FaTrashAlt } from 'react-icons/fa'; 
import useShopStore from "../../store/useShopStore";

export default function WishlistGrid() {
    const { wishlist, removeFromWishlist } = useShopStore();

    if (wishlist.length === 0) {
        return <p>Your wishlist is empty.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
                <div key={product.id} className="wishlist-item border rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-65 object-cover rounded-lg mb-4"
                    />
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-md">{product.name}</p>
                            <p className="text-gray-600">{product.currency}{product.price}</p> 
                        </div>
                        <button 
                            onClick={() => removeFromWishlist(product.id)} 
                            className="text-red-600 hover:text-black cursor-pointer"
                        >
                            <FaTrashAlt className="text-xl" />  
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
