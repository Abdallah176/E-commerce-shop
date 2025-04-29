import React, { useEffect } from 'react'
import { useState } from 'react';
import Title from './Title';
import useShopStore from '../store/useShopStore';
import ProductItem from './Home/LatestCollection/ProductItem';

export default function RelatedProducts({category,subCategory}) {
    const {products} = useShopStore();
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
    
            productsCopy = productsCopy.filter((item) => item.category?.name === category);
            productsCopy = productsCopy.filter((item) => item.Sub-category?.name === subCategory);
    
            setRelated(productsCopy.slice(0, 5));
            console.log('Filtered Related:', productsCopy); 
        }
    }, [products, category, subCategory]);
    
    
    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    related.map((item,index) => (
                        <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                    ))
                }
            </div>
        </div>
    )
}
