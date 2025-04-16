import React from 'react';
import { Link } from 'react-router-dom';
import useShopStore from '../../store/useShopStore';

export default function ProductItem({ id, image, name, price }) {
    const { currency } = useShopStore();


    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out' src={image } alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    );
}
