import React from 'react';
import useShopStore from "../store/useShopStore";
import { FaTrashAlt } from 'react-icons/fa'; 
import Title from '../components/Title';
import WishlistTitle from '../components/WishList/WishListTitle';
import WishlistGrid from '../components/WishList/WishListGrid';

function WishlistPage() {

    return (
        <div className="wishlist-container p-4">
            <WishlistTitle />
            <WishlistGrid />
        </div>
    );
}

export default WishlistPage;


