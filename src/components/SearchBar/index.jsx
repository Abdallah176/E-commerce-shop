import React, { useEffect, useState } from 'react'
import searchIcon from '../../assets/search_icon.png'
import crossIcon from '../../assets/cross_icon.png'
import { useLocation } from 'react-router-dom'
import useProductStore from '../../store/useProductStore'

export default function SearchBar() {
    const {search , setSearch , showSearch , setShowSearch} = useProductStore();
    const [visible,setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')){
            setVisible(true);
        } else {
            setVisible(false);
        }
    },[location])

    return showSearch && visible ? (
        <div className='flex flex-col items-center border-t border-b bg-gray-50 py-4 px-2'>
        <div className='relative w-full sm:w-1/2'>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-10 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
          <img src={searchIcon} className="absolute left-4 top-2.5 w-5 h-5" />
          <img
            src={crossIcon}
            onClick={() => setShowSearch(false)}
            className="absolute right-4 top-2.5 w-4 h-4 cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>      
    ) : null 
}
