import React from 'react';
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


